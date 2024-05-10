import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import Navbar from '../Navbar/Navbar'

export default function MasterLayout({LoginData}) {
  return (
    <div>
      <div>
        <div className="d-flex">
          <div className='vh-100'>
            <SideBar LoginData={LoginData}/>
          </div>
          <div className=' container-fluid w-100'>
            <Navbar LoginData ={LoginData}/>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}
