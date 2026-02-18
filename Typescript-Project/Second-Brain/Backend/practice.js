const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const PORT = 5000
const { z } = require("zod")
const { studentModel } = require("./Model/practice")
const jwt = require("jsonwebtoken")
const JWT_SECRETE = "chandan@123@321"

app.use(express.json())

mongoose.connect("mongodb+srv://chandanmali21117_db_user:chandan21117@cluster0.hzefken.mongodb.net/second-brain-app").then(() => console.log("Mb connected successfully")).catch((err) => console.log("mb connection failed", err))

app.post("/signup", async (req, res) => {

    const name = req.body.name;
    const password = req.body.password

    //if not field required field
    if (!name || !password) {
        return res.status(411).json({ msg: "Please enter required fields" })
    }

    //zod input validation
    const requireBody = z.object({
        name: z.string().
            min(3, "Atleast 3 words").
            max(8, "maximum 8 words"),

        password: z.string().
            min(8, "atleast 8 word").
            max(20, "maximum 20 words").
            refine((val) =>
                /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^a-zA-Z0-9]/.test(val),
                {
                    message: "Please enter atleast one uppercase, one lowercase, one special character and numbers"
                }
            )
    })

    // now zod schema created, i have to apply on input body fields
    const requireBodyParse = requireBody.safeParse(req.body)

    if (!requireBodyParse.success) {
        return res.json({
            message: "Incorrect input format",
            error: requireBodyParse.error.issues.map((issues) => issues.message)
        })
    }


    try {
        //if not field required field

        //if already registered
        const exitingUser = await studentModel.findOne({
            name: name,
            password: password
        })

        if (exitingUser) {
            return res.json({ msg: "Already Registered" })
        }

        await studentModel.create({
            name: name,
            password: password,
        })
        res.status(200).json({ msg: "Registered successfully" })
    }

    catch (err) {
        return res.status(500).json({ err: "server error" })
    }


})

app.post("/api/login", async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    if (!name || !password) {
        return res.status(411).json({
            msg: "Please enter required fields"
        })
    }

    try {
        const response = await studentModel.findOne({
            name: name,
            password: password
        })

        if (response) {
            const token = jwt.sign({
                userId: response._id
            }, JWT_SECRETE)

            return res.status(200).json({
                msg: "Login successfully",
                token: token
            })
        }
        else {
            return res.status(404).json({ msg: "you are not registered or create account" })
        }

    }
    catch(err) {
        return res.status(500).json({err: "server error"})
    }

    
})

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})