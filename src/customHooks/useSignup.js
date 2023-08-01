import {useState} from "react";
import axios from "axios";
import useStore from "@/store/zustandStore";

const useSignup = ()=>{
    const [useSignupServerResponseState, setUseSignupServerResponseState] = useState(0)
    // 0 -> Null State
    // 1- > Sent Request To Server
    // 2 -> Signup Successful
    // 3 -> Signup Failed
    // 4 -> Server Offline

    const setToken = useStore((state) => state.setToken)
    const sendRequestForSignup = (username, password) => {
        setUseSignupServerResponseState(1)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/signup`,{
            "username": username,
            "password": password
        })
            .then(res=>{
                if (res.data.code === 1){
                    setToken(res.data.token)
                    console.log(res.data.token)
                    setUseSignupServerResponseState(2)
                }
                else{
                    setUseSignupServerResponseState(3)
                }
            })
            .catch(err=>{
                 setUseSignupServerResponseState(4)
            })

    }
    return {
        sendRequestForSignup,
        useSignupServerResponseState,
        setUseSignupServerResponseState
    }
}

export default useSignup