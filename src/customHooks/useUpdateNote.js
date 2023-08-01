import {useState} from "react";
import useStore from "@/store/zustandStore";
import axios from "axios";

const useUpdateNote = () => {
    const [useUpdateNoteServerResponseState, setUseUpdateNoteServerResponseState] = useState(0)
    // 0 -> Null State
    // 1- > Sent Request To Server
    // 2 -> Update Successful
    // 3 -> Update Failed
    // 4 -> Unauthorized Access
    // 5 -> Server Offline

    const token = useStore(state => state.token)
    const sendReqForUpdateNote = (noteId, noteTitle, noteBody) => {
        setUseUpdateNoteServerResponseState(1)
        const headers = {"Authorization": `Bearer ${token}`}
        axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/update?note_id=${noteId}`,
            {
                "note_title": noteTitle,
                "note_body": noteBody
            }, {headers})
            .then(res => {
                if (res.data.code === 1) {
                    setUseUpdateNoteServerResponseState(2)
                } else {
                    setUseUpdateNoteServerResponseState(3)
                }
            })
            .catch(err => {
                if (err.response === undefined) {
                    setUseUpdateNoteServerResponseState(5)
                } else {
                    if (err.response.status === 401) {
                        setUseUpdateNoteServerResponseState(4)
                    } else {
                        setUseUpdateNoteServerResponseState(5)
                    }
                }
            })
    }
    return {
        sendReqForUpdateNote,
        useUpdateNoteServerResponseState,
        setUseUpdateNoteServerResponseState
    }
}

export default useUpdateNote