import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css/Admin.module.css';
import { TiUserAddOutline } from "react-icons/ti";
const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://bin.zaahirahtravels.com/api/user');
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <div>X-bingo</div>
                <Link to="/add" className={styles.add}><TiUserAddOutline size={'2rem'}/></Link>
            </div>
            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>PlayType</th>
                        <th>Status</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className={styles.userrow}>
                            <td>
                                <Link to={`/user/${user.userName}`} className={styles.name}>{user.userName}</Link>
                            </td>
                            <td>
                                {user.playType}
                            </td>
                            <td>
                                {user.permission === 'true' ? (
                                    <span className={styles.green}>Active</span>
                                ) : (
                                    <span className={styles.red}>Off</span>
                                )}
                            </td>
                            <td>
                                {user.balance}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;