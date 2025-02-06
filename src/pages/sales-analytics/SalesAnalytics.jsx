import React from 'react'

const SalesAnalytics = () => {
  return (
    <>
     <div className="WrapperArea">
  <div className="WrapperBox">
    <div className="TitleBox">
      <h2>Sales &amp; Analytics Reports</h2>
    </div>
    <div className="TableList">
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Reports</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Total Revenue Report</td>
            <td>
              <figure>
                <img src="images/download.png" alt="" />
              </figure>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Total Sales Report</td>
            <td>
              <figure>
                <img src="images/download.png" alt="" />
              </figure>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Total Users Report</td>
            <td>
              <figure>
                <img src="images/download.png" alt="" />
              </figure>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Top Selling Products Report</td>
            <td>
              <figure>
                <img src="images/download.png" alt="" />
              </figure>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Least Sold Products Report</td>
            <td>
              <figure>
                <img src="images/download.png" alt="" />
              </figure>
            </td>
          </tr>
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
 
    </>
  )
}

export default SalesAnalytics
