import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Card from './components/card'

 

export default function App() {
  const[count,setCount] = useState(0)
  let myObj = {
    username : "Dipesh",
    age : 20
  }

  let newArr = [1,2,3,4]
  return (
    <div className="md:max-w-sm w-full p-6 rounded-xl shadow-xl bg-black border border-zinc-800 hover:border-white transition-all duration-300 hover:transform hover:scale-105 group">
      <h1 className="bg-green-400 text-black p-4 rounded-xl mb-4">
        Tailwind Test
      </ h1>
      <Card username = "Chai aur code" someObj = {newArr}/>
      <Card username = "hitesh"/>

      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-white text-black rounded-full mb-3">
          Featured
        </span>
        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors duration-200">
          Modern Design Solutions
        </h2>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        Discover cutting-edge design patterns and UI components that elevate
        your digital experiences.
      </p>

      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-white hover:bg-gray-200 text-black text-sm rounded-lg transition-colors duration-200">
          Learn More
        </button>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>234 views</span>
        </div>
      </div>
    </div>
  );
}

