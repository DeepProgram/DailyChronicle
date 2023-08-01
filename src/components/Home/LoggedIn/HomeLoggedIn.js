"use client"
import JournalData from "@/components/Home/LoggedIn/JournalData/JournalData";
import classes from "./HomeLoggedIn.module.css"
import {useEffect, useState} from "react";
import CircleLoader from "@/components/UI/LoadingAnimation/CircleLoader/CircleLoader";
import useAddNote from "@/customHooks/useAddNote";
import useGetNoteList from "@/customHooks/useGetNoteList";
import useUpdateNote from "@/customHooks/useUpdateNote";
import useDeleteNote from "@/customHooks/useDeleteNote";

const HomeLoggedIn = () => {
    const {
        noteList, setNoteList, sendReqForNoteList, useGetNoteServerResponseState,
        setUseGetNoteServerResponseState
    } = useGetNoteList()

    const {sendReqForUpdateNote, useUpdateNoteServerResponseState,
            setUseUpdateNoteServerResponseState} = useUpdateNote()

    const {sendReqForDeleteNote, useDeleteNoteServerResponseState,
            setUseDeleteNoteServerResponseState} = useDeleteNote()

    const [mountComponent, setMountComponent] = useState(false)

    useEffect(() => {
        if (!mountComponent) {
            sendReqForNoteList()
            setMountComponent(true)
        }
    }, [mountComponent, sendReqForNoteList]);

    const [noteTitle, setNoteTitle] = useState("")
    const [noteBody, setNoteBody] = useState("")

    const noteTitleChangeHandler = (event) => {
        setNoteTitle(event.target.value)
    }
    const noteBodyChangeHandler = (event) => {
        setNoteBody(event.target.value)
    }

    const {
        sendReqForAddNote, useAddNoteServerResponseState,
        setUseAddNoteServerResponseState
    } = useAddNote()
    const submitBtnHandler = () => {
        sendReqForAddNote(noteTitle.trim(), noteBody.trim())
        setNoteTitle("")
        setNoteBody("")
    }

    useEffect(() => {
        if (useGetNoteServerResponseState >= 2) {
            setUseGetNoteServerResponseState(0)
        }
    }, [setUseGetNoteServerResponseState, useGetNoteServerResponseState]);

    useEffect(() => {
        if (useDeleteNoteServerResponseState === 2 && useGetNoteServerResponseState === 0){
            sendReqForNoteList()
            setUseDeleteNoteServerResponseState(0)
        }
    }, [sendReqForNoteList, setUseDeleteNoteServerResponseState, useDeleteNoteServerResponseState, useGetNoteServerResponseState]);

    useEffect(() => {
        if (useUpdateNoteServerResponseState === 2 && useGetNoteServerResponseState === 0){
            sendReqForNoteList()
            setUseUpdateNoteServerResponseState(0)
        }
    }, [sendReqForNoteList, setUseUpdateNoteServerResponseState, useGetNoteServerResponseState, useUpdateNoteServerResponseState]);

    useEffect(() => {
        if (useAddNoteServerResponseState === 2 && useGetNoteServerResponseState === 0) {
            sendReqForNoteList()
            setUseAddNoteServerResponseState(0)
        }

    }, [sendReqForNoteList, setUseAddNoteServerResponseState, useAddNoteServerResponseState, useGetNoteServerResponseState]);

    console.log("useAddNoteServerResponseState", useAddNoteServerResponseState)
    console.log("useGetNoteServerResponseState", useGetNoteServerResponseState)

    const toggleActionsHandler = (index) => {
        console.log("Here")
        setNoteList(prevState => {
            const newArray = [...prevState];
            const oldObj = prevState[index]
            oldObj["selected"] = !oldObj["selected"]
            newArray[index] = oldObj;
            return newArray;
        })
    }

    const editSubmitHandler = (noteId, noteTitle, noteBody) => {
        sendReqForUpdateNote(noteId, noteTitle, noteBody)
    }

    const deleteSubmitHandler = (noteId) => {
        sendReqForDeleteNote(noteId)
    }

    if (!mountComponent && useGetNoteServerResponseState < 2) {
        return (
            <div className={classes.loadBeforeMountingAnimation}>
                <CircleLoader/>
            </div>
        )
    }


    return (
        <div className={classes.homeContainer}>
            <div className={classes.inputContainer}>
                <div className={classes.text}>Title</div>
                <input className={classes.input} type={"text"} value={noteTitle} onChange={noteTitleChangeHandler}/>
                <div className={classes.text}>Body</div>
                <textarea className={classes.input} value={noteBody} onChange={noteBodyChangeHandler}/>
                <div className={classes.instruction}>Use the form above to create a post. Make sure you fill the
                    required title and body fields and then press submit.
                </div>
                <button className={classes.submitBtn} type={"button"} onClick={submitBtnHandler}>Submit</button>
            </div>
            {
                noteList.length !== 0 &&
                <JournalData noteList={noteList} column={3} toggleActionsHandler={toggleActionsHandler}
                    editSubmitHandler={editSubmitHandler} deleteSubmitHandler={deleteSubmitHandler}/>
            }
        </div>
    )
}

export default HomeLoggedIn