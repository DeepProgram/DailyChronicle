import {useState} from "react";
import useStore from "@/store/zustandStore";
import axios from "axios";

const useAddNote = ()=>{
    const [useAddNoteServerResponseState, setUseAddNoteServerResponseState] = useState(0)
    // 0 -> Null State
    // 1- > Sent Request To Server
    // 2 -> Note Add Successful
    // 3 -> Note Add Failed
    // 4 -> Unauthorized Access
    // 5 -> Server Offline

    const token = useStore(state => state.token)
    const sendReqForAddNote = (noteTitle, noteBody)=>{
        setUseAddNoteServerResponseState(1)
        const headers = {"Authorization": `Bearer ${token}`}
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/add`,
            {
                "note_title": noteTitle,
                "note_body": noteBody
            }
            ,{headers})
            .then(res=>{
                if (res.data.code === 1){
                    setUseAddNoteServerResponseState(2)
                }
                else{
                    setUseAddNoteServerResponseState(3)
                }
            })
            .catch(err=>{
                if (err.response === undefined){
                    setUseAddNoteServerResponseState(5)
                }
                else{
                    if (err.response.status === 401){
                        setUseAddNoteServerResponseState(4)
                    }
                    else{
                        setUseAddNoteServerResponseState(5)
                    }
                }
            })
    }

    return {
        sendReqForAddNote,
        useAddNoteServerResponseState,
        setUseAddNoteServerResponseState
    }

}

export default useAddNote