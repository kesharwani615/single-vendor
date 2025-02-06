import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetPaymentManagementSlice } from "../../redux/features/PaymentManagementSlice";
import { Loader } from "../../common/Loader/Loader";

const PaymentManagement = () => {

  const dispatch = useDispatch();
  const [data,setData] = useState([])

  const {loading} = useSelector((state)=>state.BookingManagement);

  useEffect(()=>{
    dispatch(GetPaymentManagementSlice()).then((res)=>{
      setData(res?.payload?.data)
    })
  },[])

  return (
    <>
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h2>Payment management</h2>
              {/* <a class="Button" data-toggle="modal" data-target="#ReturnModal">Return within days</a>                 */}
            </div>
            {/* <div class="CommonTabs">
          <ul class="nav nav-tabs">
              <li class="nav-item">
                  <a class="nav-link active" data-toggle="tab" href="#History">Transaction History</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#Charges">Set Decorator Charges</a>
              </li>   

          </ul>  
      </div> */}
            <div className="tab-content">
              <div className="tab-pane active" id="History">
                <div className="Small-Wrapper">
                  <div className="Filter">
                    <div className="form-group">
                      <label>Search</label>
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search"
                      />
                    </div>
                    <div className="form-group">
                      <label>From Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>To Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    {/* <div className="form-group">
                      <label>Timeframe</label>
                      <select className="form-control">
                        <option value="select">--Select--</option>
                        <option value="select">Today</option>
                        <option value="Month">This Week</option>
                        <option value="Month">This Month</option>
                      </select>
                    </div> */}
                    <div className="form-group">
                      <label>&nbsp;</label>
                      <button className="Button" style={{marginRight:'10px'}}>Apply</button>
                      <button className="Button Cancel">
                        <i className="fa fa-refresh" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="TableList">
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Transaction Id</th>
                        <th>Transaction Date &amp; Time</th>
                        <th>Amount (in Rs.)</th>
                        <th>Booking Id</th>
                        <th>Customer Id</th>
                        <th>Customer Name</th>
                        <th>View Booking Details</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={13}>
                            <Loader />
                          </td>
                        </tr>
                      ) : Array.isArray(data) && data?.length > 0 ? (
                        <tr>
                          <td>1</td>
                          <td>VNU101</td>
                          <td>22-Feb-2022</td>
                          <td>100</td>
                          <td>B-122</td>
                          <td>Cust123</td>
                          <td>lorem</td>
                          <td>
                            <div className="Actions">
                              <Link className="Blue" to={"/PaymentDetails"}>
                                <i className="fa fa-eye" />
                              </Link>
                            </div>
                          </td>
                          <td>
                            <span className="Blue">Successful</span>
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan={13}>There is no data found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="pagination">
                  <a href="#">
                    <span>
                      <i className="fa fa-caret-left" aria-hidden="true" />
                    </span>
                  </a>
                  <a href="#">1</a>
                  <a href="#" className="active">
                    2
                  </a>
                  <a href="#">3</a>
                  <a href="#">
                    <span>
                      <i className="fa fa-caret-right" aria-hidden="true" />
                    </span>
                  </a>
                </div>
              </div>
              <div className="tab-pane fade" id="Charges">
                <div className="Small-Wrapper">
                  <div className="TitleBox">
                    <h2>Set Decorator Charges (in TZS)</h2>
                    <div className="Actions">
                      <a className="Green" href="payment-edit.html">
                        <i className="fa fa-pencil" />
                      </a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="ItineraryArea">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Decorator Charge</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>
                                Min. Purchase Amount for free Decorator
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <p className="Error">
                              ***** The Decorator charge will be applicable for
                              orders less than min. purchase amount.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a className="Button Previous" href="#">
                    Save
                  </a>
                </div>
                <br />
                <div className="Small-Wrapper">
                  <div className="TitleBox">
                    <h2>Set Extra Cost (in TZS)</h2>
                    <div className="Actions">
                      <a className="Green" href="payment-edit.html">
                        <i className="fa fa-pencil" />
                      </a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="ItineraryArea">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Extra Cost for COD</label>
                              <input type="text" className="form-control" />
                            </div>
                            <p className="Error">
                              ******The extra cost will not apply to orders that
                              have completed online payments.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a className="Button Previous" href="#">
                    Save
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ModalBox">
          <div id="ReturnModal" className="modal fade" role="dialog">
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
                    {/* <h3>Select Days</h3>  */}
                    <div className="form-group">
                      <label>Select Days</label>
                      <select className="form-control">
                        <option value="Active Users">--Select--</option>
                        <option value="Active Users">10 Days</option>
                        <option value="Active Users">15 Days</option>
                      </select>
                    </div>
                    <a href="#" className="Button">
                      Save
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default PaymentManagement;
