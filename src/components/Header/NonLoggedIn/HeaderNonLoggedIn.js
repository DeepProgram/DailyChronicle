"use client"
import classes from "./HeaderNonLoggedIn.module.css"
import {Fragment, useEffect, useState} from "react";
import useDeviceCheck from "@/customHooks/useDeviceCheck";
import Link from "next/link";


const HeaderNonLoggedIn = () => {
    const [mountComponent, setMountComponent] = useState(false)
    useEffect(() => {
        if (!mountComponent) {
            setMountComponent(true)
        }
    }, [mountComponent]);


    const {deviceType} = useDeviceCheck()

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const btnMobileMenuToggle = () => {
        setShowMobileMenu(prevState => !prevState)
    }


    if (!mountComponent) {
        return null
    }

    return (
        <Fragment>
            <div className={classes.container}>
                <div className={classes.header}>
                    <div className={classes.logoContainer}>
                        <div className={classes.logoTextFirst}>Digital Journal</div>
                        <div className={classes.separator}>|</div>
                        <div className={classes.logoTextSecond}>Create A Note</div>
                    </div>
                    {
                        deviceType === 0 &&
                        <div className={classes.loginSignup}>
                            <div className={classes.login}>
                                <Link href={"/login"}>Log In</Link>
                            </div>
                            <div><Link href={"/signup"}>Sign Up</Link></div>
                        </div>
                    }
                    {
                        deviceType !== 0 &&
                        <div className={classes.loginSignup} onClick={btnMobileMenuToggle}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path
                                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                            </svg>
                        </div>
                    }

                </div>
            </div>


            {
                deviceType !== 0 && showMobileMenu &&
                <div className={classes.mobileMenuContainer}>
                    <button className={classes.mobileLogin}>
                        <Link href={"/login"}>Log In</Link>
                    </button>
                    <button className={classes.mobileSignup}><Link href={"/signup"}>Sign Up</Link></button>
                </div>
            }
        </Fragment>
    );
};

export default HeaderNonLoggedIn;


