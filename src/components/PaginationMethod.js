import { useDispatch } from "react-redux";
import { GetUserManagementSlice } from "../redux/features/UserManagementSlice";
import { DeleteNotificationSlice, GetNotificationSlice } from "../redux/features/NotificationManagement";

export const useNotification = () => {

    const dispatch = useDispatch();

     const handlePagesIncrease = ({handleArrforPage,pagination,setHandleArrforPage}) => {
        if (handleArrforPage + 3 <= pagination?.totalPages) {
          setHandleArrforPage((prev) => prev + 3);
        }
      };
    
      const handlePagesDecrease = ({handleArrforPage,pagination,setHandleArrforPage}) => {
        if (handleArrforPage > 2) {
          setHandleArrforPage((prev) => prev - 3);
        }
      };

     const handleReset = ({getSearch,setGetSearch,setData}) => {
        if (
          [
            getSearch.search.length,
            getSearch.fromDate.length,
            getSearch.toDate.length,
          ].every((item) => item === 0)
        ) {
          return;
        }
    
        setGetSearch({
          search: "",
          fromDate: "",
          toDate: "",
          page: 1,
        });
    
        let dataSet = "";
        for (const [name, searchData] of Object.entries({
          search: "",
          fromDate: "",
          toDate: "",
          page: 1,
        })) {
          dataSet = `${dataSet}${name}=${searchData}&`;
        }
    
        dispatch(GetNotificationSlice(dataSet)).then((res) => {
          setData(res?.payload?.data?.notification);
          console.log(res?.payload?.data?.notification);
        });
      };

     const handleApply = ({getSearch,setGetSearch,setData}) => {
          if (
            ![
              getSearch.search.length,
              getSearch.fromDate.length,
              getSearch.toDate.length,
            ].some((item) => item > 0)
          ) {
            return;
          }
      
          let dataSet = "";
          for (const [name, searchData] of Object.entries(getSearch)) {
            dataSet = `${dataSet}${name}=${searchData}&`;
          }
      
          dispatch(GetNotificationSlice(dataSet)).then((res) => {
            setData(res?.payload?.data?.notification);
            console.log(res?.payload?.data?.notification);
          });
      };
      
      const handleDelete = ({setData,getSearch,dataFoHold}) => {
        console.log("id:", dataFoHold);
        const id = dataFoHold.deleteId;
    
        let dataSet = "";
        for (const [name, searchData] of Object.entries(getSearch)) {
          dataSet = `${dataSet}${name}=${searchData}&`;
        }
    
        dispatch(DeleteNotificationSlice(id)).then((res) => {
          dispatch(GetNotificationSlice(dataSet)).then((res) => {
            setData(res?.payload?.data?.notification);
            // console.log(res?.payload?.data?.notification)
          });
        });
      };
       

    return {handlePagesDecrease,handlePagesIncrease,handleReset,handleApply,handleDelete}
}