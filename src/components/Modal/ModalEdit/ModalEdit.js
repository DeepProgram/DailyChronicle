import classes from "./ModalEdit.module.css"
import {Fragment, useState} from "react";
import {createPortal} from "react-dom";

const BackDropComponent = (props) => {
    return <div className={classes.backdrop} onClick={()=>{props.modalCloseHandler()}}></div>
}

const ModalComponent = (props)=>{
    const [title, setTitle] = useState(props.noteInfo["note_title"])
    const [body, setBody] = useState(props.noteInfo["note_body"])

    const titleChangeHandler = (event)=> {
        setTitle(event.target.value)
    }

    const bodyChangeHandler = (event) => {
        setBody(event.target.value)
    }

    return (
        <div className={classes.modalContainer}>
            <div className={classes.modalHeader}>
                <div className={classes.text}>Edit Note</div>
                <div className={classes.modalClose} onClick={()=>{props.modalCloseHandler()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                </div>
            </div>
            <div className={classes.modalBody}>
                <div>Title</div>
                <input className={classes.titleInput} type={"text"} value={title} onChange={titleChangeHandler}/>
                <div>Body</div>
                <textarea className={classes.bodyInput} value={body} onChange={bodyChangeHandler}/>
            </div>
            <div className={classes.modalFooter}>
                <div className={classes.cancel} onClick={()=>{props.modalCloseHandler()}}>Cancel</div>
                <div className={classes.save} onClick={()=>{
                    props.editSubmitHandler(props.noteInfo["note_id"], title, body)
                    props.modalCloseHandler()
                }}>Save</div>
            </div>
        </div>
    )
}
const ModalEdit = (props)=>{
    return (
        <Fragment>
            {createPortal(<BackDropComponent modalCloseHandler={props.modalCloseHandler}/>, document.getElementById("backdrop-root"))}
            {createPortal(<ModalComponent noteInfo={props.noteInfo} modalCloseHandler={props.modalCloseHandler}
                editSubmitHandler={props.editSubmitHandler}/>, document.getElementById("modal-root"))}
        </Fragment>
    )
}

export default ModalEdit