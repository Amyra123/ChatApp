import styles from './styles.module.css';
import React, { useState } from 'react';

const SendMessage = ({ socket, username, room}) => {
    const [message,setMessage] = useState('');

    const sendMessage = () => {
        if(message !== ''){
            const __createdtime__ = Date.now();
            socket.emit('send_message',{username,message,room,__createdtime__});

            setMessage('');
        }
    }
    
    return (
        <div>
            <input className='styles.messageInput' placeholder='type your message' onChange={(e) => {
                setMessage(e.target.value);
            }} value={message}></input>

            <button className='btn btn-primary' onClick={sendMessage}>SEND MESSAGE</button>
        </div>
    )
};

export default SendMessage;