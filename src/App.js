import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import SideNavBar from "./common/SideNav/SideNavBar";
import Header from "./common/Header/Header";
import routes from "./router/router";
import CreateCity from "./pages/City Management/CreateCity/CreateCity";
import CityManagement from "./pages/City Management/CityManagement";
import UpdateCity from "./pages/City Management/UpdateCityManagement/UpdateCity";
import ProductCatalogueManagement from "./pages/product-catalogue-management/ProductCatalogueManagement";
import ProductForCommanOutelet from "./pages/product-catalogue-management/Product For Comman Outlet/ProductForCommanOutelet";
import AddProductCatalogue from "./pages/product-catalogue-management/Product-catalogue Add Product/AddProductCatalogue";
import ProductCatalogueDetails from "./pages/product-catalogue-management/product-catalogue-details/ProductCatalogueDetails";
import OrderManagment from "./pages/order-managment/OrderManagment";
import ActiveBooking from "./pages/order-managment/Active Booking/ActiveBooking";
import OrderCompleted from "./pages/order-managment/order-completed/OrderCompleted";
import OrderReturnd from "./pages/order-managment/order-returnd/OrderReturnd";
import ConfirmedBooking from "./pages/order-managment/Active Booking/Confirmed Booking/ConfirmedBooking";
import InTransitOrders from "./pages/order-managment/Active Booking/In-Transit-Orders/InTransitOrders";
import OrderActiveConfirmDetails from "./pages/order-managment/order-active-confirm-details/OrderActiveConfirmDetails";
import OrderActiveInTransitDetails from "./pages/order-managment/order-active-in-transit-details/OrderActiveInTransitDetails";
import AddDecoratorPartnerDetails from "./pages/order-managment/Active Booking/Confirmed Booking/AddDecoratorPartnerDetails";
import CancelOrder from "./pages/order-managment/Active Booking/Confirmed Booking/CancelOrder";
import AbandonedCartOutletCommon from "./pages/abandoned-cart-managment/AbandonedCartOutlet.jsx/AbandonedCartOutletCommon";
import AbandonedCartManagment from "./pages/abandoned-cart-managment/AbandonedCartManagment";
import AbandonedDetails from "./pages/abandoned-cart-managment/abandoned-details/AbandonedDetails";
import AbandonedCartNotify from "./pages/abandoned-cart-managment/abandoned-Cart-Notify Management/AbandonedCartNotify";
import ContentManagement from "./pages/content-Management/ContentManagement";
import EditContentManagement from "./pages/content-Management/EditContentManagement";
import ContentManagementOutlet from "./pages/content-Management/ContentManagementOutlet";
import ProductCatalogueEdit from "./pages/product-catalogue-management/Prouduct-Catalogue Edit/ProductCatalogueEdit";
import Notification from "./pages/notification/Notification";
import AddNotification from "./pages/notification/Add Notification/AddNotification";
import UpdateNotification from "./pages/notification/Update Notification/UpdateNotification";
import ProductCategory from "./pages/product-category/ProductCategory";
import AddCategory from "./pages/product-category/Add Category/AddCategory";
import SubCategoryProduct from "./pages/product-category/product-sub-category/SubCategoryProduct";
import AddSubCategory from "./pages/product-category/product-sub-category/Add Sub Category/AddSubCategory";
import ProductCategoryOutlet from "./pages/product-category/ProductCategoryOutlet";
import EditCategory from "./pages/product-category/Edit Category/EditCategory";
import BannerManagement from "./pages/Banner Management/BannerManagement";
import TopBanners from "./pages/Banner Management/Top Banner/TopBanners";
import DealBanners from "./pages/Banner Management/Deal Banners/DealBanners";
import AddNewBanner from "./pages/Banner Management/Add Banner/AddNewBanner";
import AddDealsBanner from "./pages/Banner Management/Add Deals Banner/AddDealsBanner";
import UsersManagement from "./pages/User Management/UsersManagement";
import UserManagementOutlet from "./pages/User Management/UserManagementOutlet";
import UsersListDetails from "./pages/User Management/User Management detail page/UsersListDetails";
import BasicPersonal from "./pages/User Management/User Management detail page/BasicPersonal/BasicPersonal";
import BookingHistory from "./pages/User Management/User Management detail page/BookingHistory/BookingHistory";
import UserHistory from "./pages/User Management/User Management detail page/BookingHistory/User History/UserHistory";
import EditBanners from "./pages/Banner Management/Edit Banners/EditBanners";
import EditDealBanner from "./pages/Banner Management/Edit Deal Banner/EditDealBanner";

