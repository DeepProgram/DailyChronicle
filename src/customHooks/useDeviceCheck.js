import {useEffect, useState} from "react";


const useDeviceCheck = ()=>{
    const [deviceType, setDeviceType] = useState(0)
    // 0 -> Desktop [Min Width 1224px]
    // 1 -> Tablet [Max Width 1223px]
    // 2 -> Mobile [Max Width 414px]

    useEffect(() => {
        const checkDevice = () => {
            const windowWidth = window.innerWidth
            if (windowWidth >= 1200) {
                setDeviceType(0)
            } else if (windowWidth > 414) {
                setDeviceType(1)
            } else {
                setDeviceType(2)
            }
        };

        // Initial check on component mount
        checkDevice();

        // Event listener to check when the window size changes
        window.addEventListener('resize', checkDevice);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkDevice);
        };
    }, []);

    return {
        deviceType
    }
}

export default useDeviceCheck