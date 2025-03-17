const Insert_data = () => {
    const handleAddPhone = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const phoneNumber = form.phoneNumber.value;

        const newUser = { email, phoneNumber };
        console.log(newUser);

        //send to servers-side
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);

                if(result.insertedId){
                    alert('User has been added')
                }
                else{
                    console.log('User Could not been added');
                }
            })


    };

    return (
        <div>
            <form onSubmit={handleAddPhone}>
                <input type="email" placeholder="Enter your email" name="email" />
                <br />
                <input type="text" placeholder="Enter your phone number" name="phoneNumber" />
                <br />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default Insert_data;
