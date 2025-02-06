import React, { useEffect, useState } from 'react'
import { CreateBannerManagementSlice } from '../../redux/features/BannerManagementSlice'
import { useDispatch } from 'react-redux'
import TopBanners from './Top Banner/TopBanners';
import DealBanners from './Deal Banners/DealBanners';
import AddNewBanner from './Add Banner/AddNewBanner';
import EditBanners from './Edit Banners/EditBanners';
import AddDealsBanner from './Add Deals Banner/AddDealsBanner';
import EditDealBanner from './Edit Deal Banner/EditDealBanner';
import { Link, Outlet } from 'react-router-dom';

const BannerManagement = () => {

  // const dispatch = useDispatch();

  const [state,setState] = useState('Banners')
  

  useEffect(()=>{
    // dispatch(CreateBannerManagementSlice(data)).then((res)=>{
    // console.log(res);
    // })
  },[])
  return (
    <>
  <div className="WrapperArea">
    <div className="WrapperBox">
      <div className="TitleBox">
        <h2>Banner Management</h2>
      </div>
      <div className="CommonTabs">
        <div className="TitleBox">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link to={'TopBanner'} className="nav-link active" data-toggle="tab">
                Top Banners
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'DealBanner'} className="nav-link" data-toggle="tab">
                Deals Banners
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <>
      <Outlet/>
      </>
      {/* <div className="tab-content">
        {state === "Banners" && 
        <TopBanners/> 
        }
        {state === "DealBanners" &&
          <DealBanners/>
        }
      </div> */}
    </div>
  </div>
  {/* <div className="ModalBox">
    <div
      id="BannerEditModal"
      className="modal fade"
        aria-hidden="true"
    >
     <EditBanners/>
    </div>
    <div id="BannersAddModal" className="modal fade" aria-hidden="true">
    <AddNewBanner/>
    </div>
    <div id="DealsBannerAdd" className="modal fade" aria-hidden="true">
    <AddDealsBanner/>
    </div>
    <div id="DealsBannerEdit" className="modal fade" aria-hidden="true">
     <EditDealBanner/>
    </div>
  </div> */}
</>

  )
}

export default BannerManagement