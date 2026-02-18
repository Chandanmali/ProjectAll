import { useEffect, useRef, useState } from 'react';
import { connectWS } from '../Websocket/ws';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function UserChat() {

    const socket = useRef(null);

    const [userName, setUserName] = useState('');
    const [showNamePopup, setShowNamePopup] = useState(true);
    const [inputName, setInputName] = useState('');
    const [typers, setTypers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [members, setMembers] = useState([]);
    const navigate = useNavigate()

    /* ✅ CHECK TOKEN ON LOAD */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/auth/login");
    }, [navigate]);

    /* ✅ AUTO REDIRECT WHEN TOKEN REMOVED */
    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Session expired");
                navigate("/auth/login");
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, [navigate]);


    useEffect(() => {

        socket.current = connectWS();

        socket.current.on('connect', () => {

            socket.current.on("roomNotice", (userName) => {
                toast.success(`${userName} join the group`);
                setMembers((prev) => [...prev, userName]);
            });

            socket.current.on("chatMessage", (msg) => {
                setMessages((prev) => [...prev, msg]);
            });

        });

    }, []);

    function formatTime(ts) {
        const d = new Date(ts);
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        return `${hh}:${mm}`;
    }

    function handleNameSubmit(e) {
        e.preventDefault();
        const trimmed = inputName.trim();
        if (!trimmed) return;

        socket.current.emit('joinRoom', trimmed);

        setUserName(trimmed);
        setShowNamePopup(false);
    }

    function sendMessage() {
        const t = text.trim();
        if (!t) return;

        const msg = {
            id: Date.now(),
            sender: userName,
            text: t,
            ts: Date.now(),
        };

        setMessages((m) => [...m, msg]);
        socket.current.emit('chatMessage', msg);
        setText('');
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-2 sm:p-4">

            {/* NAME POPUP */}
            {showNamePopup && (
                <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/40 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                        <h1 className="text-lg sm:text-xl font-semibold">Enter your name</h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Enter your name to start chatting
                        </p>

                        <form onSubmit={handleNameSubmit} className="mt-4">
                            <input
                                autoFocus
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-green-500"
                                placeholder="Your name"
                            />

                            <button className="block ml-auto mt-3 px-4 py-2 rounded-full bg-green-500 text-white text-sm">
                                Continue
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* CHAT WINDOW */}
            {!showNamePopup && (
                <div className="w-full max-w-4xl h-[95vh] sm:h-[90vh] bg-white rounded-xl shadow-md flex flex-col overflow-hidden">

                    {/* HEADER */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 px-3 sm:px-4 py-3 border-b">

                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#075E54] flex items-center justify-center text-white font-semibold">
                            R
                        </div>

                        <div className="flex-1 min-w-0">

                            <div className="text-sm font-medium truncate">
                                Realtime group chat
                            </div>

                            <div className="text-xs text-gray-500 truncate">
                                Members: {members.join(", ")}
                            </div>

                            {typers.length > 0 && (
                                <div className="text-xs text-gray-500">
                                    {typers.join(', ')} typing...
                                </div>
                            )}

                        </div>

                        <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                            Signed in as <span className="font-medium">{userName}</span>
                        </div>

                    </div>

                    {/* MESSAGES */}
                    <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 bg-zinc-100">

                        {messages.map((m) => {
                            const mine = m.sender === userName;

                            return (
                                <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>

                                    <div
                                        className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl text-sm shadow-sm
                    ${mine
                                                ? 'bg-[#DCF8C6] rounded-br-md'
                                                : 'bg-white rounded-bl-md'
                                            }`}>

                                        <div className="whitespace-pre-wrap wrap-break-word">
                                            {m.text}
                                        </div>

                                        <div className="flex justify-between text-[11px] mt-1 gap-4">
                                            <span className="font-bold">{m.sender}</span>
                                            <span className="text-gray-500">{formatTime(m.ts)}</span>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* INPUT */}
                    <div className="px-2 sm:px-4 py-2 sm:py-3 border-t bg-white">

                        <div className="flex items-center gap-2 border rounded-full px-2">

                            <textarea
                                rows={1}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                className="flex-1 resize-none px-2 py-3 text-sm outline-none"
                            />

                            <button
                                onClick={sendMessage}
                                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">
                                Send
                            </button>

                        </div>
                    </div>

                </div>
            )}

            <Toaster />

        </div>
    );
}
