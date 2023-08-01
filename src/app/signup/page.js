import Signup from "@/components/Signup/Signup";
import {Fragment} from "react";
import HeaderNonLoggedIn from "@/components/Header/NonLoggedIn/HeaderNonLoggedIn";


export default function Home(){
    return (
        <Fragment>
            <HeaderNonLoggedIn/>
            <Signup/>
        </Fragment>
    )
}