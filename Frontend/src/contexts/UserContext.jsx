
import { createContext, useState, useContext } from "react";

export const UserContext = createContext({
    user: '',
    email: '',
    phoneNumber: 0,
})

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(0)

    return (
        <UserContext.Provider value={{ user, setUser, email, setEmail, phoneNumber, setPhoneNumber }}>
            {children}
        </UserContext.Provider>
    )
}
export function useUser() {
    return useContext(UserContext);
}