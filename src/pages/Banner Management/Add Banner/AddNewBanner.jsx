import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CreateBannerManagementSlice } from "../../../redux/features/BannerManagementSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { onImageHandler } from "../../../components/UploadImageOnBucket";

const AddNewBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bannerRef = useRef(null);

  const [data, setData] = useState({
    bannerTitle: "",
    bannerImage: "",
    bannerDescription:""
  });

  const handleImage = async (e) => {
    const data = await onImageHandler(e);
    setData((prev) => ({ ...prev, bannerImage: data[1]?.location }));
  };

  useEffect(() => {
    return () => {
      setData({
        bannerTitle: "",
        bannerImage: "",
      });
    };
  }, []);

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
    formData.append("bannerTitle", data?.bannerTitle);
    formData.append("bannerImage", data?.bannerImage);
    formData.append("bannerDescription", data?.bannerDescription);
    dispatch(CreateBannerManagementSlice(formData)).then((res) => {
      bannerRef.current.click();
   });
  };

  return (
    <div className="ModalBox">
      <div
        id="BannersAddModal"
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
                  ref={bannerRef}
                  onClick={() => navigate(-1)}
                >
                  ×
                </a>
                <h3>Add Banner</h3>
                <div className="form-group">
                  <label>Banner Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Banner Title"
                    value={data.bannerTitle}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        bannerTitle: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* <div class="form-group">
                          <label>Banner Type</label>
                          <select class="form-control">
                              <option>--Select--</option>
                              <option>Hero Banner</option>
                              <option>Product Banner</option>
                              <option>New Arrival Banner</option>
                              <option>Combo Banner</option>
                          </select>
                      </div> */}

                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    rows="5"
                    class="form-control"
                    name="bannerDescription"
                    placeholder="Enter Notification Content"
                    value={data.bannerDescription}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        bannerDescription: e.target.value,
                      }))
                    }
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImage}
                  />
                </div>
                {/* <div class="form-group">
                          <label>Category Type</label>
                          <select class="form-control">
                              <option>--Select--</option>
                              <option>Makeup</option>
                              <option>Spa</option>
                              <option>Perfume</option>
                              <option>Haircare</option>
                              <option>Mens</option>
                              <option>Skincare</option>
                          </select>
                      </div>

                      <div class="form-group">
                          <label>URL</label>
                          <input type="text" class="form-control">
                      </div> */}
                <button className="Button" onClick={handleSubmit}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBanner;
