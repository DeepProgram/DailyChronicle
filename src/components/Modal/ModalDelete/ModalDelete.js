import classes from "@/components/Modal/ModalDelete/ModalDelete.module.css"
import {Fragment} from "react";
import {createPortal} from "react-dom";

const BackDropComponent = (props) => {
    return <div className={classes.backdrop} onClick={()=>{props.modalCloseHandler()}}></div>
}

const ModalComponent = (props)=>{
    return (
        <div className={classes.modalContainer}>
            <div className={classes.modalHeader}>
                <div className={classes.text}>Delete Note</div>
                <div className={classes.modalClose} onClick={()=>{props.modalCloseHandler()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                </div>
            </div>
            <div className={classes.modalBody}>
                <div className={classes.confirmationText}>Are you Sure</div>
                <div className={classes.confirmationText}>Want To <b>Delete</b> This Note ?</div>
            </div>
            <div className={classes.modalFooter}>
                <div className={classes.cancel} onClick={()=>{props.modalCloseHandler()}}>Cancel</div>
                <div className={classes.save} onClick={()=>{
                    props.deleteSubmitHandler(props.noteId)
                    props.modalCloseHandler()
                }}>Confirm</div>
            </div>
        </div>
    )
}
const ModalDelete = (props)=>{
    return (
        <Fragment>
            {createPortal(<BackDropComponent modalCloseHandler={props.modalCloseHandler}/>, document.getElementById("backdrop-root"))}
            {createPortal(<ModalComponent noteInfo={props.noteInfo} modalCloseHandler={props.modalCloseHandler}
                deleteSubmitHandler={props.deleteSubmitHandler} noteId={props.noteId}/>, document.getElementById("modal-root"))}
        </Fragment>
    )
}

export default ModalDelete