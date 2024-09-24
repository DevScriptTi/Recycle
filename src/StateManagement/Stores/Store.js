import { configureStore } from "@reduxjs/toolkit";
import wilayasSlice from '../Slices/Extras/WilayasSlice';
import userSlice from '../Slices/UsersSlices/UserSlices'
import JoinRequestsSlices from '../Slices/JoinRequestsSlices/JoinREquestsSlices'
import VendorsSlices from "../Slices/VendorsSlices/VendorsSlices";
import AdminsSlices from  "../Slices/AdminsSlices/AdminsSlices"
import ShippersSlices from "../Slices/ShippersSlices/ShippersSlices";
import ReferencesSlices from "../Slices/ReferencesSlices/ReferencesSlices";
import ProductCategoriesSlices from "../Slices/Extras/ProductCategoriesSlices";
import ShipppersJoinRequestsSlices from '../Slices/ShippersJoinRequestsSlices/ShippersJoinRequestsSlices'
import OfficesSlices from "../Slices/Offices/OfficesSlices";
import OrdersSlices from "../Slices/OrderSlices/OrdersSlices";
import NotificationSlices from "../Slices/Extras/NotificationSlices";
import MapSlices from "../Slices/Extras/MapSlices";
import OrdersRequestsSlices from "../Slices/OrdersRequestsSlices/OrdersRequestsSlices";
import DemandsSlices from "../Slices/newSlices/DemandsSlices/DemandsSlices";
import SparePartCategoriesSlices from "../Slices/Extras/SparePartCategoriesSlices";
import QuantitiesSlices from "../Slices/newSlices/QuantitiesSlices/QuantitiesSlices";
import PrimaryMaterCategoriesSlices from "../Slices/Extras/PrimaryMaterCategoriesSlices";
import PrimaryMatersCategoriesPaginationSlices from "../Slices/newSlices/PrimaryMatersCategoriesPagination/PrimaryMatersCategoriesPaginationSlices";
import PrimaryMatersPaginationSlices from "../Slices/newSlices/PrimaryMatersPagination/PrimaryMatersPaginationSlices";
import SparePartsCategoriesPaginationSlices from "../Slices/newSlices/SparePartsCategoriesPagination/SparePartsCategoriesPaginationSlices";
import SparePartsPaginationSlices from "../Slices/newSlices/SparePartsPagination/SparePartsPaginationSlices";

export const store = configureStore({
    reducer:{
        wilayas : wilayasSlice,
        user : userSlice ,
        joinRequests :  JoinRequestsSlices ,
        admins : AdminsSlices ,
        shippers : ShippersSlices ,
        vendors : VendorsSlices ,
        references : ReferencesSlices ,
        shippersJoinRequests : ShipppersJoinRequestsSlices ,
        productCategories : ProductCategoriesSlices ,
        offices : OfficesSlices ,
        orders : OrdersSlices ,
        notifications : NotificationSlices ,
        maps : MapSlices ,
        ordersRequests : OrdersRequestsSlices,
        //==========================
        demands : DemandsSlices,
        sparePartCategories : SparePartCategoriesSlices,
        quantities : QuantitiesSlices,
        primaryMaterCategories : PrimaryMaterCategoriesSlices ,
        // ==========================
        PrimaryMatersCategoriesPagination : PrimaryMatersCategoriesPaginationSlices ,
        PrimaryMatersPagination : PrimaryMatersPaginationSlices ,
        SparePartsCategoriesPagination : SparePartsCategoriesPaginationSlices ,
        SparePartsPagination : SparePartsPaginationSlices ,

    }
})