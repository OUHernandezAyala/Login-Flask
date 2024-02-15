import React from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navigate, useNavigate } from "react-router-dom";



export const ProtectedInfo = () => {
    
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const { store, actions:{protectedInfo} } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkTokenExpiration = async () => {
            if (!token) {
                navigate("/home");
            } else {
                try {
                    await protectedInfo(token);
                    setLoading(false);
                } catch (error) {
                    navigate("/");
                }
            }
        };

        checkTokenExpiration();
    }, [token, navigate, protectedInfo]);

    const data = () => {
        if (token) {
            protectedInfo(token);
        }
        setLoading(false);
    };
    return(
        <div className="text-center mt-5">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <h1>Hello {store.infoProtected.name}!!</h1>
            )}
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
    )
}