import { useState,useEffect } from 'react'
import {ThemeContextProvider} from './context/theme'
import Card from './components/card'
import ThemeButton from './components/themeButton'
import './App.css'

function App() {
  const[themeMode, setThemeMode] = useState("light");
  
  const lightTheme = () => {
    setThemeMode("light");
  }

  const darkTheme = () => {
    setThemeMode("dark");
  }

  //actual change in theme

  useEffect(() => {
    document.querySelector('html').classList.remove(themeMode === "light" ? "dark" : "light");
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);


  return (
    <ThemeContextProvider value = {{themeMode, lightTheme, darkTheme}}>
      
    <div className="flex flex-wrap min-h-screen items-center">
      <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
              <ThemeButton />
          </div>

          <div className="w-full max-w-sm mx-auto">
              < Card />
          </div>
      </div>
    </div>

    </ThemeContextProvider>
  )
}

export default App
