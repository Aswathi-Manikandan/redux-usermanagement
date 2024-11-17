import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className='bg-slate-600'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <h1 className='font-bold'>Usermanagement</h1>
            <ul className='flex gap-4'>
                <li>Home</li>
                <li>About</li>
                <li>Sign In</li>
            </ul>
        </div>
      
    </div>
  )
}

export default Header
