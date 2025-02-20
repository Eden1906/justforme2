import React, { useState, useEffect} from 'react'
import '../pages/Messages.css'

const Messages = () => {
  const [message, setMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [messagesList, setMessagesList] = useState([])
  const handleSubmitMessages = async () => {
    console.log({message})
    try{
      const response= await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message})
    })
      const data= await response.json()
      if(response.ok){
        alert("הודעה נשלחה בהצלחה")    
        setMessage('')
    } else{
      alert("שגיאה בשליחת הודעה"+ data.error)
    }
  } catch(error){
    alert(error)
  }
    }
  const openMessagesFinder = () => {
    setIsOpen(!isOpen)
  }
  const handleMessagesFinder = ()=> {
    openMessagesFinder()
  }
  
  const fetchMessages = async ()=> {
    try{
      const response= await fetch("http://localhost:3000/messages")
      const data= await response.json()
      console.log("messages from server:", data)
      setMessagesList(data.allMessages)
      console.log("messages in client side:", data)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    if(isOpen){
      fetchMessages()
    }
  }, [isOpen])

  return (
    <div>
      <h1>עמוד הודעות</h1>
      <input id="messages" placeholder='הכנס את ההודעה' value={message} onChange={(e)=> setMessage(e.target.value)}></input>
      <button id="submit" onClick={handleSubmitMessages}>שלח הודעה</button>
      <button id="find" onClick={handleMessagesFinder}>למציאת הודעות</button>
      {isOpen && (
      <div>
        <p>:הודעות שנתקבלו</p>
        <ul>
          {messagesList.map((msg, index) => (
          <li key={index}>{msg.message}</li>
          ))}
      </ul>

      </div>
      )}
    </div>
  )


}
export default Messages
