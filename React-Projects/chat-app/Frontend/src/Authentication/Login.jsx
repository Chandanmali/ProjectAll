import { useState } from "react";
import ChatImage from "../components/Voice chat-amico.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate();

    const loginHandler = async () => {

        if (!email || !password) {
            toast.error("Please enter required fields");
            return;
        }

        try {
            const loginApi = await axios.post(`${backendUrl}/login`, {
                email,
                password
            });

            if (loginApi) {
                toast.success("Login successfully 🎉");

                localStorage.setItem("token", loginApi.data.token);

                setEmail("");
                setPassword("");

                setTimeout(() => {
                    navigate("/api/userChat");
                }, 2000);
            }

        } catch {
            toast.error("User not found, Please enter valid credential or create account");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">

            <Toaster />

            {/* LEFT SIDE */}
            <div className="hidden md:flex md:w-1/2 bg-black text-white items-center justify-center p-10">

                <img
                    src={ChatImage}
                    alt="3D Chat Illustration"
                    className="w-full max-w-lg drop-shadow-2xl animate-pulse"
                />

            </div>

            {/* RIGHT SIDE */}
            <div className="flex w-full md:w-1/2 h-screen items-center justify-center bg-gray-200 px-4 py-10">

                <div className="w-full max-w-md">

                    {/* TITLE */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center border border-gray-300 rounded-2xl shadow-md py-2 px-6 bg-gray-100">
                        Talk-A-Tive-Web-App
                    </h1>

                    {/* FORM BOX */}
                    <div className="flex flex-col mt-8 border border-gray-200 px-5 py-8 bg-gray-100 shadow-2xl rounded-lg">

                        {/* EMAIL */}
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            placeholder="Enter your work email"
                            className="w-full border border-gray-300 shadow-sm rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />

                        {/* PASSWORD */}
                        <div className="relative">

                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type={show ? "text" : "password"}
                                value={password}
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 shadow-sm rounded-lg px-4 py-2 mb-4 pr-16 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />

                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="absolute right-3 top-2 text-xs sm:text-sm text-black bg-gray-300 px-3 py-1 rounded-lg font-semibold"
                            >
                                {show ? "Hide" : "Show"}
                            </button>

                        </div>

                        {/* BUTTONS */}
                        <div className="flex flex-col gap-3">

                            <button
                                onClick={loginHandler}
                                className="w-full cursor-pointer bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition"
                            >
                                Login
                            </button>

                            <Link to={"/auth/signup"}>
                                <button className="w-full cursor-pointer bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition">
                                    Create account
                                </button>
                            </Link>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
