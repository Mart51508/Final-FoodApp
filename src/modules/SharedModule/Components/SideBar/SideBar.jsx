import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import logoheader from "../../../../assets/images/3.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import img1 from "../../../../assets/4 3.png";
import ChangePass from "../../../AuthenticationModule/Component/changePass/ChangePass";
function SideBar({LoginData}) {

  
console.log(LoginData?.userGroup , LoginData);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();


  let Navigate = useNavigate();
  const [IsCollapsing, setIsCollapsing] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  function Collapse() {
    setIsCollapsing(!IsCollapsing);
  }
  return (
    <>
      <div className="sidebar-container">
        <Sidebar collapsed={IsCollapsing} className="vh-100">
          <Menu className=" py-3 text-white ">

            <MenuItem
              onClick={Collapse}
              className="d-flex justify-content-center align-items-center my-4 px-4 logo-container"
              icon={<img src={logoheader} className="logo-item px-4" />}
              component={<Link to="/Dashboard" />}
            ></MenuItem>
            <MenuItem
              className="fs-3"
              icon={<i className="fa-solid fa-house fa-lg "></i>}
              component={<Link to="/Dashboard" />}
            >
              Home
            </MenuItem>
            {LoginData === 'SuperAdmin' ? <MenuItem
              className="fs-1"
              icon={<i className="fa-solid fa-user-group fa-lg"></i>}
              component={<Link to="/Dashboard/User" />}
            >
              Users
            </MenuItem>:''}
            <MenuItem
              className="fs-1"
              icon={<i className="fa-solid fa-grip-vertical fa-lg"></i>}
              component={<Link to="/Dashboard/Recipes" />}
            >
              Recipes
            </MenuItem>
           {LoginData?.userGroup
 === 'SuperAdmin' ? <MenuItem
              className="fs-1"
              icon={<i className="fa-regular fa-calendar-days fa-lg"></i>}
              component={<Link to="/Dashboard/Categories" />}
            >
              Categories
            </MenuItem>:''}

            {LoginData?.userGroup !== 'SuperAdmin'? <MenuItem
              className="fs-1"
              icon={<i className="fa-regular fa-heart fa-lg"></i>}
              component={<Link to="/Dashboard/Favorite" />}
            >
              Favorites
            </MenuItem>:''}
            <MenuItem
              onClick={handleShow}
              className="fs-1"
              icon={<i className="fa-solid fa-lock fa-lg"></i>}
            >
              Change password
            </MenuItem>
            <MenuItem
              className="fs-1"
              icon={<i className="fa-solid fa-right-from-bracket fa-lg"></i>}
              onClick={logout}
            >
              logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      ;
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <ChangePass/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SideBar;
