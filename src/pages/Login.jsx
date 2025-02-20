import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [name, setName] = useState()
    const [password, setPassword]= useState()
    const navigate= useNavigate()

    const handleNavigate= (page)=> {
        navigate('/'+ page)
      }
      
    const handleLogin = async()=> {
        try{
            const response= await fetch("http://localhost:3000/login",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name,password})
            })
            const data= await response.json()
            if(response.ok){
                alert("משתמש התחבר בהצלחה")
                handleNavigate("messages")                
            }else{
                alert("שגיאה בהתחברות"+ data.message)
            }
        }catch(error){
            alert("שגיאה בשרת"+ error)
        }
    }

  return (
    <div>
      <h1>התחברות</h1>
      <input id="name" placeholder='שם' value={name} onChange={(e)=>setName(e.target.value)}></input>
      <input id="password" placeholder='סיסמא' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
      <button id="submit" onClick={handleLogin}>התחבר</button>
      <button onClick={()=>handleNavigate('')}>חזרה לעמוד הבית</button>
    </div>
  )
}

export default Login
