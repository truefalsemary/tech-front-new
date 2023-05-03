import * as React from 'react'
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {Device} from "./device-traffic";

export function CreateDevice(){
    const [devices, setDevices] = React.useState<Device>({
        id: 0,
        title: '',
        price: 0,
        description: '',
        type: '',
        brand: '',
        filename: ''
    })

    const redirect = useNavigate()

    const addCargo= ()=>{
        const res = axios({
            method: 'post',
            url: 'http://localhost:8080/devices',
            data: devices,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },

        })
        res.then((res) => {
            redirect('/device-traffic')
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/create-device')
            }})
    }

    return(
        <div className={'ml-4 mt-4 flex flex-col w-[200px] h-[300px]'}>
            <label>Название:</label>
    <input  placeholder={"Тумбочка"} className={'border-2 rounded-md'} value={devices.title} onChange={(e) => setDevices({...devices, title: e.target.value})}/><br/>
    <label>Цена:</label>
    <input  placeholder={"4000000"} className={'border-2 rounded-md'} value={devices.price} onChange={(e) => setDevices({...devices, price: Number(e.target.value)})}/><br/>
    <label>Описание:</label>
    <input placeholder={"Четыре угла"} className={'border-2 rounded-md'} value={devices.description} onChange={(e) => setDevices({...devices, description: e.target.value})}/><br/>
    <label>Тип:</label>
    <input placeholder={"Мебель"} className={'border-2 rounded-md'} value={devices.type} onChange={(e) => setDevices({...devices, type: e.target.value})}/><br/>
    <label>Бренд:</label>
    <input placeholder={"Зарафшан"} className={'border-2 rounded-md'} value={devices.brand} onChange={(e) => setDevices({...devices, brand: e.target.value})}/><br/>
    <label>Url файла:</label>
    <input  placeholder={"2023-04-15"} className={'border-2 rounded-md'} value={devices.filename} onChange={(e) => setDevices({...devices, filename: e.target.value})}/><br/>
    <button onClick={addCargo}>Добавить груз</button><br/>
    </div>
)
}