import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateSubCategoryProductSlice,
  GetProductCategorySlice,
} from "../../../../redux/features/ProductCategorySlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { onImageHandler } from "../../../../components/UploadImageOnBucket";
import ButtonSpinnerr from '../../../../common/Loader/ButtonSpinner'
import { toast } from "react-toastify";
const AddSubCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading} = useSelector((state)=>state.ProductCategory)

  const [data, setData] = useState({
    catId: "",
    subcategoryName: "",
    subcategoryImage: null,
  });

  const [image, setImage] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const AnchorRef = useRef(null);

  useEffect(() => {
    dispatch(GetProductCategorySlice()).then((res) => {
      setCategoryList(res?.payload?.data?.category || []);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;

    const data = await onImageHandler(e);

    setImage(data[1].location);
    setData((prevState) => ({
      ...prevState,
      [name]: data[1].location,
    }));
  };

  const handleSubmit = async () => {
    console.log("Sub-category data:", data);
    
        if (
          !Object.entries(data)
            .map(([key, value]) => value?.trim()?.trim()?.length) 
            .every((item) => item > 0)
        ) {
          toast.error("Please fill the details!");
          return;
        }

    const formData = new FormData();
    formData.append("catId", data.catId);
    formData.append("subcategoryName", data.subcategoryName);
    formData.append("subcategoryImage", data.subcategoryImage);

    dispatch(CreateSubCategoryProductSlice(formData)).then((res)=>{
      setData({
        catId: "",
        subcategoryName: "",
        subcategoryImage: null,
      })
      AnchorRef.current.click();
    })

    setData({
      catId: "",
      subCategoryName: "",
      subCategoryImage: null,
    });
    setImage("");
  };

  const handleNavigate = (e) => {
    e.stopPropagation();
    navigate(-1);
  };

  return (
    <div className="ModalBox">
        <div id="NotificationAdd" className="modal fade" aria-hidden="true" data-backdrop="static">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="Category">
                  <a
                    ref={AnchorRef}
                    href="javascript:void(0);"
                    className="CloseModal"
                    data-dismiss="modal"
                    onClick={(e)=>handleNavigate(e)}
                  >
                    ×
                  </a>
                  <h3>Add Sub-category</h3>
                  <div className="form-group">
                    <label>Select Product Category</label>
                    <select
                      className="form-control"
                      name="catId"
                      value={data.catId}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {categoryList &&
                        categoryList.length > 0 &&
                        categoryList.map((item, index) => (
                          <option key={index} value={item?._id}>
                            {item.categoryName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Sub-category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter sub-category name"
                      name="subcategoryName"
                      value={data.subCategoryName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Upload Images</label>
                    {image && (
                      <img
                        src={image}
                        style={{
                          height: "100px",
                          width: "160px",
                          marginBottom: "10px",
                        }}
                        alt="Sub-category"
                      />
                    )}
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload</span>
                        <input
                          type="file"
                          name="subcategoryImage"
                          accept=".jpg,.png,.jpeg"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={loading}
                    className="Button"
                    onClick={handleSubmit}
                  >
                    {loading ? <ButtonSpinnerr/>: 'Add'}
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
export default AddSubCategory;
