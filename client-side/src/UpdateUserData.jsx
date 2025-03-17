import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const UpdatePhoneData = () => {

    // const {id} = useParams();
    // const phoneId = parseInt(id)
    // console.log(phoneId)

    const receivedPhone = useLoaderData();
    const [user,setUser] = useState(receivedPhone);
    console.log(user);

    const handleUpdatePhone = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const phoneNumber = form.phoneNumber.value;

        const updatedUser = { email, phoneNumber }
        console.log(updatedUser);

        //call PUT api

        fetch(`http://localhost:5000/user/${user?._id}`, {
            method: "PUT",
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.modifiedCount > 0) {
                    alert('Updated Successfully');
                    setUser(result);              
                }
                else{
                    alert('Could not been updated')
                }
            })
    }
    return (
        <div>
            <div>
                {
                    user &&
                    <div>
                        <h2>Phone id : {user?._id}</h2>
                        <h2>phone Name : {user?.email}</h2>
                        <h2>Price : {user?.phoneNumber}</h2>
                    </div>
                }
            </div>
            <form onSubmit={handleUpdatePhone}>
                <input type="email" placeholder="Enter your email" name="email" />
                <br />
                <input type="text" placeholder="Enter phone Number" name="phoneNumber" />
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdatePhoneData;