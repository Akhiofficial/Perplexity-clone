import { RouterProvider } from "react-router-dom"
import { router } from "./app.routes"
import { useAuth } from "../features/auth/hooks/useAuth"
import { useEffect } from "react"

const App = () => {

  const auth = useAuth()
  // it calls when page loads or re-loads its called hydration of data
  useEffect(() => {
    auth.handleGetMe()
  }, [])
  

  return (
    <RouterProvider router={router} />
  )
}

export default App