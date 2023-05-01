import React, {useState} from 'react';
import {redirect, useNavigate, useParams} from "react-router-dom";
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

export interface ItemQuantity {
    deviceId: number;
    quantity: number;
}

export function Basket() {
    const {username} = useParams()
    const [devices, setDevices] = useState<Device[]>([]);
    const [itemQuantities, setItemQuantities] = useState<ItemQuantity[]>([]);
    const redirect = useNavigate();
    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: `http://localhost:8080/api/users/${username}/devices`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        promise
            .then((res) => {
                const items: ItemQuantity[]  = res.data.map((device: Device) => ({
                    deviceId: device.id,
                    quantity: 1
                }));
                setItemQuantities(items);
                setDevices(res.data);

            })
            .catch((e: any) => {
                alert(e);
                // (window.location.href = '/auth');
            });
    }, [username]);

    const checkout = () => {
        axios({
            method: 'post',
            url: `http://localhost:8080/api/orders/${username}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: itemQuantities
        })
            .then(() => {
                setItemQuantities([]);
                setDevices([]);
                redirect(`/users/${username}/orders`);
            })
            .catch(() => {
                redirect(`/users/${username}/basket`)
            });
    };


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

    const updateItemQuantity = (deviceId: number, quantity: number) => {
        const updatedQuantity = Math.max(quantity, 1); // Ensure quantity is not less than 1
        const updatedItemQuantity = itemQuantities.map(item => {
            if (item.deviceId === deviceId) {
                return { ...item, quantity: updatedQuantity };
            }
            return item;
        });
        setItemQuantities(updatedItemQuantity);
    };


    return (
        <div className="cart">
            <div>
                <h1>Your Cart Items</h1>
            </div>
            <div className="cart">
                {itemQuantities.map((item: ItemQuantity) =>
                    <div key={item.deviceId}>
                        <b>{item.deviceId}</b>: {item.quantity}
                        <br/>
                    </div>
                )}

                {devices.map((device: Device) =>
                    <div key={device.id} className="cartItem">
                        {/*<DeviceImage id={device.id} title={device.title} filename={device.filename}/>*/}
                        <img src={require(`../../assets/devices/${device.filename}`)} alt={device.filename} />

                        <div className="description">
                            <p>
                                <b>{device.title}</b>
                            </p>
                            <p>{device.price}₽</p>
                        </div>
                        <div className="countHandler">
                            <button onClick={() => updateItemQuantity(device.id, (itemQuantities.find(item => item.deviceId === device.id)?.quantity || 0) - 1)}> - </button>
                            <b>{itemQuantities.find(item => item.deviceId === device.id)?.quantity || 0}</b>
                            <button onClick={() => updateItemQuantity(device.id, (itemQuantities.find(item => item.deviceId === device.id)?.quantity || 0) + 1)}> + </button>
                        </div>


                        {username!==undefined && <button className="addToCartBttn" onClick={() => deleteDeviceFromUser(device.id)}>
                            Delete From Basket
                        </button>}


                    </div>

                )}
                </div>
            <div className="buttons">

                <button className={"special-buttons"} onClick={() => redirect('/shop')}>Continue Shopping</button>
                <button className={"special-buttons"} onClick={() => checkout()} disabled={devices.length === 0}>
                    Checkout
                </button>
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
