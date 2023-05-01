import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./user-orders.css";

interface Order {
    id: number;
    user: User;
    sumPrice: number;
}

interface User {
    id: number;
    username: string;
}

export function UserOrders() {
    const [orders, setOrders] = useState(Array<Order>);
    const { username } = useParams();
    const redirect = useNavigate();

    React.useEffect(() =>{
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/api/orders/${username}`,
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        res.then((res) =>{
            setOrders(res.data);
        }).catch((e) => redirect('/auth'))
    }, [username])

    return (
        <div>
            <p>Количество заказов: {orders.length}</p>
            <div className={"center"}>
            <table className={'border-2 mt-4'}>
                <thead>
                <th className={'border-2'}>ID</th>
                <th className={'border-2'}>SumPrice</th>
                <th className={'border-2'}>Details</th>
                </thead>
                <tbody>
                {orders.map((order: Order) => (
                    <tr>
                        <td>{order.id} </td>
                        <td>{order.sumPrice} ₽</td>
                        <td key={order.id} onClick={() => redirect(`/users/${username}/orders/${order.id}`)}>View details...</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}
