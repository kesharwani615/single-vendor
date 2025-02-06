import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { CancelBookingManagementSlice } from '../../../../redux/features/BookingManagementSlice';

const CancelOrder = () => {
  const navigate = useNavigate();
  const [DataForSend,setDataForSend] = useState({
    "status":"cancelled",
    cancellationReason:'',
    cancellationComment:''
  });

  const {id} = useParams();

  const dispatch = useDispatch();

  const cancellationReason = [
    "product not available",
    "area not serviceable"
  ]

  const handleSubmit = ()=>{
    console.log("dataForSend",DataForSend)
    dispatch(CancelBookingManagementSlice({id:id,data:DataForSend})).then((res)=>{
      console.log("resss:",res)
      if(res?.payload?.data) navigate(-1)
    })
  }

  return (
    <div className='ModalBox'>
   <div id="CancelOrder" className="modal fade" aria-hidden="true">
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
          <h3>Cancel Order</h3>
          <div className="form-group">
            <label>cancellationReason</label>
            <select className="form-control" onChange={(e)=>setDataForSend((prev)=>({...prev,cancellationReason:e.target.value}))}>
              <option selected="">--select--</option>
              {cancellationReason?.map((item)=>{
                return(
                  <option value={item} >{item}</option>
                )
              })  
              }
            </select>
          </div>
          <div className="form-group">
            <label>Add your cancellationComment here</label>
            <textarea
              className="form-control"
              rows={5}
              value={DataForSend.cancellationComment}
              onChange={(e)=>setDataForSend((prev)=>({...prev,cancellationComment:e.target.value}))}
              placeholder="write here..."
              defaultValue={""}
            />
          </div>
          <h4 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 20px 0" }}>
            Are you sure you want to cancel order?
          </h4>
          <a className="Button" onClick={handleSubmit}>
            Yes, Cancel
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default CancelOrder
