import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [room, setRoom] = useState('');
    const navigate = useNavigate();

    const joinRoom = () => {
        if (room) navigate(`/room/${room}`);
    };

    return (
        <div>
            <h1>Join a Room</h1>
            <input
                type="text"
                placeholder="Enter room ID"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom}>Join</button>
        </div>
    );
};

export default Home;
