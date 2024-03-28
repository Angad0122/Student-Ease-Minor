
import { createContext,useState, useContext } from "react";

export const UserContext = createContext({
    user:'',
    email:''
})

export const UserProvider =  ({children}) =>{
    const [user , setUser] = useState(null)
    const [email , setEmail] =  useState("") 
    
    return (
    <UserContext.Provider value={{user,setUser,email,setEmail }}>
        {children}
    </UserContext.Provider>
    )
}
export function useUser(){
    return useContext(UserContext);
}