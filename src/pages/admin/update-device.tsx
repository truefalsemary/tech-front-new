import * as React from 'react'
import axios, {AxiosError} from "axios";
import {useNavigate, useParams} from "react-router-dom";
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

export function UpdateDevice() {
    const [device, setDevice] = React.useState<Device>({
        id: 0,
        title: '',
        price: 0,
        description: '',
        type: '',
        brand: '',
        filename: ''
    })
    const {id} = useParams()
    const redirect = useNavigate()

    React.useEffect(() =>{
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/admins/devices/${id}`,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        res.then((res) =>{
            setDevice(res.data);
        }).catch((e) => redirect('/auth'))
    }, [id])

    const updateDevice = () => {
        const res = axios({
            method: 'post',
            url: 'http://localhost:8080/admins/devices/update',
            data: device,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},

        })
        res.then((res) => {
            redirect('/shop')
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/shop')
            }
        })
    }

    return (
        <div className={"create-device"}>
            <form className={"create-device"}>

                <label>Название:</label>
                <input placeholder={device.title} className={'border-2 rounded-md'} value={device.title}
                       onChange={(e) => setDevice({...device, title: e.target.value})}/><br/>

                <label>Цена:</label>
                <input placeholder={device.price.toString()}  className={'border-2 rounded-md'} value={device.price}
                       onChange={(e) => setDevice({...device, price: Number(e.target.value)})}/><br/>


                <label>Описание:</label>
                <textarea placeholder={device.description} className={'border-2 rounded-md'} value={device.description}
                       onChange={(e) => setDevice({...device, description: e.target.value})}/><br/>

                <label>Тип:</label>
                <input placeholder={device.type} className={'border-2 rounded-md'} value={device.type}
                       onChange={(e) => setDevice({...device, type: e.target.value})}/><br/>

                <label>Бренд:</label>
                <input placeholder={device.brand} className={'border-2 rounded-md'} value={device.brand}
                       onChange={(e) => setDevice({...device, brand: e.target.value})}/><br/>

                <label>Url файла:</label>
                <input placeholder={device.filename} className={'border-2 rounded-md'} value={device.filename}
                       onChange={(e) => setDevice({...device, filename: e.target.value})}/><br/>

                <button onClick={updateDevice}>Обновить</button>
                <br/>
            </form>
        </div>
    )
}