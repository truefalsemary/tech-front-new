import React from "react";
import {Link} from "react-router-dom";
import {ShoppingCart} from "phosphor-react";
import "./navbar.css";
import jwtDecode from "jwt-decode";

export const Navbar = () => {
    const token: string | null = localStorage.getItem('token');
    let decodedUsername: string = "";

    if (token !== null) {
        decodedUsername = (jwtDecode(token) as { username: string }).username;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload(); // Reload the page
    };


    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/">TechTonic</Link>
            </div>
            <div className="links">
                <Link to="/shop"> Shop </Link>
                <Link to="/about"> About </Link>

                {
                    ((localStorage.getItem('decoded')?.includes('ADMIN'))) &&
                    <>
                        <Link to="/auth" onClick={handleLogout}>Logout</Link>
                        <Link to="/all-orders">Orders</Link>
                        <Link to="all-users">Users</Link>
                    </>
                }
                {
                    ((localStorage.getItem('decoded')?.includes('USER'))) &&
                    <>
                        <Link to="/auth" onClick={handleLogout}>Logout</Link>
                        <Link to={`/users/${decodedUsername}/orders`}> Orders </Link>
                        <Link to={`/users/${decodedUsername}/basket`}>
                            <ShoppingCart size={32}/>
                        </Link>
                    </>
                }
                {
                    localStorage.getItem('token') == null &&
                    <Link to="/auth">
                        Login
                    </Link>

                }


            </div>
        </div>
    );
};


// import {Link, redirect, useNavigate} from "react-router-dom";
//
// const MyNavbar = () => {
//     const navigate = useNavigate();
//
//     return (
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                 <a className="navbar-brand" href="#">TechTonic</a>
//                 <button className="navbar-toggler" type="button" data-toggle="collapse"
//                         data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                         aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav mr-auto">
//                         <li className="nav-item active">
//                             <a className="nav-link" onClick={() => redirect(`/shop`)}>Home <span className="sr-only">(current)</span></a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#">Link</a>
//                         </li>
//
//                         <li className="nav-item">
//                             {
//                                 localStorage.getItem("token") === null ?
//                                     <button onClick={() => redirect(`/auth`)}>Sign in</button>
//                                     :
//                                     <button onClick={() => redirect(`/auth`)}>Logout</button>
//
//                             }
//                         </li>
//                     </ul>
//                     {/*<form className="form-inline my-2 my-lg-0">*/}
//                     {/*    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>*/}
//                     {/*        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
//                     {/*</form>*/}
//                 </div>
//             </nav>
//     );
// };
//
// export default MyNavbar;
