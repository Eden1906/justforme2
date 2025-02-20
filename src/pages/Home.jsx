import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages/Home.css'

const Home = () => {
  const navigate= useNavigate()
  const handleNavigate= (page)=> {
    navigate('/'+ page)
  }

  return (
    <div>
    <h1>עמוד הבית</h1>
      <button id="login" onClick={()=>handleNavigate("login")}>להתחברות</button>
      <button id="signUp" onClick={()=>handleNavigate("signup")}>להרשמה</button>  
    </div>

  )
}

export default Home
