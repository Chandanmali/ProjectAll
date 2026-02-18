import { useEffect, useRef } from "react";

export default function Bear({ mode }) {
    const eyesRef = useRef(null);

    useEffect(() => {
        const moveEyes = (e) => {
            if (!eyesRef.current || mode !== "look") return;

            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;

            eyesRef.current.style.transform =
                `translate(${x}px, ${y}px)`;
        };

        window.addEventListener("mousemove", moveEyes);
        return () =>
            window.removeEventListener("mousemove", moveEyes);
    }, [mode]);

    return (
        <div className="relative w-32 h-32 mx-auto">

            {/* FACE */}
            <div className="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center relative shadow-md">

                {/* EYES */}
                <div
                    ref={eyesRef}
                    className="flex gap-6 transition-all duration-150"
                >
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                </div>

                {/* HANDS */}
                <div
                    className={`absolute top-0 left-0 w-full h-full flex justify-between px-2 transition-all duration-300
          ${mode === "hide" ? "translate-y-0" : "-translate-y-20"}
          `}
                >
                    <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                </div>

            </div>
        </div>
    );
}
