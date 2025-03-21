import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const Room = () => {
    const { roomId } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        socket.emit('join-room', roomId);

        socket.on('update-note', (content) => setContent(content));

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    const handleEdit = (e) => {
        const value = e.target.value;
        setContent(value);
        socket.emit('edit-note', { room: roomId, content: value });
    };

    return (
        <div>
            <h2>Room: {roomId}</h2>
            <textarea value={content} onChange={handleEdit}></textarea>
        </div>
    );
};

export default Room;
