import { useState } from 'react'
import name from './assets/name.png'
import './App.css'
import axios from 'axios'
import logo from './assets/logo.png'

function App() {
  var [chats,setchats]=useState([])
  var [input,setinput]=useState()
  var[intro,showintro]=useState(true)
  var[disabled,setdisabled]=useState(false)
  var[text,settext]=useState('Get answer')
  async function submit(){
    setchats(prev=>[...prev,{type:'user',text:input}])
    showintro(false)
    setdisabled(true)
    settext('Thinking...')
    setinput('')
    var request=await axios.post('https://aivora-backend-nkcx.onrender.com/request',{message:input})
    setchats(prev=>[...prev,{type:'bot',text:request.data.response}])
        setdisabled(false)
        settext('Get answer')


  }
  return (
    <>
      <section id ='navbar'>
        <img id='name' src={name}></img>
      </section>
      <hr></hr>
      <section id='top'>
        <section id='playground'>
         {intro? <div id='intro'>
<img id='logo' src={logo}></img>
<h1 id='ip'>Ask Aivora anything</h1>
          </div>:null}
        {chats.map((ele,index)=>{
          return(
            <div className={ele.type}>{ele.text}</div>
          )
        })}

      </section>
      <div id='input'>
        <input onChange={(e)=>{setinput(e.target.value)}} placeholder='Try writing something...' id='inp' type='text'></input>
        <button disabled={disabled} onClick={submit} id='submit'>{text}</button>
      </div>
      </section>
    </>
  )
}

export default App
