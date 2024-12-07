import Landing from "./Landing-Page/Landing"
import Register from "./Register-Page/Register"
import Login from "./Login-Page/Login"
import Dashboard from "./Dashboard/Dashboard"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<><Landing/></>}/>
      <Route path="/register" element={<><Register/><ToastContainer/></>}/>
      <Route path="/login" element={<><Login/><ToastContainer/></>}/>
      <Route path="/calculator" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
