import React, {useState} from 'react';
import {redirect, useParams} from "react-router-dom";
import axios, {AxiosError} from "axios";
import "./basket.css";
export interface Device {
    id: number;
    title: string;
    price: number;
    description: string;
    type: string;
    brand: string;
    filename: string;
}

export function Basket() {
    const {username} = useParams()
    const [devices, setDevices] = useState<Device[]>([]);

    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: `http://localhost:8080/api/users/${username}/devices`,
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        promise.then((res) => {
            setDevices(res.data)
        }).catch((e) => redirect('/auth'))
    }, [])

    const addToCart = (username: String, device: Device) => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/api/users/${username}/devices`,
            data: device,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect(`/users/${username}/basket`)
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/shop')
            }})
    }

    const deleteDeviceFromUser = (deviceId: number) => {
        setDevices(devices.filter(i => i.id !== deviceId));
        axios({
            method: 'post',
            url: `http://localhost:8080/api/users/${username}/devices/${deviceId}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
            redirect(`/users/${username}/basket`)
        ).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/shop')
            }})
    }

    return (
        <div className="cart">
            <div>
                <h1>Your Cart Items</h1>
            </div>
            <div className="cart">
                {devices.map((device: Device) =>
                    <div className="cartItem" onClick={() => redirect(`/device/${device.id}`)}>
                        {/*<DeviceImage id={device.id} title={device.title} filename={device.filename}/>*/}
                        <img src={require(`../../assets/devices/${device.filename}`)} alt={device.filename} />

                        <div className="description">
                            <p>
                                <b>{device.title}</b>
                            </p>
                            <p>{device.price}₽</p>
                        </div>
                        {username!==undefined && <button className="addToCartBttn" onClick={() => deleteDeviceFromUser(device.id)}>
                            Delete From Basket
                        </button>}

                    </div>

                )}
            </div>

            {/*{devices.length > 0 ? (*/}
            {/*    <div className="checkout">*/}
            {/*        <div className="subtotal">*/}
            {/*            <h2>Subtotal: ${totalAmount}</h2>*/}
            {/*        </div>*/}
            {/*        <div className="buttons">*/}
            {/*            <button onClick={() => navigate("/")}>Continue Shopping</button>*/}
            {/*            <button onClick={() => {checkout(); navigate("/checkout");}}>*/}
            {/*                Checkout*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*) : (*/}
            {/*    <h1> Your Shopping Cart is Empty</h1>*/}
            {/*)}*/}
        </div>
    );
}
