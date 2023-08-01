import useStore from "@/store/zustandStore";
import {useState} from "react";
import axios from "axios";

const useLogin = ()=>{
    const [useLoginServerResponseState, setUseLoginServerResponseState] = useState(0)
    // 0 -> Null State
    // 1- > Sent Request To Server
    // 2 -> Login Successful
    // 3 -> Login Failed
    // 4 -> Server Offline

    const setToken = useStore((state) => state.setToken)
    const sentLoginRequestToServer = (userName, passWord) => {
        setUseLoginServerResponseState(1)
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login?username=${userName}&password=${passWord}`)
            .then(res=>{
                if (res.data.code === 1){
                    setToken(res.data.token)
                    setUseLoginServerResponseState(2)
                }
                else{
                    setUseLoginServerResponseState(3)
                }
            })
            .catch(err=>{
                setUseLoginServerResponseState(4)
            })
    }

    return {
        sentLoginRequestToServer,
        useLoginServerResponseState,
        setUseLoginServerResponseState
    }
}

export default useLogin