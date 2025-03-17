import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const UpdatePhoneData = () => {

    // const {id} = useParams();
    // const phoneId = parseInt(id)
    // console.log(phoneId)

    const receivedPhone = useLoaderData();
    const [phone,setPhone] = useState(receivedPhone);
    console.log(phone);

    const handleUpdatePhone = (event) => {
        event.preventDefault();

        const form = event.target;
        const phoneName = form.phoneName.value;
        const price = form.price.value;

        const updatedPhone = { phoneName, price }
        console.log(updatedPhone);

        //call PUT api

        fetch(`http://localhost:5000/phones/${phone?.id}`, {
            method: "PUT",
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(updatedPhone)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result) {
                    alert('Updated Successfully');
                    setPhone(result);              
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
                    phone &&
                    <div>
                        <h2>Phone id : {phone?.id}</h2>
                        <h2>phone Name : {phone?.phoneName}</h2>
                        <h2>Price : {phone?.price}</h2>
                    </div>
                }
            </div>
            <form onSubmit={handleUpdatePhone}>
                <input type="text" placeholder="Enter a phone name" name="phoneName" />
                <br />
                <input type="text" placeholder="Enter price" name="price" />
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdatePhoneData;