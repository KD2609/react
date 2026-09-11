import React,{ useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

  let [counter,setCounter] = useState(5)

  // let counter = 5

  const addValue= () => {
    setCounter(counter + 1);
    console.log("clicked",counter);
  }

  const removeValue = () => {

    if(counter == 0)
        return;
    setCounter(counter - 1);
    console.log("clicked",counter);
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter value : {counter}</h2>
      <br/>

      <button onClick={addValue}> Add Value</button>
      <br></br>
      <button onClick={removeValue}>remove Value</button>
    </>
  )
}

export default App
