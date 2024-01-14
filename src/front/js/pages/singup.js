import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Singup = () => {
	const { store, actions } = useContext(Context);

	return (
        <div className="d-flex flex-column align-items-center">
            <form className="m-5">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input type="name" className="form-control" id="exampleName" aria-describedby="nameHelp"/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>  
            </form>
            <Link to="/" className="justify-content-center">
            <button className="btn btn-primary">Back home</button>
            </Link>  

        </div>
	);
};