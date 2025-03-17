import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Phone = () => {
    const receivedPhone = useLoaderData();
    const [user, setPhone] = useState(receivedPhone);
    console.log(user)



    return (
        <div>
            {
                user ?
                    <div>
                        <h2>Phone id : {user?._id}</h2>
                        <h2>phone Name : {user?.email}</h2>
                        <h2>Price : {user?.phoneNumber}</h2>
                        
                       
                    </div>
                    :
                    <h1>No phones is available to show</h1>
            }
        </div>
    );
};

export default Phone;