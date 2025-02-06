import React from 'react'
import { FaCity } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'

const SideNavBar = () => {

  const location = useLocation().pathname.split('/').splice(1);

  console.log("location:",location);


  return (
    <>
     <div className="SidenavBar">
  <ul>
    <li className={`${location.includes('') && 'active'}`}>
      <Link to={'/'}>
        <span>
          <i className="fa fa-tachometer" />
        </span>{" "}
        Dashboard
      </Link>
    </li>
    <li className={`${location.includes('UsersManagement') && 'active'}`}>
      <Link to={'/UsersManagement'}>
        <span>
          <i className="fa fa-users" />
        </span>{" "}
        User Management
      </Link>
    </li>
    <li className={`${location.includes('BannerManagement') && 'active'}`}>
      <Link to={'/BannerManagement/TopBanner'}>
        <span>
          <i className="fa fa-picture-o" aria-hidden="true" />
        </span>
        Banner Management
      </Link>
    </li>
    <li className={`${location.includes('ProductCategory') && 'active'}`}>
      <Link to={'/ProductCategory'}>
        <span>
          <i className="fa fa-houzz" aria-hidden="true" />
        </span>
        Product category Management
      </Link>
    </li>
    <li className={`${location.includes('ProductCatalogueManagement') && 'active'}`}>
      <Link to={'/ProductCatalogueManagement/1'}>
        <span>
          <i className="fa fa-file-text-o" />
        </span>
        Product catalogue Management
      </Link>
    </li>
    <li className={`${location.includes('CityManagement') && 'active'}`}>
      <Link to={'/CityManagement'}>
        <span>
        <FaCity />
        </span>
        City Management
      </Link>
    </li>
    <li className={`${location.includes('OrderManagment') && 'active'}`}>
      <Link to={'/OrderManagment'}> 
        <span>
          <i className="fa fa-first-order" aria-hidden="true" />
        </span>
        Booking Management
      </Link>
    </li>
    <li className={`${location.includes('AbandonedCartManagment') && 'active'}`}>
      <Link to={'/AbandonedCartManagment'}>
        <span>
          <i className="fa fa-th" aria-hidden="true" />
        </span>
        Abandoned Cart Management
      </Link>
    </li>
    <li className={`${location.includes('PaymentManagement') && 'active'}`}>
      <Link to={'/PaymentManagement'}>
        <span>
          <i className="fa fa-money" aria-hidden="true" />
        </span>{" "}
        Payment Management
      </Link>
    </li>
    <li className={`${location.includes('SalesAnalytics') && 'active'}`}>
      <Link to={'/SalesAnalytics'}>
        <span>
          <i className="fa fa-line-chart" aria-hidden="true" />
        </span>
        Sales &amp; Analytics
      </Link>
    </li>
    <li className={`${location.includes('Notification') && 'active'}`}>
      <Link to={'/Notification'}>
        <span>
          <i className="fa fa-bell" aria-hidden="true" />
        </span>
        Notification Management
      </Link>
    </li>
    <li className={`${location.includes('ContentManagement') && 'active'}`}>
      <Link to={'/ContentManagement'}>
        <span>
          <i className="fa fa-bell" aria-hidden="true" />
        </span>
        Content Management
      </Link>
    </li>
    <li></li>
    <li>
      <Link
        href="javascript:void(0);"
        data-toggle="modal"
        data-target="#LogOutModal"
        to={'/login'}
        onClick={()=>localStorage.removeItem('remberMe')}
        replace
      >
        <span>
          <i className="fa fa-sign-out" />
        </span>{" "}
        Logout
      </Link>
    </li>
  </ul>
</div>
 
    </>
  )
}

export default SideNavBar
