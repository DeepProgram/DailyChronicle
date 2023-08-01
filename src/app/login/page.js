import Login from "@/components/Login/Login";
import {Fragment} from "react";
import HeaderNonLoggedIn from "@/components/Header/NonLoggedIn/HeaderNonLoggedIn";
export default function Home() {
    return (
       <Fragment>
           <HeaderNonLoggedIn/>
           <Login></Login>
       </Fragment>
    )
}