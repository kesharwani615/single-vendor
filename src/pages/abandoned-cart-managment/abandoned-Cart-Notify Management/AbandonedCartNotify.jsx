import React from 'react'

const AbandonedCartNotify = () => {
  return (
    <>
     <>
  <div className="WrapperArea">
    <div className="WrapperBox">
      <div className="Small-Wrapper">
        <div className="TitleBox">
          <h2>Item(s) List</h2>
        </div>
        <div className="TableList">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Name of the product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Added On</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <figure>
                    <img src="images/bg.jpg" alt="" />
                  </figure>
                </td>
                <td>lorem</td>
                <td>1</td>
                <td>123</td>
                <td>12/01/2024</td>
              </tr>
              <tr>
                <td>
                  <figure>
                    <img src="images/bg.jpg" alt="" />
                  </figure>
                </td>
                <td>lorem</td>
                <td>1</td>
                <td>123</td>
                <td>12/01/2024</td>
              </tr>
              <tr>
                <td>
                  <figure>
                    <img src="images/bg.jpg" alt="" />
                  </figure>
                </td>
                <td>lorem</td>
                <td>1</td>
                <td>123</td>
                <td>12/01/2024</td>
              </tr>
              <tr>
                <td>
                  <figure>
                    <img src="images/bg.jpg" alt="" />
                  </figure>
                </td>
                <td>lorem</td>
                <td>1</td>
                <td>123</td>
                <td>12/01/2024</td>
              </tr>
              <tr>
                <td>
                  <figure>
                    <img src="images/bg.jpg" alt="" />
                  </figure>
                </td>
                <td>lorem</td>
                <td>1</td>
                <td>123</td>
                <td>12/01/2024</td>
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
</>
 
    </>
  )
}

export default AbandonedCartNotify
