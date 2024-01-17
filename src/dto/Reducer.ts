export interface IRootReducer {
  memberReducer: IMemberReducer;
}

interface IMemberReducer {
  isLogin: boolean;
  userId: string;
}
