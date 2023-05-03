import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Main} from "./pages/main/main";
import {Shop} from "./pages/main/shop";

import {AuthPage} from "./pages/auth/auth-page";
import {Basket} from "./pages/user/basket";
import {CreateDevice} from "./pages/admin/create-device";
import {DevicePage} from "./pages/device/device-page";
import {Navbar} from "./components/Navbar";
import {About} from "./pages/main/about";
import {OrderPage} from "./pages/user/order-page";
import {UserOrders} from "./pages/user/user-orders";
import {NotFoundPage} from "./pages/main/NotFoundPage";
import {AllUsers} from "./pages/admin/all-users";
import AllOrders from "./pages/admin/all-orders";


function App() {
    return (
        <div className="App">

            <Router>
                <Navbar/>
                <Routes>
                    <Route path={'/'} element={<Main/>}></Route>
                    <Route path={'/auth'} element={<AuthPage/>}></Route>
                    <Route path={'/shop'} element={<Shop/>}></Route>
                    <Route path="/users/:username/basket" element={<Basket/>} />
                    <Route path={'/device/:id'} element={<DevicePage/>}></Route>
                    <Route path={'/create-device'} element={<CreateDevice/>}/>
                    <Route path={'/users/:username/orders'} element={<UserOrders/>}/>
                    <Route path={'/about'} element={<About/>}></Route>
                    <Route path={'/users/:username/orders/:orderId'} element={<OrderPage/>}/>
                    <Route path={'/404'} element={<NotFoundPage/>}/>
                    <Route path={'/all-users'} element={<AllUsers/>}/>
                    <Route path={'/all-orders'} element={<AllOrders/>}/>
                </Routes>
                {/*<footer>*/}
                {/*    <br/>*/}
                {/*    <a href="https://github.com/pyyogi">*/}
                {/*        <p><b>Created by Trushkova Mary</b></p>*/}
                {/*        /!*<img className="github-logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub logo" />*!/*/}
                {/*    </a>*/}
                {/*</footer>*/}
            </Router>

        </div>
    );
}

export default App;
