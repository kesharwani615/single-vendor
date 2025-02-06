import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { GetProductOnIdBasisSlice } from '../../../redux/features/ProductCatalogueSlice';
import { IoLocation } from "react-icons/io5";

const ProductCatalogueDetails = () => {

  const {state} = useLocation();
  const {id} = useParams();
  console.log("id:",id);
  const [productDetails,setProductDetails] = useState([])

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(GetProductOnIdBasisSlice(state)).then((res)=>{
      console.log("res:",res?.payload?.data);
      setProductDetails(res.payload?.data);

    })
  },[state])

  
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
    "Mist fans/ heaters"
  ];

  return (
    <>
     <div className="WrapperArea">
  <div className="WrapperBox">
    <div className="Small-Wrapper">
      <div className="TitleBox">
        <h2>Product Details</h2>
        <div>
          {/* <a class="Blue m-2" href="catalouge-view-language.html">
                      <i class="fa fa-eye"></i>
                  </a> */}
          {/* <a className="Green m-2" href="catalogue-edit-product.html">
            <i className="fa fa-pencil" />
          </a> */}
        </div>
      </div>
      <div className="portfolio flex-column">
        <div className="ProfileBox w-100">
          <figcaption>
            <p>
              <label>Product Id</label> <span>{productDetails?.productid}</span>
            </p>
            <p>
              <label>Title/Name of Product</label>{" "}
              <span>{productDetails?.productDetails?.productname}</span>
            </p>
            <p>
              <label>Product Category</label> <span>{productDetails?.productDetails?.productcategory}</span>
            </p>
            <p>
              <label>Product Sub-Category</label>{" "}
              <span>{productDetails?.productDetails?.productsubcategory}</span>
            </p>
            <p>
              <label>Specification</label> <span>lorem</span>
            </p>
            <p>
              <label>Product title Description</label>{" "}
              <span>
               {productDetails?.productDetails?.producttitledescription}
              </span>
            </p>
            <p>
              <label>Added On</label> <span>{productDetails?.createdAt?.substring(0,10)}</span>
            </p>
            <p>
              <label>Total Completed Orders</label> <span>50</span>
            </p>
            <p>
              <label>Total Earnings</label> <span>Rs. 10000</span>
            </p>
            <p>
              <label>Estimated Decorator Time</label> <span>{productDetails?.productDetails?.estimatedecorativetime}</span>
            </p>
            <br />
            {/* <aside class="file-info-checkbox">
                          <div class="form-group1">
                              <label class="CheckBox">New Arrival
                                  <input type="checkbox" disabled>
                                  <span class="checkmark"></span>
                              </label>
                          </div>
                          <br>
                          <div class="form-group1">
                              <label class="CheckBox">Popular product
                                  <input type="checkbox" disabled>
                                  <span class="checkmark"></span>
                              </label>
                          </div>
                          <br>
                          <div class="form-group1">
                              <label class="CheckBox">Latest Offer
                                  <input type="checkbox" disabled>
                                  <span class="checkmark"></span>
                              </label>
                          </div>
                      </aside> */}
          </figcaption>
        </div>
        <div className="TitleBox">
          <h2>Price Details</h2>
        </div>
        <div className="ProfileBox w-100">
          <figcaption>
            <p>
              <label>Actual Price</label> <span>Rs {productDetails?.priceDetails?.price}</span>
            </p>
            <p>
              <label>GST Slab</label> <span>{productDetails?.priceDetails?.gstslab}</span>
            </p>
          </figcaption>
        </div>
        <div className="TitleBox">
          <h2>Product Descriptiona</h2>
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
              <a className="nav-link" data-toggle="tab" href="#NeedToKnow">
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
                  margin: "10px 0 20px"
                }}
              >
                Inclusion
              </h4>
              {options.map((item,index)=>{
                return(
                  <>
                <div className="form-group1" key={index}>
                <label className="CheckBox">
                  {item}
                  <input type="checkbox" name='inclusion' value={item}  checked={productDetails?.productdescription?.inclusion?.find((data)=>data===item)}/>
                  <span className="checkmark" />
                </label>
              </div>
              <br />
              </>
            )
            })
              }
            </aside>
          </div>
          <div className="tab-pane fade" id="AboutTheExperience">
            <div className="ProfileBox ProfileBox1 w-100">
              <div className="description">
                <h2>About The Experience</h2>
                <p>
                 {productDetails?.productdescription?.aboutexperience}
                </p>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="NeedToKnow">
            <div className="NeedToKnow">
              <h2>Need To Know</h2>
              <p>
              {productDetails?.productdescription?.need}
              </p>
            </div>
          </div>
          <div className="tab-pane fade" id="CancellationPolicy">
            <div className="CancellationPolicy">
              <h2>Cancellation Policy</h2>
              <p>
              {productDetails?.productdescription?.cancellation}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="TitleBox">
        <h2>Product Images</h2>
      </div>
      <div className="ProductImages ProfileBox2">
      {productDetails?.productimages?.map((item)=>{
        return(
        <figure>
          <img src={item} alt="" />
        </figure>)
        })}
      </div>
      <div className="TitleBox">
        <h2>Product Customization Details</h2>
      </div>
      <div className="ProfileBox w-100">
        <div className="description">
          <p>
           {productDetails?.productcustomizeDetails?.description}
          </p>
        </div>
        {/* <div className="TitleBox">
          <h2>Images</h2>
        </div> */}
        <div className="ProductImages ProfileBox2" style={{display:'flex',flexDirection:'column'}}>
        {productDetails?.productcustomizeDetails?.map(
                                    (item,key) => {
                                      // console.log("item:", item);
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
                                          {/* <a
                                            onClick={() => handleRemoveProduct(item.id)}
                                            href="javascript:void(0);"
                                            className="CloseModal"
                                            data-dismiss="modal"
                                            style={{
                                              display: "flex",
                                              flexDirection:'column',
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
                                          </a> */}
                                          <div
                                            key={key}
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
                                                disabled={true}
                                                value={item["name"]}
                                                name="name"
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
                                                disabled={true}
                                                value={item["price"]}
                                                name="ProductPrice"
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
                                                  <div>
                                                    <img
                                                      src={item["customimages"]}
                                                      style={{
                                                        height: "60px",
                                                        width: "100px",
                                                      }}
                                                      alt="Loading from Bucket"
                                                      srcset=""
                                                    />
                                                  </div>
                                               
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
        </div>
      </div>
      <div className="TitleBox">
        <h2>Available Cities</h2>
      </div>
      <div className="ProfileBox w-100" style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
        {productDetails?.availableCities?.[0].split(', ')?.map((item,index)=>{
        return(
        <div key={index} style={{display:'flex',alignItems:'center'}}>
       <IoLocation fontSize={'25px'}/><p style={{textTransform:'capitalize',fontSize:'20px'}}>{item}</p>
       </div>
       )
      })
        }
      </div>
    </div>
  </div>
</div>
 
    </>
  )
}

export default ProductCatalogueDetails
