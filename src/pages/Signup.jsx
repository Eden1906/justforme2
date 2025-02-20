import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages/SignUp.css'

const Signup = () => {
  const [name, setName]= useState()
  const [password, setPassword]= useState()
  const navigate= useNavigate()

  const handleReturnToHome = ()=> {
    navigate("/")
  }
  const handleSignUp =  async()=> {
    try {
      const response= await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name,password})
      })
      const data= await response.json()
      if(response.ok){
        alert("הרשמה הושלמה")        
      } else{
        alert("שגיאה בהרשמה" + data.error)
      }
    } catch(error) {
      alert("שגיאה בשרת:", error)
    }
  }

  return(
    <div>
      <h1>עמוד ההרשמה</h1>
      <input id="name" placeholder="שם" value={name} onChange={(e)=> setName(e.target.value)} />
      <input id="password" placeholder='סיסמא' value={password} onChange={(e)=> setPassword(e.target.value)} />
      <button id="submit" onClick={handleSignUp}>הירשם</button>
      <button id="backtohome" onClick={handleReturnToHome}>חזרה לעמוד הבית</button>
    </div>
  )
}
export default Signup
