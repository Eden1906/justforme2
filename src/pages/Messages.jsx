import React, { useState, useEffect} from 'react'
import '../pages/Messages.css'

const Messages = () => {
  const [message, setMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] =useState(false)
  const [isOpen3, setIsOpen3] = useState(false)
  const [messagesList, setMessagesList] = useState([])
  const [UsersList, setUserList] = useState([])
  const [searchName, setSearchName] = useState('')
  const [thisIsTheSearchName, setThisIsTheSearchName] = useState([])

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
  const openUsersFinder= () => {
    setIsOpen2(!isOpen2)
  }
  const hadleUsersFinder = () => {
    openUsersFinder()
  }
  const openUsersByNameFinder = () => {
    setIsOpen3(!isOpen3)
  }
  const handleUsersByNameFinder = () => {
    openUsersByNameFinder()
  }
  const searchUser = async (name) => {
    try{
      const response = await fetch(`http://localhost:3000/searchuser?name=${name}`)
      const data = await response.json()
      setThisIsTheSearchName(data)
      console.log("search name:", data)
    } catch(error){
      console.log(error)
    }
  }
  const deleteThenames = () => {
    setThisIsTheSearchName([])
    console.log(thisIsTheSearchName)
  }
  const fetchUsers = async ()=> {
    try{
      const response = await fetch("http://localhost:3000/users")
      const data = await response.json()
      console.log("message from server:", data)
      setUserList(data.allUsers)
      console.log("message in client side:", data)
    } catch(error){
      console.log(error)
    }
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
  useEffect(()=> {
    if(isOpen2){
      fetchUsers()
    }
  }, [isOpen2])
  return (
    <div>
      <h1>עמוד הודעות</h1>
      <input id="messages" placeholder='הכנס את ההודעה' value={message} onChange={(e)=> setMessage(e.target.value)}></input>
      <button id="submit" onClick={handleSubmitMessages}>שלח הודעה</button>
      <button id="find" onClick={handleMessagesFinder}>למציאת הודעות</button>
      <button id="find2" onClick={hadleUsersFinder}>למציאת משתמשים</button>
      <button id="find3" onClick={handleUsersByNameFinder}>למציאת משתמשים לפי שם</button>
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
      {isOpen2 && (
        <div>
          <p>משתמשים</p>
          <ul id="userslist">
            {UsersList.map((user, index)=> (
              <li key={index}>{user.name}</li>
          ))}
          </ul>
        </div>
      )}
      {isOpen3 && (
        <div>
        <p>למציאת משתמשים לפי שם</p>
        <input placeholder='חיפוש לפי שם' value={searchName} onChange={(e)=> setSearchName(e.target.value)}></input>
        <button id="submit" onClick={()=>searchUser(searchName)}>מצא משתמש</button>
        <ul>
          {thisIsTheSearchName.map((user,index)=>(
            <li key={index}>{user.name}</li>
          ))}
        </ul>
        <button onClick={()=> deleteThenames()}>נקה</button>
        </div>
      )}
    </div>
  )


}
export default Messages
