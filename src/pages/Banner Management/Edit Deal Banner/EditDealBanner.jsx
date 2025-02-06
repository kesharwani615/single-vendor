import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditDealBannerSlice } from "../../../redux/features/BannerManagementSlice";
import { onImageHandler } from "../../../components/UploadImageOnBucket";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditDealBanner = () => {
  const { EditDealBannerId } = useSelector((state) => state.bannerManagement);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const EditDealBannerRef = useRef();

  const [data, setData] = useState({
    dealbannerTitle: "",
    dealbannerImage: "",
  });

  useEffect(
    () =>
      setData({
        dealbannerTitle: EditDealBannerId?.title,
        dealbannerImage: EditDealBannerId?.image,
      }),
    [EditDealBannerId]
  );

  // useEffect(() => setImageToshow(EditDealBannerId?.image), [EditDealBannerId]);

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

    dispatch(EditDealBannerSlice({ id: EditDealBannerId.id, formData })).then(
      (res) => {
        EditDealBannerRef.current.click();
        navigate(-1);
      }
    );
  };

  return (
    <>
      <div className="ModalBox">
        <div
          id="DealsBannerEdit"
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
                    ref={EditDealBannerRef}
                    className="CloseModal"
                    data-dismiss="modal"
                  >
                    ×
                  </a>
                  <h3>Edit Banner</h3>
                  <div className="form-group">
                    <label>Deals Banner Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="auto-fill"
                      value={data.dealbannerTitle}
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
                    <img
                      src={`${data?.dealbannerImage}`}
                      style={{ height: "80px", width: "100px" }}
                    />
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImage}
                    />
                  </div>
                  <button
                    className="Button"
                    onClick={handleSubmit}
                    // data-dismiss="modal"
                  >
                    Update
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

export default EditDealBanner;
