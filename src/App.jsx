import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/Login/login';
import SignUp from './components/Register-user/register-user';
import UpdatePage from './components/Updates/updates-page';
import MainPage from './components/main-newsletter/main-newsletter';



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
            <Route path="/updates" element={
              <>
                < UpdatePage />
              </>
            } />
            <Route path="/newsletter" element={
              <>
                < MainPage />
              </>
            } />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
