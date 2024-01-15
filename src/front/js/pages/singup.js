import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [newUser, setNewUser] = useState({
        email: null,
        password: null,
        name: null,
    });
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setNewUser((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        if (!newUser.name || !newUser.email || !newUser.password) {
            alert("Please fill in all required fields");
            return;
        }

        console.log(newUser);
        const data = await actions.postNewUser(newUser);
        console.log(data);
        setSignupSuccess(true);
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <form className="m-5">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input type="name" className="form-control" id="name" aria-describedby="nameHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input type="password" className="form-control" id="password" onChange={handleChange} />
                </div>
                {signupSuccess ? (
                    <>
                        <p className="text-success">Signup successful! Please proceed to login.</p>
                        <Link to="/login">
                            <button className="btn btn-primary mx-1">Login</button>
                        </Link>
                    </>
                ) : (
                    <button className="btn btn-primary" onClick={handleSignup}>
                        Submit
                    </button>
                )}
            </form>
            <Link to="/" className="mt-3">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    );
};
