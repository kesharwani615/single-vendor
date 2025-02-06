import React, { useEffect, useRef, useState } from "react";
import { EditCategoryProductSlice, GetProductCategorySlice } from "../../../redux/features/ProductCategorySlice";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onImageHandler } from "../../../components/UploadImageOnBucket";
import { toast } from "react-toastify";

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams()
  const AnchorRef = useRef(null)

  const [image, setImage] = useState("");

  const [data, setData] = useState({
    categoryName: "",
    categoryImage: null,
  });

  useEffect(()=>{
     dispatch(GetProductCategorySlice()).then(
          (res) => {
            console.log("res", res);
            const dummyData = res?.payload?.data?.category;
            const filteredData = dummyData.find((data)=>data._id === id);
            if(filteredData){
              setData({
                categoryName: filteredData.categoryName,
                categoryImage: filteredData.categoryImage,
              });
              // setImage(filteredData.categoryImage);
            }
          }
        );
  },[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange =async (e) => {
    const { name, files } = e.target;
    // setImage(URL.createObjectURL(files[0]));
    const data = await onImageHandler(e);
    setData((prevState) => ({
      ...prevState,
      [name]: data[1]?.location,
    }));
  };

  const handleSubmit = () => {

    if (
      !Object.entries(data)
        .map(([key, value]) => value?.trim()?.length) 
        .every((item) => item > 0)
    ) {
      toast.error("Please fill the details!");
      return;
    }


    const formData = new FormData();
    formData.append("categoryName", data.categoryName);
    formData.append("categoryImage", data.categoryImage);

    console.log("data:", data);

    dispatch(EditCategoryProductSlice({ id, formData })).then((res)=>{
      AnchorRef.current.click();
    })

    setData({
      categoryName: "",
      categoryImage: null,
    });
    setImage("");
  };

  const handleNavigate = () =>{
    navigate(-1);
  }

  return (
    <div className="ModalBox">
    <div id="NotificationEdit" className="modal fade" role="dialog" data-backdrop="static">
      {" "}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="Category">
              <a
                ref={AnchorRef}
                href="javascript:void(0);"
                className="CloseModal"
                data-dismiss="modal"
                onClick={handleNavigate}
              >
                ×
              </a>
              <h3>Edit Category</h3>
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                  name="categoryName"
                  value={data.categoryName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Upload Images</label>
                {data?.categoryImage && (
                  <img
                    src={data?.categoryImage}
                    style={{
                      height: "100px",
                      width: "160px",
                      marginBottom: "10px",
                    }}
                    alt="Category Preview"
                  />
                )}
                <div className="UploadBox">
                  <div className="Upload">
                    <i className="fa fa-upload" /> <span>Upload</span>
                    <input
                      type="file"
                      name="categoryImage"
                      accept=".jpg,.png,.jpeg"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              <a
                href="javascript:void(0);"
                className="Button"
                onClick={handleSubmit}
              >
                Save
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default EditCategory;
