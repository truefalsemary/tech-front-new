import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {AxiosError} from "axios";
interface User {
    id: number;
    userId: number;
    username: string;
    countOrders: number;
    totalCost: number;
}

export function AllUsers() {

    const [users, setUsers] = useState(Array<User>);
    const {username} = useParams();
    const redirect = useNavigate();
    const [totalMoney, setTotalMoney] = useState();
    const [sortDirect, setSortDirect] = useState("ascending");

    React.useEffect(() => {
        const res = axios({
            method: 'get',
            url: `http://localhost:8080/admins/users`,
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        res.then((res) => {
            setUsers(res.data);
        }).catch((e) => redirect('/auth'))
    }, [username])

    const sort = (value: string) => {
        setUsers((state) => [...state.sort((a: any, b: any) => {
            if (a[value] > b[value]) return sortDirect ==='ascending' ? 1 : -1
            if (a[value] < b[value]) return sortDirect ==='ascending' ? -1 : 1
            return 0
        })])
    }

    const requestSort = (value: string) => {
        setSortDirect(sortDirect==='ascending' ? 'descending' : 'ascending')
        sort(value);
    }

    const deleteUser = (id: number) => {
        axios({
            method: 'post',
            url: `http://localhost:8080/admins/users/${id}`,
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
        {
            window.location.reload(); // Reload the page
            redirect('/all-users')
        }

        ).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/all-users')
            }})
    }

    const createAdmin = (user: User) => {
        axios({
            method: 'post',
            url: `http://localhost:8080/admins/new-admin`,
            data: user,
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` },
        }).then(() =>
            redirect('/all-users')
        ).catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                redirect('/auth')
            } else if (reason.response!.status === 403) {
                redirect('/all-users')
            }})
    }

    return (
        <div>
            {/*<h1>Orders</h1>*/}
            <h1>Количество пользователей: {users.length}</h1>
            <div className={"center"}>
                <table className={'border-2 mt-4'}>
                    <thead>
                    <tr>
                        <th >
                            <button type="button" onClick={() => requestSort('id')}>
                                userID
                            </button>
                        </th>

                        <th>
                            <button type="button" onClick={() => requestSort('username')}>
                                username
                            </button></th>

                        <th >
                            <button type="button" onClick={() => requestSort('countOrders')}>
                                count orders
                            </button>
                        </th>

                        <th >
                            <button type="button" onClick={() => requestSort('totalCost')}>
                                user cost
                            </button>
                        </th>

                        <th >Actions</th>


                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: User) => (
                        <tr key={user.id}>
                            <td>{user.id} </td>
                            <td>{user.username} </td>
                            <td>{user.countOrders}</td>
                            <td>{user.totalCost} ₽</td>

                            <td>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

