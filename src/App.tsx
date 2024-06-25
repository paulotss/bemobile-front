import { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'
import IEmployee from './interfaces/IEmployee'
import EmployeeTable from './components/EmployeeTable/EmployeeTable'
import Header from './components/Header/Header'
import { IoSearchSharp } from 'react-icons/io5'
import './App.css'

function App() {
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [search, setSearch] = useState<string>('')

  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    const newSearch = e.target.value
    setSearch(newSearch)
  }

  useEffect(() => {
    async function getEmployees() {
      try {
        const { data } = await axios.get('http://localhost:3000/employees')
        setEmployees(data)
      } catch (error) {
        console.log(error)
      }
    }
    getEmployees()
  }, [])

  return (
    <>
      <Header />
      <section className='titleHeader'>
        <h1>Funcionários</h1>
        <div className='search'>
          <input
            type='text'
            className='input-search'
            placeholder='Pesquisar'
            value={search}
            onChange={handleChangeSearch}
          />
          <IoSearchSharp className='icon-search' />
        </div>
      </section>
      <section className='container'>
        <EmployeeTable
          payload={
            employees
              .filter(employee => employee.name.toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()))
          }
        />
      </section>
    </>
  )
}

export default App
