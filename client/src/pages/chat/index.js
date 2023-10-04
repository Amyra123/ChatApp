// client/src/pages/chat/index.js
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import MessagesReceived from './messages';
import SendMessage from './send-message';
import { useEffect } from 'react';

const Chat = ({ socket, username, room}) => {
  const navigate = useNavigate();
  const checkUsername = () => {
    if(!username || !room){
      navigate('/home',{replace: true});
    }
  }

  useEffect(() => {
    checkUsername();
  },[username,room]);

  return (
    <div className={styles.chatContainer}>
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room}/>
      </div>
    </div>
  );
};

export default Chat;