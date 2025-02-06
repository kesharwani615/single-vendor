import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditBannerSlice } from "../../../redux/features/BannerManagementSlice";
import { Link, useNavigate } from "react-router-dom";
import { onImageHandler } from "../../../components/UploadImageOnBucket";
import { toast } from "react-toastify";

const EditBanners = () => {
  const { EditBannerId } = useSelector((state) => state.bannerManagement);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const EditBannerRef = useRef();

  const [data, setData] = useState({
    bannerTitle: "",
    bannerImage: "",
    bannerDescription: "",
  });

  // const [ImageToshow, setImageToshow] = useState("");

  useEffect(
    () =>
      setData({
        bannerTitle: EditBannerId?.title,
        bannerImage: EditBannerId?.image,
        bannerDescription: EditBannerId?.bannerDescription,
      }),
    [EditBannerId]
  );

  const handleImage = async (e) => {
    // const imageUrl = URL.createObjectURL(e.target.files[0]);
    // setImageToshow(imageUrl)
    const data = await onImageHandler(e);

    setData((prev) => ({ ...prev, bannerImage: data[1].location }));
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
    formData.append("bannerTitle", data?.bannerTitle);
    formData.append("bannerImage", data?.bannerImage);
    formData.append("bannerDescription", data?.bannerDescription);

    dispatch(EditBannerSlice({ id: EditBannerId.id, formData })).then((res) => {
      EditBannerRef.current.click();
    });
  };

  return (
    <>
      <div className="ModalBox">
        <div
          id="BannerEditModal"
          className="modal fade"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="Category">
                  <Link
                    href="javascript:void(0);"
                    className="CloseModal"
                    data-dismiss="modal"
                    ref={EditBannerRef}
                    onClick={() => navigate(-1)}
                  >
                    ×
                  </Link>
                  <h3>Edit Banner</h3>
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
                  <div class="form-group">
                    <label>Description</label>
                    <textarea
                      rows="5"
                      class="form-control"
                      name="bannerDescription"
                      placeholder="Enter Description"
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
                    <img
                      src={`${data?.bannerImage}`}
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

export default EditBanners;
