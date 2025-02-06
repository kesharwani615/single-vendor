import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetCustomerAbandonedCartSlice } from '../../redux/features/AbandonedCartManagmentSlice';
import {Loader} from '../../common/Loader/Loader'

const AbandonedCartManagment = () => {
  
  const dispatch = useDispatch();

  const [data,setData] = useState([]);

  const {loading} = useSelector((state)=>state.AbandonedCartManagment)

  useEffect(()=>{
    dispatch(GetCustomerAbandonedCartSlice()).then((res)=>{
      if(Array.isArray(res?.payload?.data?.cart) && res?.payload?.data?.cart?.length > 0){
        setData(res?.payload?.data?.cart);
      }
    })
  },[])

  return (
    <>
     <>
  <div className="WrapperArea">
    <div className="WrapperBox">
      <div className="TitleBox">
        <h2>List of Abandoned Carts</h2>
        <Link className="Button" to={'AbandonedCartNotify'}>
          Notify All
        </Link>
      </div>
      <div className="Small-Wrapper">
        <div className="Filter justify-content-between">
          <div className="FilterLeft">
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
              <input
                type="date"
                className="form-control"
                placeholder="Search"
              />
            </div>
            <div className="form-group">
              <label>To Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Search"
              />
            </div>
            <div className="form-group">
              <label>&nbsp;</label>
              <button className="Button" style={{marginRight:'10px'}}>Apply</button>
              <button className="Button Cancel">
                <i className="fa fa-refresh" />
              </button>
            </div>
          </div>
          <div className="FilterRight">
            <div className="form-group">
              <label>By Sort</label>
              <select className="form-control">
                <option value="select">--Select--</option>
                <option value="select">Today</option>
                <option value="Month">This Week</option>
                <option value="Month">This Month</option>
                <option value="Year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="TableList">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Customer Id</th>
              <th>Customer Name</th>
              <th>Contact Details</th>
              <th>View Cart</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ?
            <Loader/>
            :(Array.isArray(data) && data.length > 0 ? 
            (data?.map((item,index)=>{
              return(
            <tr>
              <td>{index + 1}</td>
              <td>{item?.userId}</td>
              <td>lorem</td>
              <td>1234567</td>
              <td>
                <div className="Actions">
                <Link state={item?.items} className="Blue" to={'AbandonedDetails'}>
                    <i className="fa fa-eye" />
                  </Link>
                </div>
              </td>
              <td>
                <span className="Green">Notify</span>
              </td>
            </tr>
              )})
            ):(
              <tr>
                <td>There is no data found</td>
              </tr>
            )
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
              <p>Are you sure you want to Delete this category ?</p>
              <h4>
                <a href="javascript:void(0);" data-dismiss="modal">
                  no
                </a>
                <a href="javascript:void(0);" data-dismiss="modal">
                  Yes
                </a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="NotificationAdd"
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
              <h3>List of Sub-category</h3>
              <div className="form-group">
                <label>Sub-category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                />
              </div>
              <div className="form-group">
                <label>Upload Images</label>
                <div className="UploadBox">
                  <div className="Upload">
                    <i className="fa fa-upload" /> <span>Upload</span>
                    <input type="file" />
                  </div>
                </div>
              </div>
              <a href="#" className="Button">
                Save
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
              <h3>List of Sub-category</h3>
              <div className="form-group">
                <label>Sub-category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                />
              </div>
              <div className="form-group">
                <label>Upload Images</label>
                <div className="UploadBox">
                  <div className="Upload">
                    <i className="fa fa-upload" /> <span>Upload</span>
                    <input type="file" />
                  </div>
                </div>
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
  <div className="ModalBox">
    <div
      id="LogOutModal"
      className="modal fade"
      style={{ display: "none" }}
      aria-hidden="true"
    >
    </div>
  </div>
</> 
    </>
  )
}

export default AbandonedCartManagment
