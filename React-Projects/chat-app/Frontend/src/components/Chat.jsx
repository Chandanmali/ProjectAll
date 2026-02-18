import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function Chat() {

    const [chats, setChats] = useState([])

    const chatsHandler = async() => {
        const data = await axios("http://localhost:5000/api/chats")
        console.log(data.data)
        setChats(data.data)
    }

    useEffect(() => {
        chatsHandler()
    }, [])

    
    return (
        <div>
            <div>
                {
                    chats.map((item, index) => {
                        return <div key={index}>
                            {item.chatName}
                        </div>
                    })
               }
            </div>
        </div>
    )
}

export default Chat
