import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { EditSubCategoryProductSlice } from '../../../../redux/features/ProductCategorySlice';
import { onImageHandler } from '../../../../components/UploadImageOnBucket';
import { toast } from 'react-toastify';

const EditSubCategory = ({ EditItem }) => {
  const dispatch = useDispatch();
  const EditSubCatRef = useRef()

  const [data, setData] = useState({
    subCategoryName: '',
    subCategoryImage: null,
  });

  const [image, setImage] = useState('');

  // Preload data when `EditItem` changes
  useMemo(() => {
    if (EditItem) {
      setData({
        subCategoryName: EditItem.subcategoryName,
        subCategoryImage: EditItem.subcategoryImage,
      });
      setImage(EditItem.subcategoryImage);
    }
  }, [EditItem]);

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

  const handleSubmit = () => {
    console.log('Edited sub-category data:', data);

        if (
          !Object.entries(data)
            .map(([key, value]) => value?.trim()?.trim()?.length) 
            .every((item) => item > 0)
        ) {
          toast.error("Please fill the details!");
          return;
        }


    const formData = new FormData();
    formData.append('subcategoryName', data.subCategoryName);
    formData.append('subcategoryImage', data.subCategoryImage);

    console.log("data:",data)
    // Dispatch the updated sub-category data
    dispatch(EditSubCategoryProductSlice({ id: EditItem._id, formData })).then((res)=>{
      // console.log("Edited:",res)a
      EditSubCatRef.current.click();
    })

    // Reset state after submission
    // setData({
    //   subCategoryName: '',
    //   subCategoryImage: null,
    // });
    // setImage('');
  };

  return (
    <>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="Category">
              <a
                href="javascript:void(0);"
                className="CloseModal"
                data-dismiss="modal"
                ref={EditSubCatRef}
              >
                ×
              </a>
              <h3>Edit Sub-category</h3>
              <div className="form-group">
                <label>Sub-category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter sub-category name"
                  name="subCategoryName"
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
                      height: '100px',
                      width: '160px',
                      marginBottom: '10px',
                    }}
                    alt="Sub-category Preview"
                  />
                )}
                <div className="UploadBox">
                  <div className="Upload">
                    <i className="fa fa-upload" /> <span>Upload</span>
                    <input
                      type="file"
                      name="subCategoryImage"
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
                Update
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSubCategory;
