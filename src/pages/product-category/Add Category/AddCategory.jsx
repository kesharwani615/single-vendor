import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateCategoryProductSlice } from '../../../redux/features/ProductCategorySlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {onImageHandler} from '../../../components/UploadImageOnBucket'

const AddCategory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const AnchorRef = useRef(null);

    const [data, setdata] = useState({
    categoryName: '',
    // categoryDescription: '',
    categoryImage: null,
  });

  const [image,setImage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    // setImage(URL.createObjectURL(files[0]))
    const data = await onImageHandler(e);
    // need to add after api changess
    setdata((prevState) => ({
      ...prevState,
      [name]: data[1]?.location,
    }));
  };

  const handleSubmit = () => {
    if (!Object.entries(data).map(([key,value])=>value?.trim()?.length).every(item=>item > 0)) {
    toast.error('Please fill the details!')
    return;
    }

    const formData = new FormData();
    formData.append("categoryName",data.categoryName)
    formData.append("categoryImage",data.categoryImage)



    dispatch(CreateCategoryProductSlice(formData)).then((res)=>{
        console.log("Res:",res);
        setdata({
          categoryName: '',
          // categoryDescription: '',
          categoryImage: null,
        })
        AnchorRef.current.click();
      })
  };

  const handleNavigate = () =>{
    navigate(-1);
  }

  return (
    <div className="ModalBox">
    <div id="AddCategory" className="modal fade" data-backdrop="static" aria-hidden="true">
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
              <h3>Create New Category</h3>
              <div className="form-group">
                <label>Product Category Name</label>
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
                    {data?.categoryImage?.length > 0 &&
                    <img src={data?.categoryImage} style={{height:'100px',width:'160px',marginBottom:'10px'}} alt="" />
                    }
                <div className="UploadBox">
                  <div className="Upload">
                    <i className="fa fa-upload"/> <span>Upload</span>
                    <input
                      type="file"
                      name="categoryImage"
                      accept='.jpg,.png,.jpeg'
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="form-group">
                <label>Product Category Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category description"
                  name="categoryDescription"
                  value={data.categoryDescription}
                  onChange={handleChange}
                />
              </div> */} 
              <a
                href="javascript:void(0);"
                className="Button"
                onClick={handleSubmit}
              >
                Add
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddCategory;
