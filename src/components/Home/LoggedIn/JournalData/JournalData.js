"use client"
import classes from "./JournalData.module.css";
import {Fragment, useEffect, useState} from "react";
import ModalEdit from "@/components/Modal/ModalEdit/ModalEdit";
import useDeviceCheck from "@/customHooks/useDeviceCheck";
import ModalDelete from "@/components/Modal/ModalDelete/ModalDelete";

const GenerateNotesList = (props) => {
    const firstSectionNotesList = []
    const secondSectionNotesList = []
    const thirdSectionNotesList = []
    props.noteList.forEach((obj, index) => {
        const val = index % ((props.deviceType === 0) ? 3 : 2);
        const localArray = (val === 0)?firstSectionNotesList:(val===1)?secondSectionNotesList:thirdSectionNotesList
        localArray.push(
            <div key={index} className={classes.dataContainer} onClick={() => {
                props.toggleActionsHandler(index)
            }}>
                <div className={classes.title}>
                    {obj["note_title"]}
                </div>
                <div className={classes.body}>
                    {obj["note_body"]}
                </div>
                {
                    obj["selected"] &&
                    <div className={classes.actions}>
                        <button type={"button"} className={classes.edit} onClick={() => {
                            props.setSelectedNoteIndex(index)
                            props.btnEditHandler()
                        }}>Edit
                        </button>
                        <button type={"button"} className={classes.delete} onClick={
                            () => {
                                props.setSelectedNoteIndex(index)
                                props.btnDeleteHandler()
                            }
                        }>Delete
                        </button>
                    </div>
                }
            </div>
        )

    })
    return (
        <Fragment>
            {
                <div className={classes.firstSections}>
                    {
                        firstSectionNotesList
                    }
                </div>

            }
            {
                <div className={classes.secondSections}>
                    {secondSectionNotesList}
                </div>

            }
            {
                props.deviceType === 0 &&
                <div className={classes.thirdSections}>
                    {thirdSectionNotesList}
                </div>

            }
        </Fragment>
    )
}
const JournalData = (props) => {
    const [mountComponent, setMountComponent] = useState(false)
    useEffect(() => {
        if (!mountComponent) {
            setMountComponent(true)
        }
    }, [mountComponent]);

    const {deviceType} = useDeviceCheck()


    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1)
    const btnEditHandler = () => {
        if (!showModal) {
            setShowModal(true)
        }
    }

    const btnDeleteHandler = () => {
        if (!showDeleteModal) {
            setShowDeleteModal(true)
        }
    }

    const modalCloseHandler = () => {
        setShowModal(false)
        setShowDeleteModal(false)
    }


    if (!mountComponent) {
        return null
    }


    return (
        <div className={classes.journalDataContainer}>
            {
                <GenerateNotesList noteList={props.noteList} deviceType={deviceType}
                                   setSelectedNoteIndex={setSelectedNoteIndex} btnEditHandler={btnEditHandler}
                                   toggleActionsHandler={props.toggleActionsHandler}
                                    btnDeleteHandler={btnDeleteHandler}/>
            }
            {
                showModal &&
                <ModalEdit noteInfo={props.noteList[selectedNoteIndex]} modalCloseHandler={modalCloseHandler}
                           editSubmitHandler={props.editSubmitHandler}></ModalEdit>
            }
            {
                showDeleteModal &&
                <ModalDelete deleteSubmitHandler={props.deleteSubmitHandler}
                             noteId={props.noteList[selectedNoteIndex]["note_id"]}
                             modalCloseHandler={modalCloseHandler}/>
            }
        </div>
    )
}

export default JournalData