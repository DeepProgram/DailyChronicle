import {useState} from "react";
import useStore from "@/store/zustandStore";
import axios from "axios";

const useGetNoteList = ()=>{
    const [noteList, setNoteList] = useState([])
    const [useGetNoteServerResponseState, setUseGetNoteServerResponseState] = useState(0)
    // 0 -> Null State
    // 1- > Sent Request To Server
    // 2 -> Notes Found
    // 3 -> Notes Not Found
    // 4 -> Unauthorized Access
    // 5 -> Server Offline

    const token = useStore(state => state.token)
    const sendReqForNoteList = ()=>{
        setUseGetNoteServerResponseState(1)
        const headers = {"Authorization": `Bearer ${token}`}
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/view`, {headers})
            .then(res=>{
                if (res.data.code === 1){
                    setNoteList(res.data.notes)
                    setUseGetNoteServerResponseState(2)
                }
                else{
                    setUseGetNoteServerResponseState(3)
                }
            })
            .catch(err=>{
                if (err.response === undefined){
                    setUseGetNoteServerResponseState(5)
                }
                else{
                    if (err.response.status === 401){
                        setUseGetNoteServerResponseState(4)
                    }
                    else{
                        setUseGetNoteServerResponseState(5)
                    }
                }
            })
    }
    return {
        noteList,
        setNoteList,
        sendReqForNoteList,
        useGetNoteServerResponseState,
        setUseGetNoteServerResponseState
    }
}

export default useGetNoteList