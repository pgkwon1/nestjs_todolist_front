export interface IRootReducer {
  memberReducer: IMemberReducer;
  alertReducer: IAlertReducer;
}

interface IMemberReducer {
  isLogin: boolean;
  userId: string;
}

interface IAlertReducer {
  isShow: boolean;
  message: string;
  isSuccess: boolean;
}
