import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read_all_Data = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)

                if (result.deletedCount > 0) {
                    alert('User Deleted Successfully')
                    const newUsers = users.filter(user => String(user._id) !== String(id))

                    console.log(newUsers);
                    setUsers(newUsers);
                }
                else {
                    alert('User Could not been deleted')
                }
            })
    }

    return (
        <>
            <h1>All Data from Server-side</h1>
            <div>
                {
                    users.map(user => <li key={user._id}>{user?.phoneNumber}----{user?.email}
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                        <Link to={`/users/${user._id}`}>
                            <button>View More</button>
                        </Link>
                        <Link to={`/updatePhoneData/${user?.id}`}>
                            <button>
                                Update
                            </button>
                        </Link>
                    </li>)
                }
            </div>
        </>
    );
};

export default Read_all_Data;