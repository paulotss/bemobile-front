import { useState, useEffect } from 'react'
import axios from 'axios'
import IEmployee from './interfaces/IEmployee'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [employee, setEmployee] = useState<IEmployee | null>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function getEmployees() {
      try {
        const { data } = await axios.get('http://localhost:3000/employees')
        setEmployee(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getEmployees()
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
