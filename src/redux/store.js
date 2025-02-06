import { configureStore } from "@reduxjs/toolkit";
import  UserManagementSlice  from "./features/UserManagementSlice";
import BannerManagementSlice from './features/BannerManagementSlice'
import ProductCategorySlice from './features/ProductCategorySlice'
import ProductCatalogueSlice from './features/ProductCatalogueSlice'
import CityManagementSlice from './features/CityManagementSlice'
import BookingManagementSlice from './features/BookingManagementSlice'
import PaymentManagementSlice from './features/PaymentManagementSlice'
import AbandonedCartManagmentSlice from './features/AbandonedCartManagmentSlice'
import AuthSlice from './features/AuthSlice'
import ContentManagementSlice from './features/ContentManagementSlice'
import NotifcationManagementSlice from './features/NotificationManagement'

const store = configureStore({
  reducer: {
    userManagement: UserManagementSlice,
    bannerManagement:BannerManagementSlice,
    ProductCategory:ProductCategorySlice,
    ProductCatalogue:ProductCatalogueSlice,
    CityManagement:CityManagementSlice,
    BookingManagement:BookingManagementSlice,
    PaymentManagement:PaymentManagementSlice,
    AbandonedCartManagment:AbandonedCartManagmentSlice,
    Auth:AuthSlice,
    ContentManagemnt:ContentManagementSlice,
    Notification:NotifcationManagementSlice
    },
  });
  
  export default store;