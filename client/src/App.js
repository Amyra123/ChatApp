import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/home';
import Chat from './pages/chat';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:4000');



const App = () => {

    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/home' 
                    element={
                        <Home                 
                            username={username} // Add this
                            setUsername={setUsername} // Add this
                            room={room} // Add this
                            setRoom={setRoom} // Add this
                            socket={socket} // Add this
                        />
                    } />
                    <Route path='/chat' element={<Chat username={username} room={room} socket={socket} />}/>             
                </Routes>
            </div>
        </Router>
    )
};

export default App;