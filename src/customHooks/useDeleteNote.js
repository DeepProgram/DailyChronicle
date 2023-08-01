import {useState} from "react";
import useStore from "@/store/zustandStore";
import axios from "axios";


const useDeleteNote = () => {
    const [useDeleteNoteServerResponseState, setUseDeleteNoteServerResponseState] = useState(0)
    // 0 -> Null State
    // 1- > Sent Request To Server
    // 2 -> Deletion Successful
    // 3 -> Deletion Failed
    // 4 -> Unauthorized Access
    // 5 -> Server Offline

    const token = useStore(state => state.token)
    const sendReqForDeleteNote = (noteId) => {
        setUseDeleteNoteServerResponseState(1)
        const headers = {"Authorization": `Bearer ${token}`}
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/delete?note_id=${noteId}`, {headers})
            .then(res => {
                if (res.data.code === 1) {
                    setUseDeleteNoteServerResponseState(2)
                } else {
                    setUseDeleteNoteServerResponseState(3)
                }
            })
            .catch(err => {
                if (err.response === undefined) {
                    setUseDeleteNoteServerResponseState(5)
                } else {
                    if (err.response.status === 401) {
                        setUseDeleteNoteServerResponseState(4)
                    } else {
                        setUseDeleteNoteServerResponseState(5)
                    }
                }
            })
    }
    return {
        sendReqForDeleteNote,
        useDeleteNoteServerResponseState,
        setUseDeleteNoteServerResponseState
    }
}

export default useDeleteNote