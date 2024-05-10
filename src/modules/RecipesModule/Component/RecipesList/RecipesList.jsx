import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ImageHeader from "../../../../assets/images/header.png";
import DeLeteData from "../../../SharedModule/Components/DeleteData/DeLeteData";
import Header from "../../../SharedModule/Components/Header/Header";
import NoData from "../../../SharedModule/Components/NoData/NoData";

function RecipesList() {


  const Navigate = useNavigate();

     const [showIconIndex, setShowIconIndex] = useState(null);
    
      const handleShowing = (index) => {
        setShowIconIndex(index === showIconIndex ? null : index);
      };

  const [Recipes, setRecipes] = useState([]);
  const [RecipesID, setRecipesID] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setRecipesID(id);
    setShowDelete(true);
  };
  const [CategList, setCategList] = useState([]);
  const [TagList, setTagList] = useState([]);
  const [NameValue, setNameValue] = useState("");
  const [TagValue, setTagValue] = useState("");
  const [CategoryValue, setCategoryValue] = useState("");
  const [ArrayOfPages, setArrayOfPages] = useState([]);
  const [EditRecipeId, setEditRecipeId] = useState("");
  const [showEye, setEyeShow] = useState(false);
  const handleEyeClose = () => setEyeShow(false);
  const handleEyeShow = (id) => {
    setEyeShow(true);
    GetRecipeByID(id);
    setRecipesID(id);
    Favorite(id);
  };
 const [User,setUser]= useState(null)


  async function GetRecipes(name, tagId, categoryId, pageSize, pageNumber) {
    try {
      let res = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { name: name, tagId: tagId, categoryId: categoryId },
        }
      );
      setRecipes(res?.data?.data);
      setArrayOfPages(
        Array(res.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      console.log(res.data, "recipe get");
    } catch (error) {
      console.log(error);
    }
  }


  async function DeleteRecipes() {
    try {
      const res = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${RecipesID}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      GetRecipes();
      handleDeleteClose();
    } catch (error) {
      console.log(error);
    }
  }

  async function GoToRecipeForm() {
    Navigate("/Dashboard/RecipesForm");
  }

  async function GetCategory() {
    try {
      let resp = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCategList(resp?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetTags() {
    try {
      let resp = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTagList(resp?.data);
      console.log(resp, "tags");
    } catch (error) {
      console.log(error);
    }
  }

  function GetNameValue(input) {
    setNameValue(input.target.value);
    GetRecipes(input.target.value, TagValue, CategoryValue, 10, 1);
  }

  function GetTagValue(input) {
    setTagValue(input.target.value);
    GetRecipes(NameValue, input.target.value, CategoryValue, 10, 1);
  }

  function GetCategoryValue(input) {
    setCategoryValue(input.target.value);
    GetRecipes(NameValue, TagValue, input.target.value, 5, 1);
  }

  async function GetRecipeByID(id) {
    try {
      let res = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEditRecipeId(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function Favorite(id) {
    try {
      let res = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe`,
        id,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success('successfully added to favorite list')
    } catch (error) {
      console.log(error);
      toast.error(error.res?.data?.data)
    }
  }

  useEffect(() => {
    GetRecipes();
    GetTags();
    GetCategory("", "", "", 5, 1);
    setUser(JSON.parse(localStorage.getItem('UserData')))
  }, []);
  return (
    <>
      <Header
        Bold={"Recipes"}
        title={" Items"}
        description={
          "you can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={ImageHeader}
      />
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <div className="text m-4">
            <h5>Recipe Table Details</h5>
            <p className="my-1">you can check all details</p>
          </div>
          <div className="button m-3">
            {User?.userGroup == "SuperAdmin" ? (
              <button onClick={GoToRecipeForm} className="btn btn-success m-1">
                Add new Items
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row ">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search By Name.."
              className="form-control my-2"
              onChange={GetNameValue}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control text-muted my-2"
              id="categoriesIds"
              onChange={GetTagValue}
            >
              <option value="" disabled>
                Select Tags
              </option>

              {TagList?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-control text-muted my-2"
              placeholder="categories IDs"
              id="categoriesIds"
              onChange={GetCategoryValue}
            >
              <option value="" disabled>
                Select Category
              </option>

              {CategList?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">item Name</th>
              <th scope="col">image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Tag</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Recipes?.length > 0 ? (
              Recipes?.map((items, index) => (
                <tr key={index} className="align-middle">
                  <td>{items.name}</td>
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
                  <td>{items.price}</td>
                  <td>{items.description}</td>
                  <td>{items.tag.name}</td>
                  <td>{items?.category[0]?.name}</td>
                  <td className="position-relative">
  <i onClick={() => handleShowing(index)} className="fa-solid fa-ellipsis"></i>
  {showIconIndex === index && (
    <div className="position-absolute icons2">
        {User?.userGroup === "SystemUser" ? (
          <>
           <div className="position-absolute icon-3">
            <i
            onClick={() => handleEyeShow(items.id)}
            className="fa-regular fa-eye text-success"
          ></i>
          </div>
           
          </>
        ) : (
          <div className="Container-icons bg-body-tertiary p-1 rounded-2">
              <div className="d-flex">
              <Link to={`/DashBoard/EditingPage/${items.id}`}>
                <i className="fa-solid fa-pen-to-square text-success p-1"></i>
              </Link>
              <i
                onClick={() => handleDeleteShow(items.id)}
                className="fa-solid fa-trash text-danger p-1"
              ></i>
              <i
                onClick={() => handleEyeShow(items.id)}
                className="fa-regular fa-eye p-1"
              ></i>
              </div>
            </div>
        )}
      </div>
  )}
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
          {ArrayOfPages?.slice(0,5)?.map((PageNo, index) => (
            <li key={index} className="page-item ">
              <a
                className="page-link text-success"
                onClick={() => {
                  GetRecipes(NameValue, TagValue, CategoryValue, 5, PageNo);
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


        {/* Delete modal */}
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

        {/* show Model */}
        <Modal show={showEye} onHide={handleEyeClose}>
          <Modal.Header closeButton>
            <Modal.Title>Recipe Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 rounded-2">
            <div className="image text-center">
              <img
                src={
                  "https://upskilling-egypt.com:3006/" + EditRecipeId.imagePath
                }
                style={{ width: "300px" }}
                alt=""
              />
            </div>
            <h4>{EditRecipeId.name}</h4>
            <p>{EditRecipeId.description}</p>
            <div className="icon text-end">
            {User?.userGroup ==='SystemUser'?<button onClick={() => {
                  Favorite({ recipeId: RecipesID });
                }} className="btn btn-outline-success">  <i
                
                className="fa-regular fa-heart "
              >
                Favorite
              </i></button>:''}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default RecipesList;
