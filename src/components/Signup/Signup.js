"use client"
import classes from "./Signup.module.css"
import {useEffect, useState} from "react";
import CircleLoader from "@/components/UI/LoadingAnimation/CircleLoader/CircleLoader";
import useSignup from "@/customHooks/useSignup";
import {useRouter} from "next/navigation";
import useStore from "@/store/zustandStore";

const Signup = ()=>{
    const [mountComponent, setMountComponent]  = useState(false)
    useEffect(() => {
        if(!mountComponent){
            setMountComponent(true)
        }
    }, [mountComponent]);

    const router = useRouter()
    const setLoginState = useStore(state => state.setLoginState)

    const {sendRequestForSignup, useSignupServerResponseState,
            setUseSignupServerResponseState} = useSignup()

    useEffect(() => {
        if (useSignupServerResponseState === 2){
            setLoginState(true)
            router.push("/")
        }
    }, [router, setLoginState, useSignupServerResponseState]);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const userNameChangeHandler = (event)=>{
        setUsername(event.target.value)
    }

    const passwordChangeHandler = (event)=>{
        setPassword(event.target.value)
    }

    const signupClickHandler = ()=>{
        sendRequestForSignup(username.trim(), password.trim())
    }

    if(!mountComponent || (useSignupServerResponseState >= 1 && useSignupServerResponseState <= 2)){
        return (
            <div className={classes.loadAnimation}>
                <CircleLoader/>
            </div>
        )
    }

    return (
        <div className={classes.signupContainer}>
            <div className={classes.signup}>
                <div className={classes.signupHeader}>
                    <div className={classes.signupText}>Sign Up</div>
                </div>
                <div className={classes.signupBody}>
                    <div className={classes.usernameContainer}>
                        <div>Username</div>
                        <input type={"text"} value={username} onChange={userNameChangeHandler}/>
                    </div>
                    <div className={classes.passwordContainer}>
                        <div>Password</div>
                        <input type={"password"} value={password} onChange={passwordChangeHandler}/>
                    </div>
                </div>
                <div className={classes.signupFooter}>
                    <button type={"button"} onClick={signupClickHandler}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Signup