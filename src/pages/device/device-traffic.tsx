import * as React from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";

export interface Device {
    id: number;
    title: string;
    price: number;
    description: string;
    type: string;
    brand: string;
    filename: string;
}
const DAYS = 7;
export function DeviceTraffic(){
    const redirect = useNavigate()
    const [devices, setDevices] = React.useState<Array<Device>>([])
    const [initialDevices, setInitialDevices] = React.useState<Array<Device>>([])

    const [search, setSearch] = React.useState('')
    const [gist, setGist] = React.useState<any>([])

    const [isModalVisible, setModalVisible] = React.useState(true);
    // const [disabled, setDisabled] = React.useState(false);
    // const [opacity, setOpacity] = React.useState(1);
    const [checkedTitle, setCheckedTitle] = React.useState(true);
    const [checkedPrice, setCheckedPrice] = React.useState(true);
    const [checkedDescription, setCheckedDescription] = React.useState(true);
    const [checkedType, setCheckedType] = React.useState(true);
    const [checkedBrand, setCheckedBrand] = React.useState(true);


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

    const sort = (value: string) => {
        setDevices((state) => [...state.sort((a: any, b: any) => {
            if (a[value] > b[value]) return 1
            if (a[value] < b[value]) return -1
            return 0
        })])
    }

    const searchDevices = () => {
        setDevices([...initialDevices.filter((a: Device) => {
            return (a.title?.includes(search) && checkedTitle) || (String(a.price)===search && checkedPrice)
                || (a.description?.includes(search) && checkedDescription) || (a.type?.includes(search) && checkedDescription)
                || (a.brand?.includes(search) && checkedBrand)
        })])
    }

    // React.useEffect(() => {
    //     let arr: any[] = [];
    //     for (let i = DAYS - 1; i >= 0; i--) {
    //         let count = 0;
    //         const day = new Date(Date.now() - 86400000 * i);
    //         const formattedToday = day.toISOString().slice(0, 10);
    //         for (let j = 0; j < initialDevices.length; j++) {
    //             // @ts-ignore
    //             if (initialDevices[j].dataTo == formattedToday) {
    //                 count++;
    //             }
    //         }
    //         arr.push({date: formattedToday, count})
    //     }
    //     setGist(arr)
    // }, [initialDevices])







    return (
        <div className={'mt-4 ml-4 flex flex-col'}>
        <div className={'flex flex-row items-center'}>
        {
        ((localStorage.getItem('decoded')?.includes('MANAGER'))) &&
        <button className={'border-2 box-border p-[10px] w-[150px]'}
    onClick={() => redirect('/create-cargo')}>Создать груз
    </button>
}
    <input value={search} onChange={(e) => setSearch(e.target.value)}
    className={'border-2 w-[150px] h-[30px] ml-4 rounded-md'}/>

    <button className={'ml-2 border-2 w-[100px] h-[30px]'}
    onClick={searchDevices}>Поиск
        </button>
        <button className={'ml-2 border-2 w-[30px] h-[30px]'}
    onClick={() => setDevices(initialDevices)}>X
    </button>
    <br/>
    </div>

            <label>Поиск по: </label>
    <label> | Названию </label>
    <input type="checkbox"  checked={checkedTitle}
        onChange={e => setCheckedTitle(e.target.checked)}/>

    <label> | Цене </label>
    <input type="checkbox" checked={checkedPrice}
        onChange={e => setCheckedPrice(e.target.checked)}/>
    <label> | Описанию </label>
    <input type="checkbox" checked={checkedDescription}
        onChange={e => setCheckedDescription(e.target.checked)}/>

    <label> | Типу </label>
    <input type="checkbox" checked={checkedType}
        onChange={e => setCheckedType(e.target.checked)}/>

    <label> | Бренду </label>
    <input type="checkbox" checked={checkedBrand}
        onChange={e => setCheckedBrand(e.target.checked)}/>




    <p>Количество девайсов: {devices.length}</p>
    <table className={'border-2 mt-4'}>
    <thead>
        <th className={'border-2'} onClick={() => sort('title')}>Название</th>
    <th className={'border-2'} onClick={() => sort('price')}>Цена</th>
    <th className={'border-2'} onClick={() => sort('description')}>Описание</th>
    <th className={'border-2'} onClick={() => sort('brand')}>Бренд</th>
    <th className={'border-2'} onClick={() => sort('type')}>Тип</th>
    <th className={'border-2'} onClick={() => sort('filename')}>Название файла</th>
    </thead>
    <tbody>
    {devices.map((device: Device) => (
            <tr className={'border-2'} key={device.id} onClick={() => redirect(`/cargo-page/${device.id}`)}>
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

)
}