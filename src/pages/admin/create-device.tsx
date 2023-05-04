import * as React from 'react'
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import './create-device.css';

export interface Device {
    id: number;
    title: string;
    price: number;
    description: string;
    type: string;
    brand: string;
    filename: string;
}

export function CreateDevice() {
    const [device, setDevice] = React.useState<Device>({
        id: 0,
        title: '',
        price: 0,
        description: '',
        type: '',
        brand: '',
        filename: ''
    })

    const redirect = useNavigate()

    const addDevice = () => {
        const res = axios({
            method: 'post',
            url: 'http://localhost:8080/admins/devices',
            data: device,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},

        })
        res.then((res) => {
            redirect('/shop')
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/create-device')
            }
        })
    }

    return (
        <div className={"create-device"}>
            <form className={"create-device"}>
                    
                    <label>Название:</label>
                    <input placeholder={"Тумбочка"} className={'border-2 rounded-md'} value={device.title}
                           onChange={(e) => setDevice({...device, title: e.target.value})}/><br/>

                    <label>Цена:</label>
                    <input placeholder={"4000000"} className={'border-2 rounded-md'} value={device.price}
                           onChange={(e) => setDevice({...device, price: Number(e.target.value)})}/><br/>


                    <label>Описание:</label>
                    <input placeholder={"Четыре угла"} className={'border-2 rounded-md'} value={device.description}
                           onChange={(e) => setDevice({...device, description: e.target.value})}/><br/>

                    <label>Тип:</label>
                    <input placeholder={"Мебель"} className={'border-2 rounded-md'} value={device.type}
                           onChange={(e) => setDevice({...device, type: e.target.value})}/><br/>

                    <label>Бренд:</label>
                    <input placeholder={"Зарафшан"} className={'border-2 rounded-md'} value={device.brand}
                           onChange={(e) => setDevice({...device, brand: e.target.value})}/><br/>

                    <label>Url файла:</label>
                    <input placeholder={"2023-04-15"} className={'border-2 rounded-md'} value={device.filename}
                           onChange={(e) => setDevice({...device, filename: e.target.value})}/><br/>

                <button onClick={addDevice}>Добавить девайс</button>
                <br/>
            </form>
        </div>
    )
}