import AuthBox from "../components/auth-box"
import Quote from "../components/quote"



export const Signup = () =>{
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
            
            <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
                <AuthBox />
            </div>
         
            <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-blue-100 dark:to-purple-100 invisible lg:visible" >
                <Quote />
            </div>
            
        </div>
    )
}