import classes from "./CircleLoader.module.css"

const CircleLoader = () => {
    return (
        <div className={classes["lds-ripple"]}>
            <div></div>
            <div></div>
        </div>
    )
}

export default CircleLoader