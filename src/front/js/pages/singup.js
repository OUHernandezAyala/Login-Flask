import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Singup = () => {
	const { store, actions } = useContext(Context);
    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        name:""
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setNewUser((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSingup = async (event) => {
        event.preventDefault(); 
        console.log(newUser)
        const data = await actions.postNewUser(newUser);
        console.log(data)
    };


	return (
        <div className="d-flex flex-column align-items-center">
            <form className="m-5">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" aria-describedby="nameHelp" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleChange}/>
                </div>
                <button className="btn btn-primary" onClick={handleSingup}>Submit</button>  
            </form>
            <Link to="/" className="mt-3">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>



       
	);
};