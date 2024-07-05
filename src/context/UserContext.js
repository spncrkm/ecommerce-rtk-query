import { createContext } from "react"

const UserContext = createContext({
    user: { 
        name: '', 
        password: '', 
        email: '',
        isLoggedIn: false},

    setUser: () => {}
})

export default UserContext;
