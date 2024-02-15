import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate()
	const handelLogout = () =>{
		localStorage.removeItem("token")
		navigate("/")
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/singup">
						<button className="btn btn-primary mx-1">Sing Up</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary mx-1">Login</button>
					</Link>
					<button className="btn btn-primary mx-1" onClick={handelLogout}>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};
