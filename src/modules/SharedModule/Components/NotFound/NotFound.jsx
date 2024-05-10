import { useNavigate } from 'react-router-dom'
import logo from '../../../../assets/images/logo.png'
function NotFound() {

    const Navigate = useNavigate()

    function BackToHome(){
        Navigate('/Dashboard')
    }

    return (
      <>
      <div className="Found-pageFound">
        <div className="container">
        <div className="logo">
            <img src={logo} className='w-25' />
        </div>
        <div className="row align-items-center ">
            <div className="col-md-5">
                <div className="text">
                    <h2 className='my-2 NotFoundTitle'>Opps</h2>
                    <h6 className='text-success NotFoundPar'>Page Not Found</h6>
                    <p className='my-3 text-NotFound'>this page doesnt exist or was removed! <br/>
                        we suggest you back to home
                    </p>
                    <button onClick={BackToHome} className='btn btn-success btn-notFound p-2'><i className="fa-solid fa-arrow-left pe-2"></i> Back to home</button>
                </div>
            </div>
        </div>
        </div>
      </div>
      </>
    )
}

export default NotFound
