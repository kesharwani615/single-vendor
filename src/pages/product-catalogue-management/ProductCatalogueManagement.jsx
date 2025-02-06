import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  DeleteProductSlice,
  GetProductCatalogueSlice,
} from "../../redux/features/ProductCatalogueSlice";
import { Loader } from "../../common/Loader/Loader";
import useParamsFormat from "../../common/Params Values format/ParamsFormat";
import { toast } from "react-toastify";


const ProductCatalogueManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {createDataSetParams} = useParamsFormat()

  const {page:pageNo} = useParams();

  const [productCatalogue, setProductCatalogue] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [handleArrforPage, setHandleArrforPage] = useState(1);
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(Number(pageNo));
  const [getSearch, setGetSearch] = useState({
    search: "",
    fromDate: "",
    toDate: "",
    page: pageNo,
  });
  const [dataforDel, setDataForDel] = useState();

  const { loading } = useSelector((state) => state.ProductCatalogue);

  useEffect(() => {
  
    dispatch(GetProductCatalogueSlice(createDataSetParams(getSearch))).then((res) => {
      setProductCatalogue(res?.payload?.data?.product);
      setPagination(res?.payload?.data?.meta);
    });
  }, []);

  useEffect(() => {
    if (Object.entries(pagination ?? {}).length > 0) {
      setArr(
        [...Array(pagination?.totalPages + 1).keys()]
          .slice(1)
          .slice(handleArrforPage - 1, handleArrforPage + 3)
      );
    }
  }, [pagination, handleArrforPage]);

  const handlePagesIncrease = () => {
    console.log("handleIncrease:", handleArrforPage);
    if (handleArrforPage + 3 <= pagination?.totalPages) {
      setHandleArrforPage((prev) => prev + 3);
    }
  };

  const handlePagesDecrease = () => {
    if (handleArrforPage > 2) {
      setHandleArrforPage((prev) => prev - 3);
    }
  };

  const FetchDataOnPages = (pageNum) => {
   navigate(`/ProductCatalogueManagement/${pageNum}`)
  };



  useEffect(()=>{
   setPage(pageNo);
    console.log(pageNo)
    setGetSearch((prev) => ({ ...prev, page: pageNo }));

    dispatch(GetProductCatalogueSlice(createDataSetParams({...getSearch, page: pageNo }))).then((res) => {
      setProductCatalogue(res?.payload?.data?.product);
      setPagination(res?.payload?.data?.meta);
    });
  },[pageNo])

  const handleDeleteProudct = () => {
    dispatch(DeleteProductSlice(dataforDel)).then((res) => {
      dispatch(GetProductCatalogueSlice(createDataSetParams(getSearch))).then((res) => {
        setProductCatalogue(res?.payload?.data?.product);
        setPagination(res?.payload?.data?.meta);
      });
    });
  };

  const HandleSearch = () => {
    //search=hello&fromDate=2024-12-05&toDate=2024-12-19&
    // check get search should be empty
    if (Object.entries(getSearch).map(([key,value])=>value.length).some(item=>item > 0)) {
      // checking date validation
      if(![getSearch.fromDate.length,getSearch.toDate.length].every((item)=>item === 0)){
         if(![getSearch.fromDate.length,getSearch.toDate.length].every((item)=>item > 0)){
          toast.error('Please select from date and select date both!')
          return;
         }
      } 
    

      dispatch(GetProductCatalogueSlice(createDataSetParams(getSearch))).then((res) => {
        setProductCatalogue(res?.payload?.data?.product);
        setPagination(res?.payload?.data?.meta);
      });
    }
  };

  const HandleReset = () =>{
    if (Object.entries(getSearch).map(([key,value])=>value.length).some(item=>item > 0)) {
      setGetSearch({
      search: "",
      fromDate: "",
      toDate: "",
      page: 1,
    })

    dispatch(GetProductCatalogueSlice()).then((res) => { 
      setProductCatalogue(res?.payload?.data?.product);
      setPagination(res?.payload?.data?.meta);
    });}

  }

  return (
    <>
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h2>List of Product Catalogue</h2> 
              <div>
                {/* <a href="product-catalogue-bulk.html" class="Button">Add Bulk Product</a> */}
                <Link
                  to={`AddProductCatalogue`}
                  className="Button"
                >
                  Add New Product
                </Link>
              </div>
            </div>
            <div className="Small-Wrapper">
              <div className="Filter justify-content-between">
                <div className="FilterLeft">
                  <div className="form-group">
                    <label>Search</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      name="search"
                      value={getSearch.search}
                      onChange={(e) =>
                        setGetSearch((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>From Date</label>
                    <input
                      type="date"
                      name="fromDate"
                      className="form-control"
                      value={getSearch.fromDate}
                      onChange={(e) =>
                        setGetSearch((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>To Date</label>
                    <input
                      type="date"
                      name="toDate"
                      value={getSearch.toDate}
                      className="form-control"
                      onChange={(e) =>
                        setGetSearch((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>&nbsp;</label>
                    <button className="Button" style={{marginRight:'10px'}} onClick={HandleSearch}>
                      Apply
                    </button>
                    <button
                      className="Button Cancel"
                      onClick={HandleReset}
                    >
                      <i className="fa fa-refresh" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="TableList">
              <table style={{ width: "160%" }}>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Product Category</th>
                    {/* <th>Product Sub Category</th> */}
                    <th>Product Price(Rs.)</th>
                    <th>Added on</th>
                    {/* <th>Total No Of Competed Order(Qty)</th>
                    <th>Total Sales(Rs.)</th>
                    <th>Overall Rating</th> */}
                    {/* <th>Inventory Status</th> */}
                    <th>View Details</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading ? (
                    Array.isArray(productCatalogue) &&
                    productCatalogue?.length ? (
                      productCatalogue?.map((item, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item?.productid}</td>
                            <td>{item?.productDetails?.productname}</td>
                            <td>{item?.productDetails?.productcategory}</td>
                            <td>{item?.priceDetails?.price}</td>
                            {/* <td>100</td> */}
                            <td>{item?.createdAt.substring(0, 10)}</td>
                            {/* <td>11 abc, abc</td>
                            <td>2000</td>
                            <td>4</td> */}
                            {/* <td><span class="Green">Available</span></td> */} 
                            <td>
                              <div className="Actions">
                                <Link
                                  className="Blue"
                                  state={item._id}
                                  to={`ProductCatalogueDetails/${item?._id}`}
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                              </div>
                            </td>
                            <td>
                              <div className="Actions">
                                <Link
                                  className="Green"
                                  data-toggle="modal"
                                  to={`ProductCatalogueEdit/${item?._id}`}
                                >
                                  <i className="fa fa-pencil" />
                                </Link>
                                <a
                                  className="Red"
                                  data-toggle="modal"
                                  data-target="#DeleteModal"
                                  onClick={() => setDataForDel(item?._id)}
                                >
                                  <i className="fa fa-trash" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={9}>There is no Product</td>
                      </tr>
                    )
                  ) : (
                        <Loader />
                  )}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <a onClick={handlePagesDecrease}>
                <span>
                  <i className="fa fa-caret-left" aria-hidden="true" />
                </span>
              </a>
              {arr?.map((item, index) => {
                console.log("item:",typeof item,typeof page);
                return (
                  <a
                    onClick={() => FetchDataOnPages(item)}
                    className={Number(page) === item && "active"}
                  >
                    {item}
                  </a>
                );
              })}
              <a onClick={handlePagesIncrease}>
                <span>
                  <i className="fa fa-caret-right" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="ModalBox">
          <div
            id="DeleteModal"
            className="modal fade"
            style={{ display: "none" }}
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Decline">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Delete</h3>
                    <p>Are you sure you want to Delete Product ?</p>
                    <h4>
                      <a href="javascript:void(0);" data-dismiss="modal">
                        no
                      </a>
                      <a
                        href="javascript:void(0);"
                        onClick={handleDeleteProudct}
                        data-dismiss="modal"
                      >
                        Yes
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ModalBox">
          <div
            id="LogOutModal"
            className="modal fade"
            style={{ display: "none" }}
            aria-hidden="true"
          ></div>
        </div>
      </>
    </>
  );
};

export default ProductCatalogueManagement;
