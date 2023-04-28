import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

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


    React.useEffect(() => {
        const promise = axios({
            method: 'get',
            url: 'http://localhost:8080/api/devices',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        promise.then((res) => {
            setDevices(res.data)
        }).catch((e) => redirect('/auth'))
    }, [])


    return (
        <div className="container">
            <div className="row">

                <p>Количество девайсов: {devices.length}</p>
                <table className={'border-2 mt-4'}>
                    <thead>
                    <th className={'border-2'} >Название</th>
                    <th className={'border-2'} >Цена</th>
                    <th className={'border-2'} >Описание</th>
                    <th className={'border-2'} >Бренд</th>
                    <th className={'border-2'} >Тип</th>
                    <th className={'border-2'} >Название файла</th>
                    </thead>
                    <tbody>
                    {devices.map((device: Device) => (
                        <tr className={'border-2'} key={device.id} onClick={() => redirect(`/device/${device.id}`)}>
                            <td className={'border-2 text-center'}>{device.title} </td>
                            <td className={'border-2 text-center'}>{device.price} </td>
                            <td className={'border-2 text-center'}>{device.description} </td>
                            <td className={'border-2 text-center'}>{device.brand} </td>
                            <td className={'border-2 text-center'}>{device.type} </td>
                            <td className={'border-2 text-center'}>{device.filename} </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
