import { useState, MouseEvent, Fragment } from 'react';
import IEmployee from '../../interfaces/IEmployee'
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import './EmployeeGrid.css'

interface IPropsEmployeeGrid {
  payload: IEmployee[]
}

function EmployeeGrid(props: IPropsEmployeeGrid) {
  const { payload } = props
  const [isActive, setIsActive] = useState<number[]>([])

  function handleClickButtonDown(e: MouseEvent<HTMLButtonElement>) {
    const currentId = e.currentTarget.value
    setIsActive([...isActive, Number(currentId)])
  }

  function handleClickButtonUp(e: MouseEvent<HTMLButtonElement>) {
    const newList = isActive.filter(a => a !== Number(e.currentTarget.value))
    setIsActive(newList)
  }

  function formatDate(date: Date) {
    const newDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    return newDate
  }

  function formatPhone(p: string) {
    const newPhone =
      `+${p.substring(0,2)} (${p.substring(2,4)}) ${p.substring(4,9)}-${p.substring(9)}`
    return newPhone
  }

  return (
    <table className="employee-container">
      <thead className='employee-header'>
        <tr>
          <th className='col1'>FOTO</th>
          <th className='col2'>NOME</th>
          <th className='col3'>CARGO</th>
          <th className='col4'>DATA DE ADMISSÃO</th>
          <th className='col5'>TELEFONE</th>
          <th className='col6'>&#8226;</th>
        </tr>
      </thead>
      <tbody className='employee-row'>
        {payload.map(employee => (
          <Fragment key={employee.id}>
            <tr>
              <td className='col1'><img src={employee.image} alt='foto' className='photo' /></td>
              <td className='col2'>{employee.name}</td>
              <td className='col3'>{employee.job}</td>
              <td className='col4'>{formatDate(new Date(employee.admission_date))}</td>
              <td className='col5'>{formatPhone(employee.phone)}</td>
              <td className='col6'>
                {
                  isActive.some(a => a === Number(employee.id))
                    ? <button
                        className='arrowButton'
                        onClick={handleClickButtonUp}
                        value={employee.id}
                      >
                        <SlArrowUp />
                      </button>
                    : <button
                        className='arrowButton'
                        onClick={handleClickButtonDown}
                        value={employee.id}
                      >
                        <SlArrowDown />
                      </button>
                }
              </td>
            </tr>
            {
              isActive.some(a => a === Number(employee.id))
                ? <>
                    <tr className='subrow'>
                      <td colSpan={3}>
                        <div className='subcontent'>
                          <div className='subtitle'>Cargo</div>
                          <div>{employee.job}</div>
                        </div>
                      </td>
                    </tr>
                    <tr className='subrow'>
                      <td colSpan={3}>
                        <div className='subcontent'>
                          <div className='subtitle'>Data de adminssão</div>
                          <div>{formatDate(new Date(employee.admission_date))}</div>
                        </div>
                      </td>
                    </tr>
                    <tr className='subrow'>
                      <td colSpan={3}>
                        <div className='subcontent'>
                          <div className='subtitle'>Telefone</div>
                          <div>{formatPhone(employee.phone)}</div>
                        </div>
                      </td>
                    </tr>
                  </>
                : null
            }
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default EmployeeGrid