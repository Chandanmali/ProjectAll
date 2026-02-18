import { useState } from "react";
import ChatImage from "../components/Voice chat-amico.png";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [show, setShow] = useState(false);
    const [showConfirm, setConfirm] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [fileName, setFileName] = useState("No file chosen");
    const [loading, setLoading] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate();

    const handleSignup = async () => {

        setLoading(true);

        if (!name || !email || !password || !confirmPass) {
            toast.error("Please enter required fields");
            setLoading(false);
            return;
        }

        if (password !== confirmPass) {
            toast.error("your password and confirm password shoud be same");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPass", confirmPass);

        if (avatar) {
            formData.append("avatar", avatar);
        }

        const response = await fetch(`${backendUrl}/api/signup`, {
            method: "POST",
            body: formData,
        });

        setLoading(false);

        if (response) {
            toast.success("Signup successfully 🎉");
        }

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPass("");
        setAvatar(null);
        setFileName("No file chosen");

        setTimeout(() => {
            navigate("/auth/login");
        }, 2000);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">

            <Toaster />

            {/* LEFT SIDE IMAGE */}
            <div className="hidden md:flex md:w-1/2 bg-black items-center justify-center p-10">
                <img
                    src={ChatImage}
                    alt="3D Chat Illustration"
                    className="w-full max-w-lg drop-shadow-2xl animate-pulse"
                />
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="flex w-full h-screen md:w-1/2 items-center justify-center bg-gray-200 px-4 py-10">

                <div className="w-full max-w-md">

                    {/* TITLE */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center border border-gray-300 rounded-2xl shadow-md py-2 px-6 bg-gray-100">
                        Talk-A-Tive-Web-App
                    </h1>

                    {/* FORM BOX */}
                    <div className="flex flex-col mt-6 px-5 py-8 border border-gray-200 bg-gray-100 shadow-xl rounded-lg">

                        {/* NAME */}
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            value={name}
                            placeholder="Enter your Name"
                            className="w-full border border-gray-300 shadow-sm rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />

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
                                className="w-full border border-gray-300 shadow-sm rounded-lg px-4 py-2 mb-4 pr-16"
                            />

                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="absolute right-3 top-2 text-xs sm:text-sm bg-gray-300 px-3 py-1 rounded-lg font-semibold"
                            >
                                {show ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="relative">
                            <input
                                onChange={(e) => setConfirmPass(e.target.value)}
                                type={showConfirm ? "text" : "password"}
                                value={confirmPass}
                                placeholder="Enter confirm password"
                                className="w-full border border-gray-300 shadow-sm rounded-lg px-4 py-2 mb-4 pr-16"
                            />

                            <button
                                type="button"
                                onClick={() => setConfirm(!showConfirm)}
                                className="absolute right-3 top-2 text-xs sm:text-sm bg-gray-300 px-3 py-1 rounded-lg font-semibold"
                            >
                                {showConfirm ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* AVATAR */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">

                            <label className="border border-gray-300 shadow cursor-pointer rounded-lg px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold text-center">
                                Choose Avatar
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setAvatar(file);
                                        setFileName(file ? file.name : "No file chosen");
                                    }}
                                />
                            </label>

                            <span className="text-gray-500 text-sm text-center sm:text-left truncate">
                                {fileName}
                            </span>

                        </div>

                        {/* BUTTONS */}
                        <div className="flex flex-col gap-3">

                            <button
                                onClick={handleSignup}
                                type="button"
                                className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition flex justify-center"
                            >
                                {loading ? (
                                    <PulseLoader color="white" size={10} />
                                ) : (
                                    "Signup"
                                )}
                            </button>

                            <Link to={"/auth/login"}>
                                <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition">
                                    Already have account? Login
                                </button>
                            </Link>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
