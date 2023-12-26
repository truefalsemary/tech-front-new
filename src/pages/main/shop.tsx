import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import "./shop.css";
import jwtDecode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {addDeviceToBasket, deleteItemFromBasket} from "../../redux/basketSlice";

export interface Device {
    id: number;
    title: string;
    price: number;
    description: string;
    type: string;
    brand: string;
    filename: string;
}

export function Shop() {
    const redirect = useNavigate()
    const [devices, setDevices] = useState<Device[]>([]);
    const [initialDevices, setInitialDevices] = React.useState<Array<Device>>([])
    const [search, setSearch] = React.useState('')
    const [imageSource, setImageSource] = useState<string | null>(null);


    const dispatch = useDispatch();
    const basket = useSelector((state: RootState) => state.basket);

    const token: string | null = localStorage.getItem('token');
    let decodedUsername: string = "";

    if (token !== null) {
        decodedUsername = (jwtDecode(token) as { username: string }).username;
    }


    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8080/devices',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        promise.then((res) => {
            setDevices(res.data)
            setInitialDevices(res.data)
        }).catch((e) => redirect('/auth'))
    }, [])


    // const addToCart = (username: String, device: Device) => {
    //     const res = axios({
    //         method: 'post',
    //         url: `http://localhost:8080/users/${username}/devices`,
    //         data: device,
    //         headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}`},
    //     })
    //     res.then((res) => {
    //         redirect(`/users/${username}/basket`)
    //     }).catch((reason: AxiosError) => {
    //
    //         if (reason.response!.status === 401 || token === null) {
    //             redirect('/auth')
    //         } else if (reason.response!.status === 403) {
    //             redirect('/shop')
    //         }
    //     })
    // }

    const searchDevices = () => {
        setDevices([...initialDevices.filter((a: Device) => {
            return a.title.toLowerCase()?.includes(search) || String(a.price).toLowerCase() === search
                || a.description.toLowerCase()?.includes(search) || a.type.toLowerCase()?.includes(search)
                || a.brand.toLowerCase()?.includes(search)
        })])
    }
    const isDeviceInCart = (deviceId: number) => basket.some(item => item.id === deviceId);

    // const deleteDevice = (deviceId: number) => {
    //     setDevices(devices.filter(i => i.id !== deviceId));
    //     setInitialDevices(initialDevices.filter(i => i.id !== deviceId));
    //     axios({
    //         method: 'get',
    //         url: `http://localhost:8080/admins/devices/delete/${deviceId}`,
    //         headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}`},
    //     }).then(() => {
    //             window.location.reload();
    //             redirect("/shop");
    //         }
    //     ).catch((reason: AxiosError) => {
    //         if (reason.response!.status === 401) {
    //             redirect('/auth')
    //         } else if (reason.response!.status === 403) {
    //             redirect('/shop')
    //         }
    //     })
    // }


    return (
        <div className="shop">
            {/*<div className="shopTitle">*/}
            {/*    <h1>TechTonic</h1>*/}
            {/*</div>*/}

            <input value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />

            <button className={"addToCartBttn"}
                    onClick={searchDevices}>Поиск
            </button>
            <button className={"addToCartBttn"}
                    onClick={() => setDevices(initialDevices)}>X
            </button>

            <div className="products">
                {devices.map((device: Device) =>

                    <div key={device.id} className="product">
                        {/*<DeviceImage id={device.id} title={device.title} filename={device.filename}/>*/}
                        <img src={require(`../../assets/devices/${device.filename}`)} alt={device.filename}/>
                        {/*{deviceImage(device.filename)}*/}
                        <div className="description">
                            <p>
                                <b>{device.title}</b>
                            </p>
                            <p>{device.price}₽</p>
                        </div>
                        {
                            ((localStorage.getItem('decoded')?.includes('USER'))) &&
                            isDeviceInCart(device.id) ?
                                <button className="addToCartBttn" onClick={() => dispatch(deleteItemFromBasket(device.id))}>
                                    {/*addToCart(decodedUsername, device)}>*/}
                                    Удалить из корзины
                                </button>
                                :
                            <button className="addToCartBttn" onClick={() => dispatch(addDeviceToBasket(device))}>
                                {/*addToCart(decodedUsername, device)}>*/}
                                В корзину
                            </button>
                        }

                        {
                            ((localStorage.getItem('decoded')?.includes('ADMIN'))) &&
                            <div>
                                <button className="addToCartBttn"
                                        onClick={() => redirect(`/update-device/${device.id}`)}>Изменить
                                </button>

                                <button className="addToCartBttn" onClick={() => dispatch(deleteItemFromBasket(device.id))}>
                                    {/*// deleteDevice(device.id)}>*/}
                                    Удалить
                                </button>
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}
