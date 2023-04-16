import {React, useState, useEffect} from "react"
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../firebase/firebase"
import {signOut} from "firebase/auth"
import {useRouter} from "next/router"

const userDash = () => {

    const router =  useRouter()
    const [user, setuser] = useAuthState(auth)
    const signoutt = () =>{
        signOut(auth)
        router.push('/')
    }
if(user){
    return(<>
        <div>
        <h1 className="text-center text-red-400 font-mono">User Dashboard</h1>
        <p>{user.displayName}</p>
        </div>
        <button className="bg-red-600 px-4 py-2" onClick={signoutt}>Sign Out</button>
        </>
        )

}
}
export default userDash;