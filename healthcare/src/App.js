import React from 'react'
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import Home from "./pages/Home";
import Prompt from './pages/prompt';



function App() {
  
  return(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/prompt" element={<Prompt />}/>
    </Routes>
    </BrowserRouter>
    
  )
}
export default App;