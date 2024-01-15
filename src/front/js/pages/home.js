import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions:{protectedInfo} } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        data();

    }, [store.token,protectedInfo]);

    const data = () => {
        if (store.token) {
            protectedInfo(store.token);
        }
        setLoading(false);
    };

    return (
        <div className="text-center mt-5">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <h1>Hello {store.token && store.infoProtected?.name ? store.infoProtected.name : "Guest"}!!</h1>
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
    );
};








