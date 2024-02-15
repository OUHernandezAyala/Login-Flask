import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/protected");
        }
    }, [navigate, token]);
   
    return (
        <div className="text-center mt-5">
            <h1>Hello Guest!!</h1>
            <p>
                <img src={rigoImageUrl} alt="Rigo baby" />
            </p>
            <div className="alert alert-info"></div>
            <p>
                This boilerplate comes with lots of documentation:{" "}
                <a href="https://start.4geeksacademy.com/starters/react-flask">
                    Read documentation
                </a>
            </p>
        </div>
    );
};







