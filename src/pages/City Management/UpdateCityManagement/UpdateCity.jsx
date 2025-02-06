import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import {
  AddCityManagementSlice,
  UpdateCityManagementSlice,
} from "../../../redux/features/CityManagementSlice";
import { onImageHandler } from "../../../components/UploadImageOnBucket";
import { toast } from "react-toastify";
import ButtonSpinner from "../../../common/Loader/ButtonSpinner";

const UpdateCity = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const CityRef = useRef(null);
  const {loading} = useSelector((state)=>state.CityManagement)
  const [dataForSend, setDataForSend] = useState({
    cityPincode: "",
    cityName: "",
    cityImage: null,
  });

  useEffect(() => {
    setDataForSend((prev) => ({
      cityPincode: state?.pincode,
      cityName: state?.cityName,
      cityImage: state?.cityImage,
    }));

    // setImageForRender(state?.cityImage);
  }, [state]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForSend((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = async(e) => {
    const { name, files } = e.target;
    const data = await onImageHandler(e);
    // setImageForRender(data[1].location);
    setDataForSend((prev) => ({
      ...prev,
      "cityImage":data[1].location, // Add file object to dataForSend
    }));
  };

  const handleSubmit = () => {
    // Create FormData object
    if (
      !Object.entries(dataForSend)
        .map(([key, value]) =>
          typeof value === "string" ? value.trim().length : value !== null && value !== undefined
        )
        .every((item) => item)
    ) {
      toast.error("Please fill the details!");
      return;
    }
    

    const formData = new FormData();
    formData.append("pincode", dataForSend.cityPincode);
    formData.append("cityname", dataForSend.cityName);
    formData.append("cityImage", dataForSend.cityImage);

    dispatch(UpdateCityManagementSlice({ id: state?._id, formData })).then(
      (res) => {
      // console.log("res:", res);
      CityRef.current.click();
      }
    );
  };

  return (
    <>
      <div className="ModalBox">
        <div
          id="UpdateCity"
          className="modal fade"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="Category">
                  <a
                    href="javascript:void(0);"
                    className="CloseModal"
                    data-dismiss="modal"
                    ref={CityRef}
                    onClick={() => navigate(-1)}
                  >
                    ×
                  </a>
                  <h3>Edit City</h3>
                  <div className="form-group">
                    <label>City Name</label>
                    <input
                      type="text"
                      name="cityName"
                      className="form-control"
                      placeholder="Enter City Name"
                      value={dataForSend?.cityName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>City Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the Pin no."
                      value={dataForSend.cityPincode}
                      name="cityPincode"
                      onChange={handleChange}
                    />
                  </div>
                  {dataForSend?.cityImage && (
                    <img
                      src={dataForSend?.cityImage} 
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                  <div className="form-group">
                    <label>Upload Images</label>
                    <div className="UploadBox">
                      <div className="Upload">
                        <i className="fa fa-upload" /> <span>Upload</span>
                        <input
                          type="file"
                          name="cityImage"
                          onChange={handleImage}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="Button"
                  >
                    {loading ? <ButtonSpinner/>: 'Add'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCity;