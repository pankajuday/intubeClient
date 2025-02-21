import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../axios"

const Logout = () => {
  const navigate = useNavigate();
  
  
  useEffect(() => {
    let isMounted = true;
    const handleLogout = async () => {
      try {
        if(isMounted){
          await logoutUser()
        console.log("Logout successful")
        navigate("/login")
        }
      } catch (error) {
        if(isMounted){
          console.error("Error logging out:", error)
        }
      }
    }

    handleLogout()
    return ()=>{
      isMounted = false
    }
  }, [navigate])

  return (
  
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      
      <div className="w-full max-w-sm">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-2">Logging out...</h2>
        </div>
      </div>
    </div>
  )
}

export default Logout