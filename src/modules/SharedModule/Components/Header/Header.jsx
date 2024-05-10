function Header({title, description , imgUrl , Bold}) {
  
  return (
    <>
      <div className="container-fluid bg-header">
      <div className="">

              <div className="row align-items-center text-white p-sm-5 px-3">
                <div className="  col-sm-6 col-md-7 col-lg-9 p-3">
                <div className="text">
                <p className="title fs-5 "><span className='span'>{Bold}</span>{title} </p>
                    <p className="fs-5"> {description} </p>
                </div>
                </div>
                <div className=" col-sm-6 text-text-sm-center col-md-4 col-lg-3">
                    <img src={imgUrl} className="w-75" />
                </div>
               </div>
              </div>
               </div>
      
    </>
  );
}

export default Header;
