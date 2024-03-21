import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";


 export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            console.log("user: ", user);
        });
    
    

    }, []);


return (
    <AuthContext.Provider value={user}>
        {children}
    </AuthContext.Provider>
)
}

