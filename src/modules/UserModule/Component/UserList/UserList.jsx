import axios from 'axios';
import { useEffect, useState } from 'react';
import ImageHeader from '../../../../assets/images/header.png';
import Header from "../../../SharedModule/Components/Header/Header";
import NoData from '../../../SharedModule/Components/NoData/NoData';
import Modal from "react-bootstrap/Modal";
import DeLeteData from "../../../SharedModule/Components/DeleteData/DeLeteData";

function UserList() {

   const [UserList, setUserList] = useState([]);
   const [UserID, setUserID] = useState('');
   const [NameValue, setNameValue] = useState('');
   const [EmailValue, setEmailValue] = useState('');
   const [CountryValue, setCountryValue] = useState('');
   const [GroupsValue, setGroupsValue] = useState('');
   const [ArrayOfPages , setArrayOfPages ]= useState([])
   const [showDelete, setShowDelete] = useState(false);
   const handleDeleteClose = () => setShowDelete(false);
   const handleDeleteShow = (id) => {
    setUserID(id);
     setShowDelete(true);
   };
 
   async function GetUserList(userName ,email ,country , groups , pageSiza , pageNumber) {
      try {
        let res = await axios.get(
          `https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=${pageSiza}&pageNumber=${pageNumber}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } ,
            params :{userName : userName , email:email , country : country , groups:groups}
          }
      );
        setUserList(res?.data?.data)
        setArrayOfPages(Array(res?.data?.totalNumberOfPages).fill().map((_,i)=> i+1))
        
        console.log(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function DeleteRecipes() {
      try {
        const res = await axios.delete(
          `https://upskilling-egypt.com:3006/api/v1/Users/${UserID}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        GetUserList();
        handleDeleteClose();
      } catch (error) {
        console.log(error);
      }
    }

    function GetUserNameValue(input) {
      setNameValue(input.target.value)
      GetUserList(input.target.value ,EmailValue,CountryValue , GroupsValue , 10 , 1);
    }
  
    function GetEmailValue(input) {
      setEmailValue(input.target.value)
      GetUserList( NameValue ,input.target.value, CountryValue , GroupsValue , 10 , 1);
  
    }
  
    function GetCountryValue(input) {
      setCountryValue(input.target.value)
      GetUserList(NameValue , EmailValue, input.target.value  , GroupsValue , 10 ,1);
    }
  
    function GetGroupsValue(input) {
      setGroupsValue(input.target.value) 
      GetUserList(NameValue , EmailValue, CountryValue, input.target.value  , 10 ,1);
    }
    useEffect(()=>{
      GetUserList('' , '' ,'' ,'',10 ,1)
    },[])

   return (
      <>
         <Header Bold={'User List'} title={' Items'} description={'you can now add your items that any user can order it from the Application and you can edit'} imgUrl={ImageHeader} />
      <div className="container-fluid">
         <div className="row">
            <div className="col-md-6">
            <div className="text m-3">
            <h5>Users Table Details</h5>
            <p className="my-1">you can check all details</p>
          </div>
          </div>
         <div className="filteration">
            <div className="row">
               <div className="col-md-3">
                  <input type="text" placeholder='Search by UserName' className='form-control'  onChange={GetUserNameValue}/>
               </div>
               <div className="col-md-3">
                  <input type="text" placeholder='Search by Email' className='form-control' onChange={GetEmailValue}/>
               </div>
               <div className="col-md-3">
                  <input type="text" placeholder='Search by Country' className='form-control' onChange={GetCountryValue}/>
               </div>
               <div className="col-md-3">
                  <select className='form-control' onChange={GetGroupsValue} >
                     <option disabled value=''>User Group</option>
                     <option value="1">group admin</option>
                     <option value="2">system user</option>
                  </select>
               </div>
            </div>
         </div>
            <table className="table table-striped text-center w-100">
          <thead>
            <tr>
              <th scope="col"> userName</th>
              <th scope="col">image</th>
              <th scope="col"> email</th>
              <th scope="col">Country</th>
              <th scope="col">phoneNumber</th>
              <th scope="col">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {UserList?.length > 0 ? (
              UserList?.map((items) => (
                <tr key={items.id}>
                  <td>{items.userName}</td>
                  <td>
                    {items.imagePath ? (
                      <img
                        src={
                          "https://upskilling-egypt.com:3006/" + items.imagePath

                        }
                        style={{ width: "100px" }}
                      />
                    ) : (
                      <img src={NoData} style={{ width: "100px" }} />
                    )}{" "}
                  </td>
                  <td>{items.email}</td>
                  <td>{items.country }</td>
                  <td>{items.phoneNumber}</td>
                  <td>
                    <i  onClick={() => {
                        handleDeleteShow(items.id);
                      }}
                      className="fa-solid fa-trash mx-4 text-danger"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <NoData/>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <nav aria-label="Page navigation example ">
  <ul className="pagination d-flex justify-content-center">
    <li className="page-item">
      <a className="page-link text-success" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {ArrayOfPages?.map((pageNo , index)=> (
    <li key={index} className="page-item"><a className="page-link text-success" href="#" onClick={()=>{GetUserList(NameValue , EmailValue , CountryValue , GroupsValue , 10 , pageNo)}}>{pageNo}</a></li>
    ))}
   
    <li className="page-item">
      <a className="page-link text-success" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
         </div>
      </div>
      <Modal show={showDelete} onHide={handleDeleteClose} className="p-3">
          <Modal.Body className="p-4 rounded-2">
            <DeLeteData item={"Category"} />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={DeleteRecipes} className="btn btn-outline-danger">
              Delete this item
            </button>
          </Modal.Footer>
        </Modal>
      </>
   );
}

export default UserList;
