import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import ImageHeader from "../../../../assets/images/header.png";
import DeLeteData from "../../../SharedModule/Components/DeleteData/DeLeteData";
import Header from "../../../SharedModule/Components/Header/Header";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import { useNavigate } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState("");
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const [User, setUser] = useState(null);
  const Navigate = useNavigate();

  const [showIconIndex, setShowIconIndex] = useState(null);

  const handleShowing = (index) => {
    setShowIconIndex(index === showIconIndex ? null : index);
  };

  const handleClose = () => {
    setShow(false);
    setEditingCategory(null);
  };

  const handleShow = () => setShow(true);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setCatId(id);
    setShowDelete(true);
  };
  const [ArrayOfPages, setArrayOfPages] = useState([]);
  const [NameValue, setNameValue] = useState("");

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setValue("name", category.name);
    handleShow();
  };

  const getCategories = async (name, pageSize, pageNumber) => {
    try {
      const resp = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { name: name },
        }
      );
      setCategories(resp?.data?.data);
      setArrayOfPages(
        Array(resp?.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      let resp;
      if (editingCategory) {
        resp = await axios.put(
          `https://upskilling-egypt.com:3006/api/v1/Category/${editingCategory.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        resp = await axios.post(
          "https://upskilling-egypt.com:3006/api/v1/Category/",
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      getCategories();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getCategories();
      handleDeleteClose();
    } catch (error) {
      console.log(error);
    }
  };

  function GetNameValue(input) {
    setNameValue(input.target.value);
    getCategories(input.target.value, 10, 1);
  }

  useEffect(() => {
    getCategories("", 10, 1);
    let userinfo = JSON.parse(localStorage.getItem("UserData"));
    setUser(userinfo);
    if (userinfo?.userGroup === "SystemUser") {
      Navigate("/");
    }
  }, []);

  return (
    <>
      <Header
        Bold={"Categories"}
        title={" Items"}
        description={
          "you can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={ImageHeader}
      />
      <div className="container-fluid">
        <div className="row align-items-center my-3">
          <div className="col-sm-12 col-md-8 col-lg-10">
            <div className="text m-3">
              <h5>Categories Table Details</h5>
              <p className="my-1">you can check all details</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-2">
            <div className="button m-3">
              <button onClick={handleShow} className="btn btn-success m-1">
                Add new Category
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input
              type="text"
              placeholder="Search By Name"
              onChange={GetNameValue}
              className="form-control"
            />
          </div>
        </div>
        <table className="table text-center table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Creation Date</th>
              <th scope="col">Modification Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className=" text-center ">
            {categories?.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <NoData />
                </td>
              </tr>
            ) : (
              categories?.map((category, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{category.name}</td>
                  <td>
                    {new Date(category.creationDate).toLocaleDateString(
                      "en-US"
                    )}
                  </td>
                  <td>
                    {new Date(category.modificationDate).toLocaleDateString(
                      "en-US"
                    )}
                  </td>
                  <td className="position-relative">
                    <i
                      onClick={() => handleShowing(index)}
                      className="fa-solid fa-ellipsis "
                    ></i>
                    {showIconIndex === index ? (
                      <div className="position-absolute icons">
                        <div className="Container-icons bg-body-tertiary p-1 rounded-2">
                          <i
                            onClick={() => handleEditCategory(category)}
                            className="fa-solid fa-pen-to-square mx-2 text-success "
                          ></i>
                          <i
                            onClick={() => handleDeleteShow(category.id)}
                            className="fa-solid fa-trash mx-2 text-danger"
                          ></i>
                        </div>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination d-flex justify-content-center ">
            <li className="page-item">
              <a
                className="page-link text-success"
                href="#"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {ArrayOfPages.slice(0, 5)?.map((PageNo, index) => (
              <li key={index} className="page-item">
                <a
                  className="page-link text-success"
                  onClick={() => {
                    getCategories(NameValue, 10, PageNo);
                  }}
                >
                  {PageNo}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link text-success" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        <Modal show={show} onHide={handleClose} className=" p-3  ">
          <Modal.Header className="d-flex justify-content-between">
            <h3>{editingCategory ? "Edit Category" : "Add Category"}</h3>
            <i onClick={handleClose} className="fa-solid fa-x m-3"></i>
          </Modal.Header>
          <Modal.Body className="p-4 rounded-2">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="text"
                      className="form-control my-3"
                      placeholder="Category Name"
                      id="CategoryName"
                      {...register("name", {
                        required: "Name of Category is required",
                      })}
                    />
                    {errors.name ? (
                      <p className="alert alert-danger">
                        {errors.name.message}
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="text-end">
                      <button className="btn btn-success ">
                        {editingCategory ? "Update" : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Delete modal */}
        <Modal show={showDelete} onHide={handleDeleteClose} className="p-3">
          <Modal.Body className="p-4 rounded-2">
            <DeLeteData item={"Category"} />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={deleteCategory} className="btn btn-outline-danger">
              Delete this item
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Categories;
