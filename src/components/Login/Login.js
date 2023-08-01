"use client"
import classes from "./Login.module.css"
import {useEffect, useState} from "react";
import CircleLoader from "@/components/UI/LoadingAnimation/CircleLoader/CircleLoader";
import useLogin from "@/customHooks/useLogin";
import {useRouter} from 'next/navigation'
import useStore from "@/store/zustandStore";

const Login = () => {
    const router = useRouter()
    const setLoginState = useStore(state => state.setLoginState)

    const [mountComponent, setMountComponent] = useState(false)
    useEffect(() => {
        if (!mountComponent) {
            setMountComponent(true)
        }
    }, [mountComponent]);


    const {
        sentLoginRequestToServer, useLoginServerResponseState,
        setUseLoginServerResponseState
    } = useLogin()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value)
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }
    const loginBtnHandler = () => {
        sentLoginRequestToServer(username.trim(), password.trim())
    }

    useEffect(() => {
        if (useLoginServerResponseState === 2) {
            console.log("Login Successful")
            setLoginState(true)
            router.push("/")
        }
    }, [router, setLoginState, useLoginServerResponseState]);

    if (!mountComponent || (useLoginServerResponseState >= 1 && useLoginServerResponseState <= 2)) {
        return (
            <div className={classes.circleLoadingAnimation}>
                <CircleLoader/>
            </div>
        )
    }

    return (
        <div className={classes.loginContainer}>
            <div className={classes.loginBody}>
                <div className={classes.title}>Log In</div>
                <div className={classes.inputContainer}>
                    <div>Username</div>
                    <input onChange={usernameChangeHandler} className={classes.userName} type={"text"}/>
                </div>
                <div className={classes.inputContainer}>
                    <div>Password</div>
                    <input onChange={passwordChangeHandler} className={classes.passWord} type={"password"}/>
                </div>
                <div className={classes.btnContainer}>
                    <button className={classes.loginBtn} onClick={loginBtnHandler}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login