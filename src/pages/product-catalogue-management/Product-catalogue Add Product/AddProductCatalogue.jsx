import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProductCategorySlice,
  GetSubCategoryProductSlice,
} from "../../../redux/features/ProductCategorySlice";
import { CreateProductCatalogueSlice } from "../../../redux/features/ProductCatalogueSlice";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { GetCityManagementSlice } from "../../../redux/features/CityManagementSlice";
import { useNavigate } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";
import { onImageHandler } from "../../../components/UploadImageOnBucket";
import ButtonSpinner from "../../../common/Loader/ButtonSpinner";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const AddProductCatalogue = () => {
  const dispatch = useDispatch();
  const [selectedForProduct, setSelectedForProduct] = useState({});
  const [dataForSendToApi, setdataForSendToApi] = useState({
    productDetails: {
      productcategory: "",
      productsubcategory: "",
      productname: "",
      producttitledescription: "",
      estimatedecorativetime: "",
    },
    priceDetails: {
      price: "",
      gstslab: "",
    },
    productdescription: {
      inclusion: [],
      aboutexperience: "",
      need: "",
      cancellation: "",
    },
    productcustomizeDetails: {
      description: "",
    },
    availableCities: {
      cityName: "",
    },
  });

  const [productImages, setProductImages] = useState([]);
  const [customImages, setCustomImages] = useState([]);
  const [SelectedOptions, setSelectedOptions] = useState();
  const [AllCities, setAllCities] = useState();
  const [CityManagement, setCityManagement] = useState([]);
  const [check, setCheck] = useState([]);

  const [customObj, setCustomeObj] = useState([
    {
      id: Math.round(Math.random() * 10000),
      ProductName: "",
      ProductPrice: "",
      ProductImage: "",
    },
  ]);

  const { loading } = useSelector((state) => state.ProductCatalogue);

  const handleCreareField = () => {
    const len = Math.round(Math.random() * 10000);
    setCustomeObj((prev) => [
      ...prev,
      { id: len, ProductName: "", ProductPrice: "", ProductImage: "" },
    ]);
  };

  const handleCustomObjChange = ({ index, id, e }) => {
    const tempObj = Object.assign({}, customObj);

    tempObj[index][e.target.name] = e.target.value;

    const ArrTemp = Object.entries(tempObj).map(([index, item]) => item);

    // console.log(ArrTemp);
    setCustomeObj(() => ArrTemp);
  };

  const handleCustomObjChangeImage = async ({ index, id, e }) => {
    console.log("e", index, id, e);
    const { name, files } = e.target;

    if (!files || files.length === 0) return;

    const data = await onImageHandler(e); //upload on bucket
    //convert array of object into object of object
    const tempObj = Object.assign({}, customObj);

    tempObj[index][name] = data[1].location;

    const ArrTemp = Object.entries(tempObj).map(([index, item]) => item);

    console.log(ArrTemp);
    setCustomeObj(() => ArrTemp);
  };

  const navigate = useNavigate();

  const [data, setData] = useState({
    categoryList: "",
    subcategoryList: "",
  });

  useEffect(() => {
    dispatch(GetProductCategorySlice()).then((res) => {
      // console.log("dataa:",res.payload.data);
      setData((prev) => ({
        ...prev,
        categoryList: res?.payload?.data?.category,
      }));
    });
    dispatch(GetCityManagementSlice()).then((res) => {
      setCityManagement(res?.payload?.data);
    });
  }, []);

  useEffect(() => {
    if (selectedForProduct["productcategory"]) {
      dispatch(
        GetSubCategoryProductSlice(selectedForProduct["productcategory"])
      ).then((res) => {
        const dummyData = res?.payload?.data?.subcategory;
        // console.log("dummydata:",dummyData);
        setData((prev) => ({ ...prev, subcategoryList: dummyData }));
      });
    }
  }, [selectedForProduct["productcategory"]]);

  const handleChange = (e, parentKey) => {
    const { name, value } = e.target;
    // console.log("name:",name,"value:",value);
    setdataForSendToApi((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [name]: value,
      },
    }));
  };

  const handleCheckBox = (e, parentKey) => {
    const { name, value } = e.target;

    const TempCheck = [...check];
    if (e.target.checked) {
      setCheck((prev) => [...prev, value]);
    } else {
      const tempIndex = TempCheck.findIndex((item) => item === value);
      TempCheck.splice(tempIndex, 1);
      setCheck(TempCheck);
    }

    setdataForSendToApi((prev) => {
      return {
        ...prev,
        ["productdescription"]: {
          // ...prev[parentKey],
          inclusion: [...dataForSendToApi.productdescription.inclusion, value],
        },
      };
    });
  };

  const handleImage = async (e) => {
    const { name, files } = e.target;

    if (files[0] === undefined) return;

    const data = await onImageHandler(e);

    if (name === "productimages") {
      const len = productImages?.length;

      setProductImages((prev) => [...prev, data[1].location]);
    } else {
      const len = customImages?.length;

      setCustomImages((prev) => [...prev, data[1].location]);
    }
  };

  function handleRemove(selectedItem) {
    const filterData = productImages?.filter(
      (value, index) => index !== selectedItem
    );
    setProductImages(filterData);
    // setImageForRender(Object.fromEntries(filterData));
  }
  // const handleRemoveCustomImages = (selectedItem) => {
  //   const filterData = customImages?.filter(
  //     (value, index) => index !== selectedItem
  //   );

  //   setCustomImages(filterData);
  // };

  const options = [
    "Welcome Drinks",
    "Opulent romantic bohemian garden canopy with luxurious cushions, elegant mats, vibrant flowers, candles, and intimate low dining tables",
    "Sumptuous 4 course meal with delectable soups, 2 starters, 2 mains and 2 desserts",
    "Cuisine: North Indian",
    "Location: Senate garden or private terrace",
    "Butler Service",
    "Ambience Music",
    "Alcoholic Beverages",
    "Pickup and drop",
    "Mist fans/ heaters",
  ];

  useEffect(() => {
    const dataForCity = CityManagement?.map((data) => ({
      label: data.cityName,
      value: data.cityName,
    }));
    setAllCities(dataForCity);
  }, [CityManagement]);

  const handleMultiSelectChange = (selected, parentKey) => {
    setdataForSendToApi((prev) => ({
      ...prev,
      [parentKey]: {
        cityName: selected.map((option) => option.value).join(", "),
      },
    }));
    // const temp =  selected.map((option) => option.value).join(', ')
    // console.log("temp:",temp);
    setSelectedOptions(selected);
  };

  const handleRemoveProduct = (selectedItem) => {
    console.log("cust:", customObj);
    const filterdData = customObj?.filter(
      (item, index) => selectedItem !== item?.id
    );
    setCustomeObj(filterdData);
  };

  const handleSubmit = () => {
    console.log("dataForSendToApi:", dataForSendToApi);

    const formData = new FormData();

    if (
      !(
        Object.entries(dataForSendToApi.productDetails)
          .map(([key, item]) => item.length)
          .every((item) => item > 0) &&
        Object.entries(dataForSendToApi.priceDetails)
          .map(([key, item]) => String(item).length)
          .every((item) => item > 0) &&
        Object.entries(dataForSendToApi.productdescription)
          .map(([key, item]) => item.length)
          .every((item) => item > 0) &&
        dataForSendToApi.availableCities.cityName?.length > 0 &&
        Object.entries(productImages)
          .map(([key, item]) => item.length)
          .every((item) => item > 0) &&
        customObj?.length > 0
      )
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    // Add productDetails as a JSON string
    formData.append(
      "productDetails",
      JSON.stringify(dataForSendToApi.productDetails)
    );

    // Add priceDetails as a JSON string
    formData.append(
      "priceDetails",
      JSON.stringify(dataForSendToApi.priceDetails)
    );

    // Add productdescription as a JSON string
    formData.append(
      "productdescription",
      JSON.stringify(dataForSendToApi.productdescription)
    );

    // Add availableCities as an array of city names
    formData.append(
      "availableCities",
      dataForSendToApi.availableCities.cityName
    );

    // Add productImages as files
    Array.from(productImages).forEach((file) => {
      formData.append("productimages", file);
    });

    // Add productcustomizeDetails as JSON
    formData.append(
      "productcustomizeDetails",
      JSON.stringify(
        customObj?.map((custom) => ({
          name: custom.ProductName,
          price: custom.ProductPrice,
          customImages: custom.ProductImage,
        }))
      )
    );

    // // Example dispatch logic (uncomment if required)
    dispatch(CreateProductCatalogueSlice(formData)).then((res) => {
      console.log(res.payload.data);
      if (Object.entries(res.payload.data ?? {})?.length > 0) {
        navigate(-1);
      }
    });
  };

  return (
    <>
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="Small-Wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <div className="TitleBox">
                    <h2>Product Information</h2>
                  </div>
                  <div className="ItineraryArea">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Product Category</label>
                          <select
                            className="form-control"
                            name="productcategory"
                            onChange={(e) => {
                              setSelectedForProduct((prev) => ({
                                ...prev,
                                [e.target.name]:
                                  e.target.options[e.target.selectedIndex]
                                    .dataset.key,
                              }));
                              handleChange(e, "productDetails");
                            }}
                          >
                            <option>--Select</option>
                            {Array.isArray(data?.categoryList) &&
                              data?.categoryList?.length &&
                              data?.categoryList?.map((item, index) => {
                                return (
                                  <option
                                    value={item?.categoryName}
                                    data-key={item?._id}
                                  >
                                    {item?.categoryName}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Product Sub-Category</label>
                          <select
                            className="form-control"
                            name="productsubcategory"
                            onChange={(e) => {
                              handleChange(e, "productDetails");
                            }}
                          >
                            <option>--Select</option>
                            {Array.isArray(data?.subcategoryList) &&
                              data?.subcategoryList?.length &&
                              data?.subcategoryList?.map((item, index) => {
                                return (
                                  <option value={item?.subcategoryName}>
                                    {item?.subcategoryName}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Title/Name of Product</label>
                          <input
                            type="text"
                            className="form-control"
                            name="productname"
                            onChange={(e) => {
                              handleChange(e, "productDetails");
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label>Estimate Decorator Time</label>
                          <input
                            type="text"
                            className="form-control"
                            name="estimatedecorativetime"
                            onChange={(e) => {
                              handleChange(e, "productDetails");
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>City</label>
                          <ReactMultiSelectCheckboxes
                            options={AllCities}
                            value={SelectedOptions}
                            onChange={(e) =>
                              handleMultiSelectChange(e, "availableCities")
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label>Product Title Description</label>
                          <textarea
                            className="form-control"
                            placeholder="write here.."
                            rows={1}
                            defaultValue={""}
                            name="producttitledescription"
                            onChange={(e) => handleChange(e, "productDetails")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Small-Wrapper">
              <div className="TitleBox">
                <h2>Price Details</h2>
              </div>
              <div className="ItineraryArea">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Actual Price</label>
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        onChange={(e) => handleChange(e, "priceDetails")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>GST Slab</label>
                      <select
                        className="form-control"
                        name="gstslab"
                        onChange={(e) => handleChange(e, "priceDetails")}
                      >
                        <option selected="">--select--</option>
                        <option>18%</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Small-Wrapper">
              <div className="TitleBox">
                <h2>Product Description</h2>
              </div>
              <div className="NewCommonTabs">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#Inclusion"
                    >
                      Inclusion
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#AboutTheExperience"
                    >
                      About The Experience
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#NeedToKnow"
                    >
                      Need To Know
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#CancellationPolicy"
                    >
                      Cancellation Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content mb-4">
                <div className="tab-pane fade active show" id="Inclusion">
                  <aside className="file-info-checkbox">
                    <h4
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#000",
                        margin: "10px 0 20px",
                      }}
                    >
                      Inclusion
                    </h4>
                    {options.map((item, index) => {
                      return (
                        <>
                          <div className="form-group1" key={index}>
                            <label className="CheckBox">
                              {item}
                              <input
                                type="checkbox"
                                name="inclusion"
                                value={item}
                                checked={check?.includes(item)}
                                onChange={(e) =>
                                  handleCheckBox(e, "productdescription")
                                }
                              />
                              <span className="checkmark" />
                            </label>
                          </div>
                          <br />
                        </>
                      );
                    })}
                  </aside>
                </div>
                <div className="tab-pane fade" id="AboutTheExperience">
                  <div className="ItineraryArea">
                    <div className="form-group">
                      <label>About The Experience</label>
                      <textarea
                        className="form-control"
                        placeholder="write here..."
                        rows={5}
                        defaultValue={""}
                        name="aboutexperience"
                        onChange={(e) => handleChange(e, "productdescription")}
                      />
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="NeedToKnow">
                  <div className="ItineraryArea">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Need To Know</label>
                          <input
                            type="text"
                            className="form-control"
                            name="need"
                            onChange={(e) =>
                              handleChange(e, "productdescription")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="CancellationPolicy">
                  <div className="ItineraryArea">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Cancellation Policy</label>
                          <input
                            type="text"
                            className="form-control"
                            name="cancellation"
                            onChange={(e) =>
                              handleChange(e, "productdescription")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Small-Wrapper">
              <div className="TitleBox">
                <h2>Product Images</h2>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="ItineraryArea">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Upload Images</label>
                          <div className="UploadBox">
                            <div className="Upload">
                              <i className="fa fa-upload" /> <span>Upload</span>
                              <input
                                type="file"
                                multiple
                                name="productimages"
                                onChange={handleImage}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="ProductImages ProfileBox2">
                          {productImages?.map((value, index) => {
                            // console.log("value:",value)
                            return (
                              <figure>
                                <img
                                  src={value}
                                  style={{
                                    height: "150px",
                                    width: "300px",
                                    objectFit: "cover",
                                  }}
                                  key={index}
                                  alt=""
                                />
                                <i
                                  className="fa fa-times"
                                  aria-hidden="true"
                                  onClick={() => handleRemove(index)}
                                />
                              </figure>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Small-Wrapper">
              <div className="TitleBox">
                <h2>Product Customization Details</h2>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="ItineraryArea">
                    <div className="row">
                      {/* <div className="col-sm-12">
                        <div className="form-group">
                          <label>Product Description Details</label>
                          <textarea
                            className="form-control"
                            placeholder="write here..."
                            rows={6}
                            defaultValue={""}
                            name="description"
                            onChange={(e) =>
                              handleChange(e, "productcustomizeDetails")
                            }
                          />
                        </div>
                      </div> */}
                      <div className="" style={{ paddingLeft: "20px" }}>
                        <>
                          {customObj?.map((item, index) => {
                            return (
                              <div
                                style={{
                                  minWidth: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                  marginBottom: "20px",
                                  border: "1px solid lightgray",
                                  padding: "10px",
                                  borderRadius: "10px",
                                  position: "relative",
                                }}
                              >
                                <a
                                  onClick={() => handleRemoveProduct(item.id)}
                                  href="javascript:void(0);"
                                  className="CloseModal"
                                  data-dismiss="modal"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "absolute",
                                    top: "-15px",
                                    right: "-10px",
                                    height: "20px",
                                    width: "20px",
                                    borderRadius: "100%",
                                    backgroundColor: "lightgray",
                                  }}
                                >
                                  <IoMdClose
                                    color="black"
                                    style={{ margin: "0 auto" }}
                                  />
                                </a>
                                <div
                                  key={index}
                                  style={{ display: "flex", gap: "10px" }}
                                >
                                  <div>
                                    <p
                                      style={{
                                        textTransform: "capitalize",
                                        color: "#000",
                                        fontSize: "14px",
                                        fontWeight: "700",
                                      }}
                                    >
                                      Product Name
                                    </p>
                                    <input
                                      type="text"
                                      class="form-control"
                                      value={item["ProductName"]}
                                      name="ProductName"
                                      onChange={(e) =>
                                        handleCustomObjChange({
                                          index,
                                          id: item?.id,
                                          e,
                                        })
                                      }
                                    />
                                  </div>
                                  <div>
                                    <p
                                      style={{
                                        textTransform: "capitalize",
                                        color: "#000",
                                        fontSize: "14px",
                                        fontWeight: "700",
                                      }}
                                    >
                                      Product Price
                                    </p>
                                    <input
                                      type="text"
                                      class="form-control"
                                      value={item["ProductPrice"]}
                                      name="ProductPrice"
                                      onChange={(e) =>
                                        handleCustomObjChange({
                                          index,
                                          id: item?.id,
                                          e,
                                        })
                                      }
                                    />
                                  </div>
                                  <div>
                                    <p
                                      style={{
                                        textTransform: "capitalize",
                                        color: "#000",
                                        fontSize: "14px",
                                        fontWeight: "700",
                                      }}
                                    >
                                      Product Image
                                    </p>
                                    <div
                                      style={{
                                        position: "relative",
                                        width: "100px",
                                        height: "60px",
                                        border: "2px dotted grey",
                                        backgroundColor: "#6e60601c",
                                      }}
                                    >
                                      {item["ProductImage"]?.length > 0 ? (
                                        <div>
                                          <img
                                            src={item["ProductImage"]}
                                            style={{
                                              height: "60px",
                                              width: "100px",
                                            }}
                                            alt=""
                                            srcset=""
                                          />
                                          <div
                                            style={{
                                              height: "20px",
                                              cursor: "pointer",
                                              width: "20px",
                                              position: "relative",
                                              left: "85%",
                                              bottom: "60px",
                                            }}
                                          >
                                            <input
                                              type="file"
                                              style={{
                                                height: "100%",
                                                width: "100%",
                                                opacity: "0",
                                                zIndex: "100",
                                                position: "absolute",
                                              }}
                                              name="ProductImage"
                                              onChange={(e) =>
                                                handleCustomObjChangeImage({
                                                  index,
                                                  id: item?.id,
                                                  e,
                                                })
                                              }
                                            />
                                            <TbEditCircle
                                              style={{
                                                fontSize: "15px",
                                                color: "black",
                                                position: "absolute",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      ) : (
                                        <>
                                          <input
                                            type="file"
                                            class="form-control"
                                            accept=".png,.jpg,.jpeg"
                                            style={{
                                              width: "100%",
                                              cursor: "pointer",
                                              zIndex: "100",
                                              height: "100%",
                                              opacity: "0",
                                              position: "absolute",
                                            }}
                                            name="ProductImage"
                                            onChange={(e) =>
                                              handleCustomObjChangeImage({
                                                index,
                                                id: item?.id,
                                                e,
                                              })
                                            }
                                          />
                                          <FaCloudDownloadAlt
                                            style={{
                                              fontSize: "40px",
                                              position: "absolute",
                                              left: "30%",
                                              top: "10%",
                                            }}
                                          />
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                        <button
                          type="button"
                          onClick={handleCreareField}
                          style={{
                            width: "100%",
                            border: "none",
                            margin: "10px 0",
                            color: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            backgroundImage:
                              "linear-gradient(45deg, #af1ff3, #bf4ef4",
                          }}
                        >
                          Add Customize product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="Button"
            >
              {loading ? <ButtonSpinner /> : "Add"}
            </button>
          </div>
        </div>
        {/* <div className="ModalBox">
          <div id="EditPurchase" className="modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Category">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Edit Details</h3>
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Contact No.</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" className="form-control" />
                    </div>
                    <button disabled={loading} className="Button">
                      {true ? <ButtonSpinner /> : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </>
    </>
  );
};

export default AddProductCatalogue;
