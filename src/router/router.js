import Login from '../pages/Login/Login';
import OTPVarification from '../pages/OTP Verification/OTPVarification';
import Dashboard from '../pages/dashboard/Dashboard';
import UsersManagement from '../pages/User Management/UsersManagement';
import UsersListDetails from '../pages/User Management/User Management detail page/UsersListDetails';
import BannerManagement from '../pages/Banner Management/BannerManagement';
import ProductCategory from '../pages/product-category/ProductCategory';
import SubCategoryProduct from '../pages/product-category/product-sub-category/SubCategoryProduct';
import ProductCatalogueManagement from '../pages/product-catalogue-management/ProductCatalogueManagement';
import ProductCatalogueDetails from '../pages/product-catalogue-management/product-catalogue-details/ProductCatalogueDetails';
import OrderManagment from '../pages/order-managment/OrderManagment';
import OrderCompleted from '../pages/order-managment/order-completed/OrderCompleted';
import OrderReturnd from '../pages/order-managment/order-returnd/OrderReturnd';
import OrderActiveConfirmDetails from '../pages/order-managment/order-active-confirm-details/OrderActiveConfirmDetails';
import AbandonedCartManagment from '../pages/abandoned-cart-managment/AbandonedCartManagment';
import AbandonedDetails from '../pages/abandoned-cart-managment/abandoned-details/AbandonedDetails';
import MyAccount from '../pages/my-account/MyAccount';
import PaymentManagement from '../pages/payment-management/PaymentManagement';
import PaymentDetails from '../pages/payment-management/payment-details/PaymentDetails';
import SalesAnalytics from '../pages/sales-analytics/SalesAnalytics';
import Notification from '../pages/notification/Notification';
import AddProductCatalogue from '../pages/product-catalogue-management/Product-catalogue Add Product/AddProductCatalogue';
import CityManagement from '../pages/City Management/CityManagement';
import ContentManagement from '../pages/content-Management/ContentManagement';
import EditContentManagement from '../pages/content-Management/EditContentManagement';

export const routes = [
    { path: '/', element: <Dashboard /> },
    { path: '/login', element: <Login /> },
    // { path: '/OTPVarification', element: <OTPVarification /> },
    // { path: '/UsersManagement', element: <UsersManagement /> },
    // { path: '/UsersListDetails', element: <UsersListDetails /> },a
    // { path: '/BannerManagement', element: <BannerManagement /> },
    // { path: '/ProductCategory', element: <ProductCategory /> },
    // { path: '/CityManagement', element: <CityManagement /> },
    // { path: '/SubCategoryProduct', element: <SubCategoryProduct /> },
    // { path: '/ProductCatalogueManagement/ProductCatalogueDetails', element: <ProductCatalogueDetails /> },
    // { path: '/OrderManagment', element: <OrderManagment /> },
    // { path: '/OrderCompleted', element: <OrderCompleted /> },
    // { path: '/OrderReturnd', element: <OrderReturnd /> },
    // { path: '/OrderActiveConfirmDetails', element: <OrderActiveConfirmDetails /> },
    // { path: '/AbandonedCartManagment', element: <AbandonedCartManagment /> },
    // { path: '/AbandonedDetails', element: <AbandonedDetails /> },
    { path: '/MyAccount', element: <MyAccount /> },
    { path: '/PaymentManagement', element: <PaymentManagement /> },
    { path: '/PaymentDetails', element: <PaymentDetails /> },
    { path: '/SalesAnalytics', element: <SalesAnalytics /> },
    // { path: '/Notification', element: <Notification /> },
    // { path: '/ContentManagement', element: <ContentManagement /> },
    // { path: '/EditContentManagement', element: <EditContentManagement /> },
    // { path: '/AddProductCatalogue', element: <AddProductCatalogue /> },
  ];
  
  export default routes;
  