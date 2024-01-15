import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [infoUser, setinfoUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setinfoUser((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleLogin = async (event) => {
        event.preventDefault(); 
        try {
            const data = await actions.postLogin(infoUser);
            if (data && data.token) {
                await actions.protectedInfo(data.token);
                console.log(store.token);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <form className="m-5">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleChange}/>
                </div>
                <button className="btn btn-primary" onClick={handleLogin}>Submit</button>  
            </form>
            <Link to="/" className="mt-3">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    );
};


