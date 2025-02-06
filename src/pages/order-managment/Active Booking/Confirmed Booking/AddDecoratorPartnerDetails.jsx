import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateDecoratorBookingManagementSlice } from '../../../../redux/features/BookingManagementSlice';

const DataObj = {
  address:'',
  contact:'',
  name:'',
  trackingId:''
} 

const AddDecoratorPartnerDetails = () => {

    const {state} = useLocation();

    const {id} = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {address,contact,name,trackingId} = state || {}

    const [iState,setUpdateData] = useState(DataObj);

    useEffect(()=>{
      setUpdateData((prev)=>({...prev,address,contact,name,trackingId}));
    },[state])

    const handleChange = (e)=>{
      const {name,value} = e.target;

      setUpdateData((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit = () =>{
      console.log("iState",iState);
      dispatch(updateDecoratorBookingManagementSlice({id,iState})).then((res)=>{
        console.log("res:",res);
        navigate(-1);
      })
    }

  return (
    <>
       <div className="ModalBox">
        <div
          id="AddDecoratorPartnerModal"
          className="modal fade"
          aria-hidden="true"
          style={{ display: "none" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="Category">
                  <a
                    href="javascript:void(0);"
                    className="CloseModal"
                    data-dismiss="modal"
                    onClick={()=>navigate(-1)}
                  >
                    ×
                  </a>
                  <h3>Add Decorator Partner Details</h3>
                  <div className="form-group">
                    <label>Name of Decorator Partner</label>
                    <input type="text" value={iState?.name} name='name'  onChange={handleChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Contact Details</label>
                    <input type="text" value={iState?.contact} name='contact' onChange={handleChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Tracking Id or Number</label>
                    <input type="text" value={iState?.trackingId} name='trackingId' onChange={handleChange} className="form-control" />
                  </div>
                  <a onClick={handleSubmit} className="Button">
                    Add details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="CancelOrder"
          className="modal fade"
          aria-hidden="true"
          style={{ display: "none" }}
        >
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
                  <h3>Cancel Order</h3>
                  <div className="form-group">
                    <label>Reason</label>
                    <select className="form-control">
                      <option selected="">--select--</option>
                      <option>other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Add your comment here</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="write here..."
                      defaultValue={""}
                    />
                  </div>
                  <h4
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      margin: "0 0 20px 0",
                    }}
                  >
                    Are you sure you want to cancel order?
                  </h4>
                  <a href="#" className="Button">
                    Yes, Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="AddSupplierModal" className="modal fade" role="dialog">
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
                  <h3>
                    Add Supplier Details{" "}
                    <span>(Only for admin information)</span>
                  </h3>
                  <div className="form-group">
                    <label>Name of the Supplier</label>
                    <select className="form-control">
                      <option value="Active Users">--Select--</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Contact Details</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                  <a href="#" className="Button">
                    Add details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddDecoratorPartnerDetails
