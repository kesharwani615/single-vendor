import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetUserDetailOnIdBasisSlice } from '../../../../redux/features/UserManagementSlice';
import { useDispatch } from 'react-redux';

const BasicPersonal = () => {
  const {id} = useParams();
  const [data,setData] = useState({});
  const dispatch = useDispatch();

  console.log("basic:",id);
  useEffect(()=>{
    dispatch(GetUserDetailOnIdBasisSlice(id)).then((res)=>{
      try {
        setData(res.payload.checkData);
      } catch (error) {
        
      }
    })
  },[id])
  return (
    <>
      <div className="Small-Wrapper">
              <div className="portfolio">
                <div className="ProfileBox">
                  <figure>
                    <img src={require(`../../../../assets/images/user.avif`)} />d
                  </figure>
                  <figcaption>
                    <p>
                      <label>Name</label> <span>{data?.personalInfo?.name?.slice(0,20)}</span>
                    </p>
                    <p>
                      <label>Gender</label> <span>{data?.personalInfo?.gender}</span>
                    </p>
                    <p>
                      <label>Mobile Number</label> <span>{data?.phone}</span>
                    </p>
                    <p>
                      <label>Email Address</label> <span>{data?.personalInfo?.email}</span>
                    </p>
                    <p>
                      <label>DOB</label>
                      <span>{data?.personalInfo?.dob?.substring(0,10)}</span>
                    </p>
                  </figcaption>
                </div>
                <div className="ProfileBox ProfileBox1">
                  <h5>Saved Addresses</h5>
                  <h6>Default</h6>
                  <p>Full Name:<span> {data?.personalInfo?.name?.slice(0,20)}</span></p>
                  <p>House Number/Flat No./Office No.: <span> {data?.address?.houseNo}</span></p>
                  <p>Road name, Area Name, Society Name: <span> {data?.address?.city}</span></p>
                  <p>Pin Code: <span> {data?.address?.pincode}</span></p>
                  <p>Mobile Number: <span> {data?.phone}</span></p>
                  <br />
                  <h6>Office</h6>
                  <p>Full Name</p>
                  <p>House Number/Flat No./Office No.</p>
                  <p>Road name, Area Name, Society Name</p>
                  <p>Pin Code</p>
                  <p>Mobile Number</p>
                </div>
              </div>
            </div> 
    </>
  )
}

export default BasicPersonal
