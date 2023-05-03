import * as React from 'react'

import { useInput } from "./useInput";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./auth.css";

export function SignIn({changeStage}: {changeStage: React.Dispatch<React.SetStateAction<boolean>>}){

    const username = useInput()
    const password = useInput()

    const redirect = useNavigate()

    const signIn = () => {
        const promise = axios({
            method: 'post',
            url: 'http://localhost:8080/login',
            data: {username: username.value, password: password.value},
            headers: { "Content-Type": "multipart/form-data" },
        })
        promise.then((res) => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('decoded', window.atob(res.data.token.split(".")[1]))
            redirect('/')
            window.location.reload(); // Reload the page
        })
    }


    return(
        <div>
            <br/>
            <p className={'text-[24px] text-center'}>Авторизация</p>
            <label>Логин</label>
            <input  {...username} />
            <br/>
            <label>Пароль</label>
            <input type="password" {...password} />
            <br/>
            <button onClick={signIn}>Войти</button>
            <br/>
            <button onClick={() => changeStage(false)}>Зарегистрироваться</button>
        </div>
    )
}