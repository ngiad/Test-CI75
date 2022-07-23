import React, { useState } from 'react'
import './App.css';
const App = () => {
  // giá trị chả về 
  const [dataLink,setDataLink] = useState({})
  // ------------------
  const [shrtco,setShrtco] = useState(true)
  const [qr,setQr] = useState(false)
  const [shiny,setShiny] = useState(false)
  // value input
  const [valueInput,setValueInput] = useState("")
  
  // html dom
  const SubmitForm = (e) =>{
    e.preventDefault();
    shrtcodeAPI(valueInput)
  } 

  // api
  const shrtcodeAPI = async(URL) =>{
    try {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${URL}`)
      const data = await res.json()
      setDataLink(data.result)
    } catch (error) {
      alert("lỗi")
    }

  }
  console.log(dataLink)
  return (
    <div className='main'>
        <h1>The <span> privacy-friendly</span> URL Shortener</h1>
        <div className='content'>
          <h3>Link Shortener</h3>
          <form onSubmit={SubmitForm}>
            <label for='inputUrl'>Enter a Link :</label>
            <input type="text" value={valueInput} onChange={(e)=>setValueInput(e.target.value)}/>
            <button>Enter</button>
          </form>
          <span>Short domain :</span> 
          <button className={`btn ${shrtco ? `done` : false}`} onClick={()=>setShrtco(shrtco ? false : true)}>shrtco.de</button>
          <button className={`btn ${qr ? `done` : false}`} onClick={()=>setQr(qr ? false : true)}>9pr.de</button>
          <button className={`btn ${shiny ? `done` : false}`} onClick={()=>setShiny(shiny ? false : true)}>shiny.link</button>
        </div>
        <h3>Link Compact</h3>
        {
          !dataLink && <p>Enter link now</p>
        }
        {
          shrtco && <p>{dataLink.full_share_link}</p>
        }
        {
          qr &&  <p>{dataLink.full_short_link2}</p>
        }
        {
          shiny && <p>{dataLink.short_link3}</p>
        }
    </div>
  )
}

export default App