function App() {
  const location = useLocation().pathname;

  const RestrictedRoute = ["/login", "/OTPVarification"].includes(location);

  return (
    <>
      {!RestrictedRoute && (
        <>
          <Header />
          <SideNavBar />
        </>
      )}

      <Routes>
        {/* Plane Route */}
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* User Management */}
        <Route path="/UsersManagement" element={<UserManagementOutlet />}>
          <Route index element={<UsersManagement />} />
          <Route path="UsersListDetails" element={<UsersListDetails />}>
            <Route index element={<BasicPersonal />} />
            <Route path=":id/BasicPersonal" element={<BasicPersonal />} />
            <Route path=":id/BookingHistory" element={<BookingHistory />}>
              <Route path="UserHistory" element={<UserHistory />} />
            </Route>
          </Route>
        </Route>

        <Route path="/CityManagement" element={<CityManagement />}>
          <Route path="CreateCity" element={<CreateCity />} />
          <Route path="UpdateCity" element={<UpdateCity />} />
        </Route>

        {/*Banner Management */}
        <Route path="/BannerManagement" element={<BannerManagement />}>
          <Route index element={<TopBanners />} />
          <Route path="TopBanner" element={<TopBanners />}>
            <Route path="AddBanner" element={<AddNewBanner />} />
            <Route path="EditBanners" element={<EditBanners />} />
          </Route>
          <Route path="DealBanner" element={<DealBanners />}>
            <Route path="AddDealsBanner" element={<AddDealsBanner />} />
            <Route path="EditDealsBanner" element={<EditDealBanner />} />
          </Route>
        </Route>

        {/*Product Category*/}
        <Route path="/ProductCategory" element={<ProductCategoryOutlet />}>
          {/*Sub category */}
          <Route index element={<ProductCategory />} />
          <Route path="/ProductCategory" element={<ProductCategory />}>
            <Route path="AddCategory" element={<AddCategory />} />
            <Route path="ProductEdit/:id" element={<EditCategory />} />
          </Route>
          <Route path="SubCategoryProduct/:id" element={<SubCategoryProduct />}>
            <Route path="AddSubCategory" element={<AddSubCategory />} />
          </Route>
        </Route>

        {/* product catalogue management */}
        <Route
          path="/ProductCatalogueManagement/:page"
          element={<ProductForCommanOutelet />}
        >
          <Route index element={<ProductCatalogueManagement />} />
          <Route index element={<ProductCatalogueManagement />} />
          <Route path="AddProductCatalogue" element={<AddProductCatalogue />} />
          <Route
            path="ProductCatalogueEdit/:id"
            element={<ProductCatalogueEdit />}
          />
          <Route
            path="ProductCatalogueDetails/:id"
            element={<ProductCatalogueDetails />}
          />
        </Route>

        {/* Booking management */}
        <Route path="/OrderManagment" element={<OrderManagment />}>
          <Route
            index
            element={<Navigate to="ActiveBooking/ConfirmedBooking" replace />}
          />
          <Route index element={<ActiveBooking />} />
          <Route path="ActiveBooking" element={<ActiveBooking />}>
            <Route index element={<ConfirmedBooking />} />
            <Route path="ConfirmedBooking" element={<ConfirmedBooking />}>
              <Route
                path="AddDecoratorPartnerDetails/:id"
                element={<AddDecoratorPartnerDetails />}
              />
              <Route path="CancelOrder/:id" element={<CancelOrder />} />
            </Route>
            <Route path="InTransitOrders" element={<InTransitOrders />} />
          </Route>
          <Route path="OrderCompleted" element={<OrderCompleted />} />
          <Route path="OrderReturnd" element={<OrderReturnd />} />
          <Route
            path="OrderActiveConfirmDetails"
            element={<OrderActiveConfirmDetails />}
          />
          <Route
            path="OrderActiveInTransitDetails"
            element={<OrderActiveInTransitDetails />}
          />
        </Route>

        {/* Abandoned Cart Managment */}
        <Route
          path="/AbandonedCartManagment"
          element={<AbandonedCartOutletCommon />}
        >
          <Route index element={<AbandonedCartManagment />} />
          <Route path="AbandonedDetails" element={<AbandonedDetails />} />
          <Route path="AbandonedCartNotify" element={<AbandonedCartNotify />} />
        </Route>
        {/* Content Management */}
        <Route path="/ContentManagement" element={<ContentManagementOutlet />}>
          <Route index element={<ContentManagement />} />
          <Route path="ContentManagement" element={<ContentManagement />} />
          <Route
            path=":id/EditContentManagement"
            element={<EditContentManagement />}
          />
        </Route>

        {/* Notification Management */}
        <Route path="/Notification" element={<Notification />}>
          <Route path="AddNotification" element={<AddNotification />} />
          <Route path="UpdateNotification" element={<UpdateNotification />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
