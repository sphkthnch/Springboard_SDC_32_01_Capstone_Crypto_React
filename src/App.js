import React from "react";
import {BrowserRouter} from "react-router-dom";

import NavigationBar from "./NavigationBar";
import styles from "./App.module.css";
import AppRoute from "./AppRoute";

function App () {
    return (
        <div className = {styles["classDivRoot"]}>
            <BrowserRouter>
                <header className = {styles["classHeader"]}>
                    <NavigationBar/>
                </header>
                <main className = {styles["classMain"]}>
                    <AppRoute/>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;