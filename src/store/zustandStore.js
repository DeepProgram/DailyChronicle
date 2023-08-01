import {create} from "zustand";

const useStore = create((set)=> ({
    token: "",
    setToken: (newToken) => set((state) => ({token: newToken})),
    loginState: false,
    setLoginState: (newLoginState) => set((state) => ({loginState: newLoginState}))
}))

export default useStore