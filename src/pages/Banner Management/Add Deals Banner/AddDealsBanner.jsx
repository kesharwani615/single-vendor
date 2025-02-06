import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CreateDealBannerManagementSlice } from "../../../redux/features/BannerManagementSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {onImageHandler} from '../../../components/UploadImageOnBucket'

const AddDealsBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dealBannerRef = useRef();

  const [data, setData] = useState({
    dealbannerTitle: "",
    dealbannerImage: "",
  });

  const handleImage = async (e) => {
    const data = await onImageHandler(e);
    setData((prev) => ({ ...prev, dealbannerImage: data[1]?.location }));
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
    formData.append("dealbannerTitle", data?.dealbannerTitle);
    formData.append("dealbannerImage", data?.dealbannerImage);
    console.log(data);
    dispatch(CreateDealBannerManagementSlice(formData)).then((res) => {
      dealBannerRef.current.click();
    });
  };

  return (
    <>
      <div className="ModalBox">
        <div
          id="DealsBannerAdd"
          className="modal fade"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="Category">
                  <a
                    href="javascript:void(0);"
                    className="CloseModal"
                    data-dismiss="modal"
                    ref={dealBannerRef}
                    onClick={() => navigate(-1)}
                  >
                    ×
                  </a>
                  <h3>Add Banner</h3>
                  <div className="form-group">
                    <label>Deals Banner Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Deals Banner Title"
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          dealbannerTitle: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Upload Deal Banner Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImage}
                    />
                  </div>
                  <button className="Button" onClick={handleSubmit}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      d
    </>
  );
};

export default AddDealsBanner;
