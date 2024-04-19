import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPage.css';

function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:8000/admin/userPage');
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    
        fetchUsers();
    }, []);    

    const handleDeleteUser = async (username) => {
        try {
            await axios.delete(`http://localhost:8000/admin/userPage/${username}`);
            const updatedUsers = users.filter(user => user.username !== username);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    

    return (
        <>
            <h1 className='m-3'>Users</h1>
            <hr className='bg-black m-3' />
            <div className='headings m-3 p-2'>
                <p><strong>Username</strong></p>
                <p><strong>Email</strong></p>
                <p><strong>Phone Number</strong></p>
                <p className='mx-3'><strong></strong></p>
            </div>
            <div id='alluserscontainer' className='user-container-wrapper'>
                {users.map(user => (
                    <div className='user-container' key={user.username}>
                        <div className='user-info'>
                            <p className='ml-2'>{user.username}</p>
                            <p>{user.email}</p>
                            <p>{user.phonenumber}</p>
                            <button className='delete-btn' onClick={() => handleDeleteUser(user.username)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default UsersPage;
