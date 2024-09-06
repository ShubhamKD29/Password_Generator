import { useState,  useCallback, useEffect, useRef } from 'react'

function App() {
  const[length,  setLength] = useState(8)
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[password, setPassword] = useState("")

  //---- useRef hook ---
  const passwordRef = useRef(null)
  //---- useCallback hook ---
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "@#$%^&*-~"

    for (let i  = 1;  i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback (() => {
    passwordRef.current?.select()     // using useRef, we can give optimize result to the user
    passwordRef.current?.setSelectionRange(0, 99)                    
    window.navigator.clipboard.writeText(password)
  },[password])

    useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 text-color-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text" 
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
      <button onClick={copyPasswordToClipboard} className='bg-blue-500 text-white font-semibold py-2 px-4 transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105'>copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='h-2 bg-gray-200 rounded-lg appearance-accent-blue cursor-pointer accent-blue-500'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        className='accent-blue-500'
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange = {() => {
          setNumberAllowed((prev) => !prev)
        }}
        />
        <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        className='accent-blue-500'
        defaultChecked={charAllowed}
        id="characterInput"
        onChange = {() => {
         setCharAllowed((prev) => !prev)
        }}
        />
        <label htmlFor="characterInput">Characters</label>
        </div>
     </div>
    </div>
   </>
  )
}


export default App
