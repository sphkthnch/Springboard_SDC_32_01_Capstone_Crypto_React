import styles from "./NavigationBar.module.css";

import {NavLink} from "react-router-dom";

const routes = [
    {
     to:"/", 
     text:"Introduction"
    },
    {
     to:"/currency", 
     text:"Crypto-Currency"
    },
    {
     to:"/analysis", 
     text:"Crypto-Analysis"
    }
];

function NavigationBar() {
    return (
        <nav className={styles["classNav"]}>
            {
                routes.map(
                    (route, index) => 
                    <NavLink 
                        to = {route.to}
                        key = {index}
                        className = {
                            ({isActive, isPending}) => 
                            `${isActive? styles["classNavlinkActive"]:
                                styles["classNavlinkPending"]}`
                            
                        }
                        >
                        {route.text}
                    </NavLink>
                )
            }
        </nav>
    )
}

export default NavigationBar;