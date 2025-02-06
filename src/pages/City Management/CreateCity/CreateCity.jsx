import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { AddCityManagementSlice } from "../../../redux/features/CityManagementSlice";
import { toast } from "react-toastify";
import ButtonSpinnera from "../../../common/Loader/ButtonSpinner";

const CreateCity = () => {
  const navigate = useNavigate();

  const { CityManagement, loading } = useSelector(
    (state) => state.CityManagement
  );

  const [imageForRender, setImageForRender] = useState("");
  const [dataForSend, setDataForSend] = useState({
    cityPincode: "",
    cityName: "",
    cityImage: null,
  });

  const dispatch = useDispatch();
  const CityRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForSend((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const { name, files } = e.target;
    setImageForRender(URL.createObjectURL(files[0]));
    setDataForSend((prev) => ({
      ...prev,
      [name]: files[0], // Add file object to dataForSend
    }));
  };

  const handleSubmit = () => {
    // Create FormData object

    if (
      !Object.entries(dataForSend)
        .map(([key, value]) =>
          typeof value === "string"
            ? value.trim().length
            : value !== null && value !== undefined
        )
        .every((item) => item)
    ) {
      toast.error("Please fill the details!");
      return;
    }

    const formData = new FormData();
    formData.append("pincode", dataForSend.cityPincode);
    formData.append("cityName", dataForSend.cityName);

    if (dataForSend.cityImage) {
      formData.append("cityImage", dataForSend.cityImage);
    }

    dispatch(AddCityManagementSlice(formData)).then((res) => {
      console.log("res:", res);
      CityRef?.current?.click();
    });
  };

  return (
    <>
      <div className="ModalBox">
        <div
          id="AddCategory"
          className="modal fade"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="Category">
                  <a
                    onClick={() => navigate("/CityManagement")}
                    href="javascript:void(0);"
                    className="CloseModal"
                    data-dismiss="modal"
                    ref={CityRef}
                  >
                    ×
                  </a>
                  <h3>Create City</h3>
                  <div className="form-group">
                    <label>City Name</label>
                    <input
                      type="text"
                      name="cityName"
                      className="form-control"
                      placeholder="Enter City Name"
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
                  {imageForRender && (
                    <img
                      src={imageForRender}
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
                    {loading ? <ButtonSpinnera /> : "Add"}
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

export default CreateCity;
