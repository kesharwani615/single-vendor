import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NotificationCreatedSlice } from '../../../redux/features/NotificationManagement';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddNotification = () => {
  const [iState,setUpdate] = useState({
    "title":"",
    "body":"",
    "userType":""
});

const dispatch = useDispatch();
const navigate = useNavigate();

const handleChange = (e) =>{
  const {name,value} = e.target;
  setUpdate((prev)=>({...prev,[name]:value}))
}

const handleSubmit = () =>{
  if([iState.title.length,iState.body.length,iState.userType.length].includes(0)){
    toast.error('All fields are mendatory!');
    return;
  }
  console.log("iState:",iState);
  dispatch(NotificationCreatedSlice(iState)).then((res)=>{
    navigate(-1);
  })
}

  return (
    <div id="NotificationAdd" className="modal fade" role="dialog">
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
              <h3>Add New Notification</h3>
              <div className="form-group">
                <label>Title of Notification</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title of Notification"
                  value={iState.title}
                  name='title'
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
                <select className="form-control" name='userType' onChange={handleChange}>
                  <option value="Active Users">--Select--</option>
                  <option value="Active Users">Active Users</option>
                  <option value="Inactive Users">Inactive Users</option>
                </select>
              </div>
              <button onClick={handleSubmit} className="Button">
                Send Notification
              </button>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default AddNotification
