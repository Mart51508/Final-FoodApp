import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RecipeHeader from "../../../SharedModule/Components/RecipeHeader/RecipeHeader";

function RecipesForm() {
  const Navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [CategList, setCategList] = useState([]);
  const [TagList, setTagList] = useState([]);
  

  async function onSubmit(data) {
    let RecipeData = AppendToFormData(data);
    try {
      let resp = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Recipe",
        RecipeData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      backtoRecipes();
      
    } catch (error) {
      console.log(error);
    }
  }

  function AppendToFormData(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
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
    } catch (error) {
      console.log(error);
    }
  }
  function backtoRecipes() {
    Navigate("/Dashboard/Recipes");
  }

  useEffect(() => {
    GetCategory();
    GetTags();
  }, []);

  return (
    <>
      <RecipeHeader />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="form-control my-3"
                placeholder="Recipe Name"
                id="RecipeName"
                {...register("name", {
                  required: "Name of Category is required",
                })}
              />
              {errors.name ? (
                <p className="alert alert-danger">{errors.name.message}</p>
              ) : (
                ""
              )}
              <select
                className="form-control my-3 text-muted"
                id="categoriesIds"
                {...register("tagId", { required: "tag ID is required" })}
              >
                <option value="">Select Tags</option>

                {TagList?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>

              {errors.tagId ? (
                <p className="alert alert-danger">{errors.tagId.message}</p>
              ) : (
                ""
              )}

              <input
                type="text"
                className="form-control my-3"
                placeholder="Price"
                id="Price"
                {...register("price", {
                  required: "Price of Category is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid number.",
                  },
                })}
              />
              {errors.price ? (
                <p className="alert alert-danger">{errors.price.message}</p>
              ) : (
                ""
              )}

              <select
                className="form-control my-3 text-muted"
                placeholder="categories IDs"
                id="categoriesIds"
                {...register("categoriesIds", {
                  required: "Category ID is required",
                })}
              >
                <option value="">Select Category</option>

                {CategList?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>

              {errors.categoriesIds ? (
                <p className="alert alert-danger">
                  {errors.categoriesIds.message}
                </p>
              ) : (
                ""
              )}

              <textarea
                className="form-control my-3"
                placeholder="Description"
                id="Description"
                {...register("description", {
                  required: "description is required",
                })}
              />

              {errors.description ? (
                <p className="alert alert-danger">
                  {errors.description.message}
                </p>
              ) : (
                ""
              )}
              <div>
                <input
                  type="file"
                  className="form-control"
                  {...register("recipeImage", {
                    required: "Recipe Image is required",
                  })}
                />
              </div>
              <div className="button my-3">
                <button
                  onClick={backtoRecipes}
                  className="btn btn-outline-success me-2"
                >
                  cancel
                </button>
                <button onClick={backtoRecipes} className="btn btn-success">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default RecipesForm;
