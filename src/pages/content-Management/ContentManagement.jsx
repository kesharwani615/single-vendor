import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AboutUsContentManagementSlice, ContactUsManagementSlice, PrivacyPolicyContentManagementSlice, TermAndConditionContentManagementSlice } from '../../redux/features/ContentManagementSlice';

const ContentManagement = () => {
  const dispatch = useDispatch();
  const [data,setData] = useState({
    AboutUs:'',
    PrivacyPolicy:'',
    TermCondition:'',
    ContactUs:''
  })

  useEffect(()=>{
    dispatch(AboutUsContentManagementSlice()).then((res)=>{
      setData((prev)=>({...prev,AboutUs:res.payload?.data[0] || ''}));
    })

    dispatch(PrivacyPolicyContentManagementSlice()).then((res)=>{
      setData((prev)=>({...prev,PrivacyPolicy:res.payload?.data[0] || ''}));
    })

    dispatch(TermAndConditionContentManagementSlice()).then((res)=>{
      setData((prev)=>({...prev,TermCondition:res.payload?.data[0] || ''}));
    })
   
    dispatch(ContactUsManagementSlice()).then((res)=>{
      console.log("contact:",res.payload?.data[0] )
      setData((prev)=>({...prev,ContactUs:res.payload?.data[0] || ''}));
    })
  },[])
  return (
    <>
  <div className="WrapperArea">
  <div className="WrapperBox">
    <div className="Small-Wrapper" style={{padding:'20px 20px'}}>
      <div className="TitleBox">
        <h2>Content Management System</h2>
      </div>
      <div className="StaticBoxArea">
        <div className="panel-group" id="accordion">
          <div className="panel">
            <div
              className="panel-heading"
              data-toggle="collapse"
              data-parent="#accordion"
              href="#collapse2"
            >
              <h4>About Us</h4>
            </div>
            <div id="collapse2" className="panel-collapse collapse">
              <div className="panel-body">
                <div className="TitleBox">
                  <h3>About</h3>
                  <Link to={`${data?.AboutUs?._id}/EditContentManagement`} state={{details:data?.AboutUs?.details,field:'AboutUs'}} className="TitleLink">
                    Edit
                  </Link>
                </div>
                <div dangerouslySetInnerHTML={{ __html: data?.AboutUs?.details }} />
              </div>
            </div>
          </div>
          <div className="panel">
            <div
              className="panel-heading"
              data-toggle="collapse"
              data-parent="#accordion"
              href="#collapse3"
            >
              <h4>Terrms &amp; Conditions</h4>
            </div>
            <div id="collapse3" className="panel-collapse collapse">
              <div className="panel-body">
                <div className="TitleBox">
                  <h3>Terrms &amp; Conditions</h3>
                  <Link to={`${data?.TermCondition?._id}/EditContentManagement`} state={{details:data?.TermCondition?.details,field:'TermCondition'}} className="TitleLink">
                    Edit
                  </Link>
                </div>
                <div dangerouslySetInnerHTML={{ __html: data?.TermCondition?.details }} />              
              </div>
            </div>
          </div>
          <div className="panel">
            <div
              className="panel-heading"
              data-toggle="collapse"
              data-parent="#accordion"
              href="#collapse4"
            >
              <h4>Privacy Policy</h4>
            </div>
            <div id="collapse4" className="panel-collapse collapse">
              <div className="panel-body">
                <div className="TitleBox">
                  <h3>Privacy Policy</h3>
                  <Link to={`${data?.PrivacyPolicy?._id}/EditContentManagement`} state={{details:data?.PrivacyPolicy?.details,field:'PrivacyPolicy'}} className="TitleLink">
                    Edit
                  </Link>
                </div>
                <div dangerouslySetInnerHTML={{ __html: data?.PrivacyPolicy?.details }} />
              </div>
            </div>
          </div>
          <div className="panel">
            <div
              className="panel-heading"
              data-toggle="collapse"
              data-parent="#accordion"
              href="#collapse5"
            >
              <h4>Contact Us</h4>
            </div>
            <div id="collapse5" className="panel-collapse collapse">
              <div className="panel-body">
              <div className="TitleBox">
                  <h3>Privacy Policy</h3>
                  <Link to={`${data?.ContactUs?._id}/EditContentManagement`} state={{details:data?.ContactUs?.details,field:'ContactUs'}} className="TitleLink">
                    Edit
                  </Link>
                </div>
                <div dangerouslySetInnerHTML={{ __html: data?.ContactUs?.details }} />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    </>
  )
}

export default ContentManagement
