import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
     <div className="Header">
  <div className="Navigation">
    <div className="Avater">
      <a href="javascript:void(0);">
        <figure>
        <img src={require('../../assets/images/user.avif')} alt='internal server error'/>
        </figure>
        Single Vendor
      </a>
      <ul>
        <li>
          <figure>
          <img src={require('../../assets/images/user.avif')} alt='internal server error'/>
          </figure>
          <h4>
            <span>Administrator</span>
          </h4>
        </li>
        <li>
          <Link to={'/MyAccount'}>
            <span>
              <i className="fa fa-user-o" aria-hidden="true" />
            </span>{" "}
            My Account
          </Link>
          <a href="settings.html">
            <span>
              <i className="fa fa-cog" />
            </span>{" "}
            Change Password
          </a>
           <Link
                 href="javascript:void(0);"
                 data-toggle="modal"
                 data-target="#LogOutModal"
                 to={'/login'}
                //  onClick={()=>localStorage.removeItem('remberMe')}
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
    <div className="clear" />
  </div>
</div>
 
    </>
  )
}

export default Header
