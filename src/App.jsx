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
  var[vinput,setvinput]=useState()
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
        const speak=new SpeechSynthesisUtterance(request.data.response)
        speechSynthesis.speak(speak)

  }
  async function submit2(utterence){
    setchats(prev=>[...prev,{type:'user',text:utterence}])
    showintro(false)
    setdisabled(true)
    settext('Thinking...')
    setinput('')
    var request=await axios.post('https://aivora-backend-nkcx.onrender.com/request',{message:utterence,context:JSON.stringify(chats)})
    setchats(prev=>[...prev,{type:'bot',text:request.data.response}])
        setdisabled(false)
        settext('Get answer')
        const speak=new SpeechSynthesisUtterance(request.data.response)
        speak.rate=1.5
        speechSynthesis.speak(speak)

  }
  function listen(){
const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRecognition){
  alert('Tera phone kharab hai')
}
const recognition = new SpeechRecognition() 
recognition.lang = "en-US";
recognition.onresult=(event)=>{
  const txt= event.results[0][0].transcript;
  submit2(txt)
}
recognition.start()
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
        <input value={input} onChange={(e)=>{setinput(e.target.value)}} placeholder='Try writing something...' id='inp' type='text'></input>
        <button disabled={disabled} onClick={submit} id='submit'>{text}</button>
                <button onClick={listen} id='mc'><i class="fa-solid fa-microphone-lines" style={{color: 'rgb(255, 255, 255)'}}></i></button>

      </div>
      </section>
      <footer>Copyright © 2026 Jasmeh Singh</footer>
    </>
  )
}

export default App
