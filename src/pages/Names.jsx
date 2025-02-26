import React, {useState} from 'react'

const Names = () => {
  const [name, setName] = useState("")
  const [allNames, setAllNames]= useState([])
  const handleSubmitName = async ()=> {
    console.log(name)
    try{
      const response = await fetch("http://localhost:3000/addNames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify({name})
      })
      const data = await response.json()
      console.log(data)
    } catch(error){
      console.error(error)
    }
  }
  const handleFindName = async ()=> {
    try {
    const response = await fetch("http://localhost:3000/findNames")
    const data = await response.json()
    setAllNames(data.rows) 
    console.log(allNames)
    } catch(error){
      console.error(error)
    }
  }

  return (
    <div>
      <h1>names</h1>
      <input placeholder='שם' value= {name} onChange={(e)=> setName(e.target.value)}></input>
      <button onClick={handleSubmitName}>שלח</button>
      <button onClick={handleFindName}>מצא את כל השמות שקיימים</button>
    </div>
  )
}

export default Names
