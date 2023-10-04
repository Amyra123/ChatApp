import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate();

    const createRoom = (e) => {
        e.preventDefault();
        if(room && username){
            socket.emit('join_room',{username,room});
        }

        navigate('/chat',{replace: true});
    }

    return (
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <h1>LET'S HAVE A CHAT!!</h1>
                    <input className={styles.input} type="text" placeholder="ENTER YOUR NAME" onChange={(e)=> {setUsername(e.target.value)}} required></input>
                    <input className={styles.input} type="text" placeholder="ENTER THE ROOM NAME" onChange={(e)=>{setRoom(e.target.value)}} required></input>
                    <button type="submit" id="create-room" className='btn btn-secondary' onClick={(e)=>{createRoom(e)}} style={{ width: '100%' }}> CREATE ROOM </button>
            </form>
        </div>
    )
}

export default Home;