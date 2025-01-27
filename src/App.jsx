import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/Login/login';
import SignUp from './components/Register-user/register-user';
import UpdatePage from './components/Updates/updates-page';



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
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
