import React from "react";

const ButtonSpinner = () => {
  return (
    <>
      <div className="spinner-border" style={{height:'20px',width:'20px'}}  role="status">
        {/* <span className="visually-hidden" style={{height:'10px'}}></span> */}
      </div>
    </>
  );
};

export default ButtonSpinner;
