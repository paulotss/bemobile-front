import logo from '../../assets/bemobile.png'
import './Header.css'

function Header() {
  return (
    <header className='header'>
      <div className='logo'><img src={logo} alt='Be Mobile' /></div>
    </header>
  )
}

export default Header
