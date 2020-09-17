import React from 'react';
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="container">
            <Link to="tab1"><h1>America</h1></Link>
            <Link to="tab2"><h1>India</h1></Link>
            <Link to="tab3"><h1>Canada</h1></Link>
        </div>
    )
}


export default Navbar;
