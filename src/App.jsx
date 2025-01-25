import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/Login/login';
import SignUp from './components/Register-user/register-user';



function App() {

  return (
    <>
    <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={
              <>
                < SignIn />
              </>
            } />
            <Route path="/register" element={
              <>
                < SignUp />
              </>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
