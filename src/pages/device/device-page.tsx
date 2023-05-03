import * as React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {AxiosError} from "axios";
import jwtDecode from "jwt-decode";
import "./device-page.css"

export interface Device {
    id: number;
    title: string;
    price: number;
    description: string;
    type: string;
    brand: string;
    filename: string;
}

export function DevicePage(){
    const {id} = useParams()
    const [device, setDevice] = React.useState<Device>({
        id: 0,
        title: '',
        price: 0,
        description: '',
        type: '',
        brand: '',
        filename: ''
    })
    const redirect = useNavigate();
    const imageUrl:string = "../../assets/devices/"+device.filename;
    const token: string | null = localStorage.getItem('token');
    let decodedUsername: string = "";

    if (token !== null) {
        decodedUsername = (jwtDecode(token) as { username: string }).username;
    }


    React.useEffect(() =>{
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/devices/${id}`,
            headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        res.then((res) =>{
            setDevice({...res.data})
        }).catch(() => redirect('/auth'))
    }, [id])



    const addToCart = (username: String, device: Device) => {
        const res = axios({
            method: 'post',
            url: `http://localhost:8080/users/${username}/devices`,
            data: device,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        res.then(() => {
            redirect(`/users/${decodedUsername}/basket`)
        }).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/shop')
            }})
    }

    // @ts-ignore
    return(
        <div className={"product-container"}>
            <div className={"product-image-container"} key={device.id}>
                <p>{device.filename}</p>
                {/*<img className={"product-image"} src={require(imageUrl)} alt={device.filename} />*/}
            </div>
            <div>
                <h1 className="product-name">{device.title}</h1>
                <div className="product-details">
                    <p><b>ID:</b> {id}</p>
                    <p><b>Price:</b> ${device.price}</p>
                    <p><b>Description:</b></p>
                    <p>{device.description}</p>
                    <button className="addToCartBttn" onClick={() => addToCart(decodedUsername, device)}>
                        Add To Basket
                    </button>
                </div>
            </div>
        </div>
)

}