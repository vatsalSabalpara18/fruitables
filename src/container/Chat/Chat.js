import React, { useContext, useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client';
import { CHAT_URL } from '../../utills/baseURL';
import { ThemeContext } from '../../context/ThemeProvider';

const Chat = () => {

    const socket = useMemo(() => io(CHAT_URL), []);
    const { theme } = useContext(ThemeContext)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [to, setTo] = useState('');
    const [group, setGroup] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('socket is connected at client side: ' + socket.id);
        })

        socket.on('welcome', (msg) => {
            console.log(msg);
        })

        socket.on("receive_msg", (msg) => {
            console.log("aaaaavvvvvvv",msg);
            setMessages(prev => [...prev, msg]);
        })

        return () => {
            socket.off('connect', () => {
                console.log('socket connection off')
            })
            socket.off('welcome', () => {
                console.log('socket welcome is off')
            })
            socket.off("receive_msg", () => {
                console.log('receive messge is off');
            })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        socket.emit('send_msg', { message, to });
    }

    const handleGroupSubmit = (e) => {
        e.preventDefault();
        console.log(group)
        socket.emit("join_group", group);
    }

    return (
        <div className={theme}>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Chat</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Chat</li>
                </ol>
            </div>

            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className={`p-5 ${theme === 'light' ? 'bg-light': 'dark' } rounded`}>
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                                    <h1 className="text-primary">Get in touch</h1>
                                    <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                                </div>
                            </div>

                            <div className='col-lg-7'>
                                <form onSubmit={handleGroupSubmit}>
                                    <div>
                                        <input name='group' value={group} onChange={(e) => setGroup(e.target.value)} placeholder='Enter your group' />                                        
                                    </div>
                                    <input value={'create group'} type='submit' />
                                </form>
                            </div>

                            <div className="col-lg-7">
                                <form onSubmit={handleSubmit}>
                                    <div className='mt-2 mb-2'>
                                        <input name='to' value={to} onChange={(e) => setTo(e.target.value)} placeholder='Enter yout contact' />
                                    </div>
                                    <div className='mt-2 mb-2'>
                                        <input name='message' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter your message' />
                                    </div>
                                    <input type='submit' value={"Send Message"} />
                                </form>
                            </div>
                            <div className='col-lg-7'>
                                {
                                    messages.map((m, i) => (
                                        <p key={m + i}>{m}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat