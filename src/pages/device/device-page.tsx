import * as React from 'react'
import {redirect, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Device} from "./device-traffic";
import {AxiosError} from "axios/index";

export function DevicePage(){
    const {id} = useParams()
    const [devices, setDevices] = React.useState<Device>({
        id: 0,
        title: '',
        price: 0,
        description: '',
        type: '',
        brand: '',
        filename: ''
    })


    const redirect = useNavigate();

    React.useEffect(() =>{
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/api/devices/${id}`,
            headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        res.then((res) =>{
            setDevices({...res.data})
        }).catch((e) => redirect('/auth'))
    }, [id])

    const time = (value: string) => {
        return value?.slice(0, 10)
    }

    const deleteDevice = () => {
        axios({
            method: 'post',
            url: `http://localhost:8080/api/devices/${devices.id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
            redirect('/device-traffic')
        ).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/device-traffic')
            }})
    }

    const saveCargo = () => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/api/devices/${id}`,
            data: devices,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then((res) => {
            redirect('/device-traffic')
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/device-traffic')
            }})
    }

    // @ts-ignore
    return(
        <div>
            {devices && (
            <div className={'w-[300px] border-2 mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
                <label>Название:</label>
    <input  className={'border-2 rounded-md'} value={devices.title} onChange={(e) => setDevices({...devices, title: e.target.value})}/><br/>
    <label>Цена:</label>
    <input type={"number"} className={'border-2 rounded-md'} value={devices.price} onChange={(e) => setDevices({...devices, price: Number(e.target.value)})}/><br/>
    <label>Описание:</label>
                <textarea className={'border-2 rounded-md'} value={devices.description} onChange={(e) => setDevices({...devices, description: e.target.value})}></textarea>
    {/*<input type={} className={'border-2 rounded-md'} value={devices.description} onChange={(e) => setDevices({...devices, description: e.target.value})}/><br/>*/}
    <br/>
                <label>Тип</label>
    <input  className={'border-2 rounded-md'} value={devices.type} onChange={(e) => setDevices({...devices, type: e.target.value})}/><br/>
    <label>Бренд</label>
    <input  className={'border-2 rounded-md'} value={devices.brand} onChange={(e) => setDevices({...devices, brand: e.target.value})}/><br/>
    <label>Url файла:</label>
    <input className={'border-2 rounded-md'} value={devices.filename} onChange={(e) => setDevices({...devices, filename: e.target.value})}/><br/>
    {
    ((localStorage.getItem('decoded')?.includes('MANAGER'))) &&
    <div className={'mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
    <button onClick={saveCargo}>Сохранить</button>
        <button onClick={deleteDevice}>Удалить</button>
        </div>
}

    {
        ((localStorage.getItem('decoded')?.includes('MANAGER')) == false) &&
        <div className={'mt-4 ml-4 rounded-md box-border p-[10px] flex flex-col'}>
        <button onClick={(e) => redirect('/shop')}>Вернуться</button>
    </div>
    }
    </div>
)}
    </div>
)

}