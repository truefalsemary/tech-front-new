import React from 'react';
import { Link } from 'react-router-dom';

const MenuPage: React.FC = () => {
    return (
        <div>
            <h1>Menu</h1>
            <ul>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                    <Link to="/orders">Orders</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
            </ul>
        </div>
    );
};

export default MenuPage;