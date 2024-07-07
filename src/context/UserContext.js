import { createContext } from "react"

const UserContext = createContext({
    newUser: { 
        name: '', 
        password: '', 
        email: '',
        isLoggedIn: false},

    setNewUser: () => {}
})

export default UserContext;
