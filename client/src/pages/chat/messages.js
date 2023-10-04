import styles from './styles.module.css';
import { useState, useEffect } from 'react';

const Messages = ({socket}) => {
    const [messagesRecieved, setMessagesRecieved] = useState([]);

    // runs whenever a socket event is recieved from the server.
    useEffect(() => {
        const listener = (data) => {
            setMessagesRecieved((prevMessagesRecieved) => {
                return [
                    ...prevMessagesRecieved,
                    {
                        message: data.message,
                        username: data.username,
                        __createdtime__: data.__createdtime__
                    }
                ];
            });
        }
        socket.on('recieve-message',listener);
        // Remove event listener on component unmount
        return () => socket.off('recieve_message',listener);

    },[socket]);

    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
    }

    return (
        <div className={styles.messagesColumn}>
          {messagesRecieved.map((msg, i) => (
            <div className={styles.message} key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className={styles.msgMeta}>{msg.username}</span>
                <span className={styles.msgMeta}>
                  {formatDateFromTimestamp(msg.__createdtime__)}
                </span>
              </div>
              <p className={styles.msgText}>{msg.message}</p>
              <br />
            </div>
          ))}
        </div>
      ); 
};

export default Messages;