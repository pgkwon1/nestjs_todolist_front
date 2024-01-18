import { IRootReducer } from "@/dto/Reducer";
import { showAlert } from "@/store/reducers/alert.reducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Footer() {
  const { isShow, isSuccess, message } = useSelector(
    (state: IRootReducer) => state.alertReducer
  );
  const classes = {
    success: "bg-green-100 text-green-700 border-green-500",
    fail: "bg-red-100 text-red-700 border-red-500",
  };
  const dispatch = useDispatch();
  // alert창 표시 후 6초후에 숨김.
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        showAlert({
          isShow: false,
          message: "",
          isSucces: false,
        })
      );
    }, 6000);
  }, [isShow]);
  return (
    <div className="relative">
      {isShow ? (
        <div
          className={` ${
            isSuccess ? classes.success : classes.fail
          }  w-40 rounded fixed left-2 bottom-10 border-l-4 bg-red-100 p-4`}
          role="alert"
        >
          {!isSuccess ? <p className="font-bold">오류 발생!</p> : ""}
          <p>{message}</p>
        </div>
      ) : (
        <></>
      )}
      <div className="text-white text-center min-h-80 font-6">
        2023 copyright pgkwon1.
      </div>
    </div>
  );
}
