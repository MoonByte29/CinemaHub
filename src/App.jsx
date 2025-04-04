import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from "./pages/Home"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Home/>
    <Footer/>
    </>
  )
}

export default App
