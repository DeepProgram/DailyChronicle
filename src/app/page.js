"use client"
import HomeNonLoggedIn from "@/components/Home/NonLoggedIn/HomeNonLoggedIn";
import HeaderNonLoggedIn from "@/components/Header/NonLoggedIn/HeaderNonLoggedIn";

import HomeLoggedIn from "@/components/Home/LoggedIn/HomeLoggedIn";
import useStore from "@/store/zustandStore";
export default function Home() {
    const loginState = useStore(state => state.loginState)
    return (
        <main>
            <HeaderNonLoggedIn/>
            {
                !loginState &&
                <HomeNonLoggedIn/>
            }
            {
                loginState &&
                <HomeLoggedIn/>
            }


        </main>
    )
}
