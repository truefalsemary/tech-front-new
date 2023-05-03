import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import "./shop.css";
import jwtDecode from "jwt-decode";

export interface Device {
    id: number;
    title: string;
    price: number;
    description: string;
    type: string;
    brand: string;
    filename: string;
}

export function Shop(){
    const redirect = useNavigate()
    const [devices, setDevices] = useState<Device[]>([]);
    const [initialDevices, setInitialDevices] = React.useState<Array<Device>>([])
    const [search, setSearch] = React.useState('')

    const token: string | null = localStorage.getItem('token');
    let decodedUsername: string = "";

    if (token !== null) {
        decodedUsername = (jwtDecode(token) as { username: string }).username;
    }


    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8080/devices',
            // headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        promise.then((res) => {
            setDevices(res.data)
            setInitialDevices(res.data)
        }).catch((e) => redirect('/auth'))
    }, [])


    const addToCart = (username: String, device: Device) => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/users/${username}/devices`,
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

    const searchDevices = () => {
        setDevices([...initialDevices.filter((a: Device) => {
            return a.title.toLowerCase()?.includes(search) || String(a.price).toLowerCase()===search
                || a.description.toLowerCase()?.includes(search) || a.type.toLowerCase()?.includes(search)
                || a.brand.toLowerCase()?.includes(search)
        })])
    }

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>TechTonic</h1>
            </div>

            <input value={search.toLowerCase()} onChange={(e) => setSearch(e.target.value.toLowerCase())}
                   className={'border-2 w-[150px] h-[30px] ml-4 rounded-md'}/>

            <button className={"addToCartBttn"}
                    onClick={searchDevices}>Поиск
            </button>
            <button className={"addToCartBttn"}
                    onClick={() => setDevices(initialDevices)}>X
            </button>

            <div className="products">
                {devices.map((device: Device) =>

                    <div key={device.id} className="product" onClick={() => redirect(`/device/${device.id}`)}>
                        {/*<DeviceImage id={device.id} title={device.title} filename={device.filename}/>*/}
                        <img src={require(`../../assets/devices/${device.filename}`)} alt={device.filename} />

                        <div className="description">
                            <p>
                                <b>{device.title}</b>
                            </p>
                            <p>{device.price}₽</p>
                        </div>
                        <button className="addToCartBttn" onClick={() => addToCart(decodedUsername, device)}>
                            Add To Basket
                        </button>
                    </div>

                )}
            </div>
        </div>
        // <div className="container">
        //     <div className="row">
        //
        //         <p>Количество девайсов: {devices.length}</p>
        //         <table className={'border-2 mt-4'}>
        //             <thead>
        //             <th className={'border-2'} >Название</th>
        //             <th className={'border-2'} >Цена</th>
        //             <th className={'border-2'} >Описание</th>
        //             <th className={'border-2'} >Бренд</th>
        //             <th className={'border-2'} >Тип</th>
        //             <th className={'border-2'} >Название файла</th>
        //             </thead>
        //             <tbody>
        //             {devices.map((device: Device) => (
        //                 <tr className={'border-2'} key={device.id} onClick={() => redirect(`/device/${device.id}`)}>
        //                     <td className={'border-2 text-center'}>{device.title} </td>
        //                     <td className={'border-2 text-center'}>{device.price} </td>
        //                     <td className={'border-2 text-center'}>{device.description} </td>
        //                     <td className={'border-2 text-center'}>{device.brand} </td>
        //                     <td className={'border-2 text-center'}>{device.type} </td>
        //                     <td className={'border-2 text-center'}>{device.filename} </td>
        //                 </tr>
        //             ))}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
    );
}
