import classes from "./HomeNonLoggedIn.module.css"
import {useEffect, useState} from "react";
import CircleLoader from "@/components/UI/LoadingAnimation/CircleLoader/CircleLoader";
const HomeNonLoggedIn = ()=>{
    const [mountComponent, setMountComponent] = useState(false)
    useEffect(() => {
        if (!mountComponent){
            setMountComponent(true)
        }
    }, [mountComponent]);

    if (!mountComponent){
        return (
            <div className={classes.loadingAnimation}>
                <CircleLoader/>
            </div>
        )
    }

    return (
        <div className={classes.homePage}>
            <div className={classes.text}>Please <b>Login</b> Or <b>Signup</b> To Create Journal</div>
        </div>
    )
}

export default HomeNonLoggedIn