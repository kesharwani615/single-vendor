import React, { useState } from 'react'
import { UpdateNotificationSlice } from '../../../redux/features/NotificationManagement';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const UpdateNotification = () => {

  const {state} = useLocation();

  const [iState,setUpdate] = useState({
    "title":state?.title,
    "body":state?.body,
    "userType":state?.userType
});

const dispatch = useDispatch();
const navigate = useNavigate();

const handleChange = (e) =>{
  const {name,value} = e.target;
  console.log("name:",name,value);
  setUpdate((prev)=>({...prev,[name]:value}))
}

const handleSubmit = () =>{
  if([iState.title.length,iState.body.length,iState.userType.length].includes(0)){
    toast.error('All fields are mendatory!');
    return;
  }
  console.log("iState:",iState);
  dispatch(UpdateNotificationSlice({id:state._id,data:iState})).then((res)=>{
    navigate(-1);
  })
}

  return (
    <div id="NotificationEdit" className="modal fade" role="dialog">
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
              <h3>Edit New Notification</h3>
              <div className="form-group">
                <label>Title of Notification</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title of Notification"
                  name='title'
                  value={iState.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Notification Content</label>
                <textarea
                  rows={5}
                  className="form-control"
                  placeholder="Enter Notification Content"
                  defaultValue={""}
                  name='body'
                  value={iState.body}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Select Users</label>
                <select className="form-control" name='userType' value={iState.userType} onChange={handleChange}>
                  <option value="">--Select--</option>
                  <option value="Active Users">Active Users</option>
                  <option value="Inactive Users">Inactive Users</option>
                </select>
              </div>
              <button onClick={handleSubmit} className="Button">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateNotification
