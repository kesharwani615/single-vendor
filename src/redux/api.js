import axios from "axios";

export const API = axios.create({
    baseURL: `http://15.206.16.230:4001/api/v1/`
    // baseURL: `${process.env.REACT_APP_BASE_URL}`
})

//User Login
//---------------

export const UserLogin = (cred) => API.post(`admin/admin-signup`,cred,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});


//User Management
// *************************************

export const UserManagementApi = (data) => API.get(`admin/customers-list?${data}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const UserDetailsOnIdBasisApi = (id) => API.get(`admin/customer-info/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});



export const UserSearchBarApi = (searchKey) => API.get(`admin/customer-searchbar?${searchKey}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
})



//Banner Management
// *************************************

export const AddBannerApi = (data) => API.post('admin/addbanner',data,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetBannerListApi = (page) => API.get(`admin/bannerlist?${page}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const EditBannerApi = ({id,formData}) => API.put(`admin/updateBanner/${id}`,formData,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const DeleteBannerApi = (id) => API.delete(`admin/deleteBanner/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const BannerSearchBarApi = (searchKey) => API.get(`admin/banner-searchbar?${searchKey}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
})


//deal Banner Management
// *************************************

export const CreateDealBannerApi = (data) => API.post('admin/adddealbanner',data,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetDealBannerListApi = () => API.get('admin/dealbannerlist',{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const EditDealBannerApi = ({id,formData}) => API.put(`admin/updatedealBanner/${id}`,formData,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const DeleteDealBannerApi = (id) => API.delete(`admin/deletedealBanner/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const DealBannerSearchBarApi = (searchKey) => API.get(`admin/dealbanner-searchbar?${searchKey}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
})


// product category management
//---------------------------------

export const GetProductCategoryApi = (data) => API.get(`admin/category-list?${data}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const DeleteProductCategoryApi = (id) => API.delete(`admin/category-delete/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const CreateProductCategoryApi = (formData) => API.post('admin/category-insert',formData,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    'Content-Type': 'multipart/form-data',
  },
});

export const EditProductCategoryApi = ({id,formData}) => API.patch(`admin/category-update/${id}`,formData,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    'Content-Type': 'multipart/form-data',
  },
});

// sub category product management
//---------------------------------

export const GetSubCategoryProductApi = (id) => API.get(`admin/subcategory-list/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const CreateSubCategoryProductApi = (data) => API.post(`admin/subcategory-insert`,data,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    'Content-Type': 'multipart/form-data',
  },
});

export const EditSubProductCategoryApi = ({id,formData}) => API.patch(`admin/subcategory-update/${id}`,formData,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    'Content-Type': 'multipart/form-data',
  },
});

export const DeleteSubProductCategoryApi = (id) => API.delete(`admin/subcategory-delete/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

//product catalogue
// -------------------

export const CreateProductCatalogueApi = (formData) => API.post(`admin/addnew-product`,formData,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetProductCatalogueApi = (params) => API.get(`admin/getall-products?${params}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetProductOnIdBasisApi = (id) => API.get(`admin/getsingle-product/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const DeleteProductApi = (id) => API.delete(`admin/deleteOne-product/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const EditProductApi = ({id,formData}) => API.patch(`admin/updatedetils-product/${id}`,formData,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});





//City Management
//------------------

export const GetCityManagementApi = () => API.get(`admin/viewcity`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const AddCityManagementApi = (formData) => API.post(`admin/addcity`,formData,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const UpdateCityManagementApi = ({id,formData}) => API.patch(`admin/updatecity/${id}`,formData,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const DeleteCityManagementApi = (id) => API.delete(`admin/deleteCity/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

//Booking management

export const GetOrderslistBookingManagementApi = () => API.get(`admin/orderslist`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetCancelledOrderslistBookingManagementApi = () => API.get(`admin/cancelledOrders`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetCompletedOrderslistBookingManagementApi = () => API.get(`admin/completedOrders`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const UpdateDecoratorBookingManagementApi = ({id,iState}) => API.patch(`admin/updateDecorator/${id}`,iState,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const CancelBookingManagementApi = ({id,data}) => API.patch(`admin/cancelledOrders${id}`,data,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

//Abandoned Cart Managment
//-------------------------

export const GetCustomerAbandonedCartApi = () => API.get(`admin/customerabandonedlist`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetDetailProductsabandonedApi = (id) => API.get(`admin/detailproductsabandoned/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

//Content Management

export const GetAboutUsContentManagementApi = () => API.get(`admin/aboutusget`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetPrivacyPolicyContentManagementApi = () => API.get(`admin/privacyget`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetTermConditionContentManagementApi = () => API.get(`admin/termget`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetContactUsManagementApi = () => API.get(`admin/contactdata`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const UpdateAboutUsContentManagementApi = ({id,details}) => API.patch(`admin/aboutupdate/${id}`,{details},{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});
export const UpdateTermConditionContentManagementApi = ({id,details}) => API.patch(`admin/termupdate/${id}`,{details},{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});
export const UpdatePrivacyPolicContentManagementApi = ({id,details}) => API.patch(`admin/privacyupdate/${id}`,{details},{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});
export const UpdateContactUsManagementApi = ({id,details}) => API.patch(`admin/contactupdate/${id}`,{details},{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});


//Payment management

export const GetPaymentManagementApi = () => API.get(`admin/paymentList`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});


//notification management

export const CreateNotificationManagementApi = (data) => API.post(`admin/createNotification`,data,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetNotificationManagementApi = (dataSet) => API.get(`admin/listNotification?${dataSet}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const UpdateNotificationManagementApi = ({id,data}) => API.patch(`admin/updateNotification/${id}`,data,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const DeleteNotificationManagementApi = (id) => API.delete(`admin/deleteNotification/${id}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

//booking management

