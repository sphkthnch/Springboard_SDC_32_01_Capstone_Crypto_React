import {Routes, Route, Navigate} from "react-router-dom";

import Intro from "./Intro";
import Currency from "./Currency";
import Analysis from "./Analysis";

function AppRoute () {
    return (
        <Routes>
            <Route path = "/" element = {<Intro/>}/>
            <Route path = "/currency" element = {<Currency/>}/>
            <Route path = "/analysis" element = {<Analysis/>}/>
            <Route path = "*" element = {<Navigate to = {"/"}/>}/>
            
        </Routes>
    )
}

export default AppRoute;