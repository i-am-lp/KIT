import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './components/Login/login';



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
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
