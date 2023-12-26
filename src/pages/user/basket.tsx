import React, {useState} from 'react';
import {redirect, useNavigate, useParams} from "react-router-dom";
import axios, {AxiosError} from "axios";
import "./basket.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {
    addItemToBasket,
    deleteItemFromBasket,
    increaseItemQuantity,
    decreaseItemQuantity, setInitialState
} from "../../redux/basketSlice";

export interface Device {
    id: number;
    title: string;
    price: number;
    description: string;
    type: string;
    brand: string;
    filename: string;
}

export interface BasketItem {
    id: number;
    price: number;
    quantity: number;
    filename: string;
    title: string;
}

export interface ItemQuantityDto {
    deviceId: number;
    quantity: number;
}


export function Basket() {
    const {username} = useParams();

    const basket = useSelector((state: RootState) => state.basket);
    const dispatch = useDispatch();
    // const [devices, setDevices] = useState<Device[]>([]);
    // const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const redirect = useNavigate();
    // React.useEffect(() => {
    //
    //     const promise = axios({
    //         method: 'get',
    //         url: `http://localhost:8080/users/${username}/devices`,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         },
    //     });
    //     promise
    //         .then((res) => {
    //             const items: Device[]  = res.data;
    //             dispatch(setItems(items.map((device: Device) => ({
    //                 id: device.id,
    //                 title: device.title,
    //                 price: device.price,
    //                 filename: device.filename,
    //                 quantity: 1
    //             }))))
    //             //     ({
    //             //     deviceId: device.id,
    //             //     title: device.title,
    //             //     price: device.price,
    //             //     filename: device.filename,
    //             //     quantity: 1
    //             // }));
    //             // setBasketItems(items);
    //             // setDevices(res.data);
    //
    //
    //         })
    //         .catch((e: any) => {
    //             redirect('/404')
    //             // (window.location.href = '/auth');
    //         });
    // }, [username]);

    const checkout = () => {

        axios({
            method: 'post',
            url: `http://localhost:8080/users/${username}/orders`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: basket.map((basketItem) => ({deviceId: basketItem.id, quantity: basketItem.quantity}))
        })
            .then(() => {
                // setBasketItems([]);
                dispatch(setInitialState());
                // setDevices([]);
                redirect(`/users/${username}/orders`);
            })
            .catch(() => {
                redirect(`/users/${username}/basket`)
            });
    };


    const deleteDeviceFromUser = (deviceId: number) => {
        // setDevices(devices.filter(i => i.id !== deviceId));
        // setBasketItems(basketItems.filter(i => i.id !== deviceId));
        dispatch(deleteItemFromBasket(deviceId));
        axios({
            method: 'post',
            url: `http://localhost:8080/users/${username}/devices/${deviceId}`,
            headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}`},
        }).then(() =>
            redirect(`/users/${username}/basket`)
        ).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/shop')
            }
        })
    }

    // const updateItemQuantity = (deviceId: number, quantity: number) => {
    //     // const updatedQuantity = Math.max(quantity, 1); // Ensure quantity is not less than 1
    //     // const updatedItemQuantity = basketItems.map(item => {
    //     //     if (item.id === deviceId) {
    //     //
    //     //         return { ...item, quantity: updatedQuantity };
    //     //     }
    //     //     return item;
    //     // });
    //     // setBasketItems(updatedItemQuantity);
    //     dispatch(increaseItemQuantity(deviceId));
    // };

    return (
        <div className="cart">
            <div>
                <h1>Моя корзина:</h1>
            </div>
            <div className="cart">
                {/*{basketItems.map((item: ItemQuantity) =>*/}
                {/*    <div key={item.deviceId}>*/}
                {/*        <b>{item.deviceId}</b>: {item.quantity}*/}
                {/*        <br/>*/}
                {/*    </div>*/}
                {/*)}*/}

                {basket.length == 0 ?
                    <div>
                        Корзина пуста
                    </div>
                    :

                    basket.map((device: BasketItem) =>
                        <div key={device.id} className="cartItem">
                            {/*<DeviceImage id={device.id} title={device.title} filename={device.filename}/>*/}
                            <img src={require(`../../assets/devices/${device.filename}`)} alt={device.filename}/>

                            <div className="description">
                                <p>
                                    <b>{device.title}</b>
                                </p>
                                <p>{device.price}₽</p>
                                <div className="countHandler">
                                    <button onClick={() => dispatch(decreaseItemQuantity({id: device.id}))}> -</button>

                                    <b>{basket.find(item => item.id === device.id)?.quantity || 0}</b>
                                    <button onClick={() => dispatch(increaseItemQuantity({id: device.id}))}> +</button>
                                </div>
                                <div>
                                    {username !== undefined && <button className={"special-buttons"}
                                                                       onClick={() => dispatch(deleteItemFromBasket(device.id))}>
                                        Удалить
                                    </button>}
                                </div>

                            </div>


                        </div>
                    )}
            </div>
            <div className="buttons">

                <button className={"special-buttons"} onClick={() => redirect('/shop')}>Продолжить покупки</button>
                <button className={"special-buttons"} onClick={() => checkout()} disabled={basket.length === 0}>
                    Заказать
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
