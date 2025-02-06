import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { UpdateAboutUsContentManagementSlice, UpdateContactUsManagementSlice, UpdatePrivacyPolicyContentManagementSlice, UpdateTermConditionContentManagementSlice } from '../../redux/features/ContentManagementSlice';
import Editor from '../../common/Editor/Editor.js'

const EditContentManagement = () => {
  const {id} = useParams();
  const {state} = useLocation();
  const [contentState,setContentState]  = useState({
    details:'',
    field:''
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    setContentState({
      details:state.details,
      field:state.field
    })
  },[])

  const handleSubmit = () =>{
    switch (contentState.field) {
      case 'AboutUs':
        dispatch(UpdateAboutUsContentManagementSlice({id,details:contentState.details})).then((res)=>navigate(-1))
        break;
      case 'TermCondition':
        dispatch(UpdateTermConditionContentManagementSlice({id,details:contentState.details})).then((res)=>navigate(-1))
        break;
      case 'PrivacyPolicy':
        dispatch(UpdatePrivacyPolicyContentManagementSlice({id,details:contentState.details})).then((res)=>navigate(-1))
        break;
      case 'ContactUs':
        dispatch(UpdateContactUsManagementSlice({id,details:contentState.details})).then((res)=>navigate(-1))
        break;
    }
  }

  
  return (
    <>
        <div class="WrapperArea">
        <div class="WrapperBox">

            <div class="Small-Wrapper">
                <div class="TitleBox">
                    <h2>Content Management System</h2>
                    {/* <a href="#" class="Button">Edit</a> */}
                </div>

                <Editor content={contentState?.details} setContentState={setContentState} />

                {/* <textarea  id="editornew" value={iState?.details} onChange={(e)=>setUpdate((prev)=>({...prev,details:e.target.value}))} class="form-control" rows="7" ></textarea> */}
                <br/>
                <button type="button" class="btn btn-primary" style={{marginBottom:'10px'}} onClick={handleSubmit}>Save</button>
            </div>
               
        </div> 
    </div> 
    </>
  )
}

export default EditContentManagement