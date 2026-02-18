import express from "express";
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
const JWT_SECRETE = "chansan@1234@321"
import { UserModel } from "./Model/model.js";
import { string, z } from "zod"
const PORT = 5000

mongoose.connect("mongodb+srv://chandanmali21117_db_user:chandan21117@cluster0.hzefken.mongodb.net/Brainly").then(() => console.log("mongoDB connected successfully")).catch((err) => console.log("mongoDB connection failed", err))

const app = express();

app.use(express.json())

app.post("/api/signup", async (req, res) => {

    const requieBody = z.object({
        name: z.string().
            min(3, "username should be atleast 3 words").
            max(8, "username should be maximum 8 words"),

        password: z.string().
            min(8, "username should be atleast 8 words").
            max(20, "username should be maximum 20 words").
            refine((val) => 
              /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^a-zA-Z0-9]/.test(val), 
              {
                message: "Please use atleast one uppercase, one lowercase, one special character, one number"
              }
            ),

        email: z.string().email("Invalid email format")
    })

    const parserequireBody = requieBody.safeParse(req.body)

    if(!parserequireBody.success)
    {
        return res.json({
            msg: "Invalid password format",
            error: parserequireBody.error.issues.map((issue) => issue.message)
        })
    }

    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    try {

        if (!name || !password || !email) {
            return res.status(400).json({ msg: "Please enter required fields" })
        }

        const existUser = await UserModel.findOne({
            name: name,
            password: password,
            email: email
        })

        if (existUser) {
            return res.status(409).json({ msg: "User already registered" })
        }

        await UserModel.create({
            name: name,
            password: password,
            email: email
        })

        return res.status(200).json({ success: "Successfully registered" })
    }
    catch (err) {
        res.json({ err: err })
    }

})

app.post("/api/login", async(req, res) => {

    const name = req.body.name;
    const password = req.body.password

    const response = await UserModel.findOne({
        name: name,
        password: password
    })

    if(response)
    {
        const token = jwt.sign({
            userId: response._id
        }, JWT_SECRETE)

        return res.status(200).json({token: token})
    }
    else{
        return res.status(411).json({msg: "Please enter valid credentials"})
    }

})

app.post("/api/content", (req, res) => {

})

app.get("/content", (req, res) => {

})

app.delete("/api/:contentId", (req, res) => {

})

app.post("/api/share", (req, res) => {

})

app.get("/:shareLink", (req, res) => {

})

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})



