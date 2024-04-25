
import { createContext, useState, useContext } from "react";

export const UserContext = createContext({
    userId: "",
    user: '',
    email: '',
    phoneNumber: 0,
    orders:[],
    cart:[],
})

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [orders,setOrders] = useState([])
    const [cart,setCart] = useState([])

    return (
        <UserContext.Provider value={{userId, setUserId, user, setUser, email, setEmail, phoneNumber, setPhoneNumber, orders, setOrders, cart, setCart }}>
            {children}
        </UserContext.Provider>
    )
}
export function useUser() {
    return useContext(UserContext);
}