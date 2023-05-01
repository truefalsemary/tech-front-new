import * as React from 'react'

import { useInput } from "./useInput";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./auth.css"
export function SignUp({changeStage}: {changeStage: React.Dispatch<React.SetStateAction<boolean>>}){

    const username = useInput()
    const password = useInput()
    const passwordConfirm = useInput()

    const redirect = useNavigate()

    const signUp = () => {
        const promise = axios({
            method: 'post',
            url: 'http://localhost:8080/signup',
            data: {username: username.value, password: password.value, passwordConfirm: passwordConfirm.value},
            headers: { "Content-Type": "multipart/form-data" },
        })
        promise.then((res) => {
            changeStage(true)
            // localStorage.setItem('token', res.data.token)
            // redirect('/')
        })
    }

    return(
        <div className={"reg"}>
            <br/>
            <p >Регистрация</p>
            <br/>
            <label>Логин</label>
            <input className={'w-full h-[40px] mt-2 rounded-md border-2'} {...username} />
            <br/>
            <label>Пароль</label>
            <input type="password" {...password} />
            <br/>
            <label>Повторите<br/> пароль</label>
            <input type="password" {...passwordConfirm} />
            <br/>
            <button className={'mt-4'} onClick={signUp}>Зарегистрироваться</button>
            <br/>
            <button className={'mt-2'} onClick={() => changeStage(true)}>Авторизация</button>
        </div>
    )
}