import Avatar from '../../../../assets/images/avatar.png'
function Navbar({LoginData}) {
    return (
        <>
      <div className="container-fluid my-3 p-3 bg-bg-body-tertiary">
       <div className="row  align-align-items-center">
            <div className="col-md-8 col-sm-12 my-sm-3 my-md-1">
            <div className="search-container position-relative">
        <i className="fa fa-search position-absolute "></i>
          <input
            type="search"
            placeholder="Search..."
            className="rounded-pill form-control p-2 ps-5"
          /> 
        </div>
            </div>
            <div className=" col-md-3 col-sm-11 my-sm-3 my-md-1">
                <div>
                    <img src={Avatar} alt="" />
                    <p className='d-inline-block ps-2 text-capitalize'>{LoginData?.userName}</p>
                   <img src="" alt="" />
                </div>
            </div>
            <div className="col-md-1 col-sm-1 my-sm-3">
                <div className="bell ">
                <i className="fa-solid fa-bell fa-xl"></i>

                </div>
            </div>
        </div>
      </div>
        </>
        
    )
}

export default Navbar
