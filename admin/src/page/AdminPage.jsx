import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://bingoproject-3.onrender.com/api/user');
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);
  

    return (
        <div>
            <h1>Admin Page</h1>
            <div className="user-list">
                {users.map(user => (
                    <div key={user._id} className="user-card">
                        <h3>
                            <Link to={`/user/${user.userName}`}>{user.userName}</Link>
                        </h3>
                        <p>Balance: {user.balance}</p>
                        <p>Permission: {user.permission}</p>
                    </div>
                ))}
            </div>
            <Link to="/add" className="add-button">Add</Link>
        </div>
    );
};

export default AdminPage;