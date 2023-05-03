import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './order-page.css';

interface Device {
    id: number;
    title: string;
    price: number;
}

interface OrderItem {
    id: number;
    device: Device;
    quantity: number;
}

interface User {
    id: number;
    username: string;
}

interface Order {
    id: number;
    orderItems: OrderItem[];
    user: User;
    sumPrice: number;
}

export function OrderPage() {
    const [order, setOrder] = useState<Order | null>(null);
    const { username, orderId } = useParams();
    const redirect = useNavigate();

    React.useEffect(() =>{
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/users/${username}/orders/${orderId}`,
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        res.then((res) =>{
            setOrder({...res.data})
        }).catch((e) => redirect('/auth'))
    }, [username, orderId])


    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"container"}>
            <h2>Order Details</h2>
            <div className={"details"}>
            {order ? (
                <>
                    <p>User: {order.user.username}</p>
                    <hr/>
                    <p>Order ID: {order.id}</p>
                    <hr/>
                    <ul>
                        {order.orderItems.map((item) => (
                            <div key={item.id}>
                                {item.device.title} x {item.quantity} - {item.device.price} ₽
                            </div>
                        ))}
                    </ul>
                    <hr/>
                    <p>Total Price: {order.sumPrice} ₽</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
            </div>
        </div>
    );
}

