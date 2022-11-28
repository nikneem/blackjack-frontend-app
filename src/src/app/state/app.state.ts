import { usersReducer } from './user/user-reducer';
import { INITIAL_USER_STATE, IUserState } from './user/user-state';

export interface IAppState {
  userState: IUserState;
}
export const INITIAL_APP_STATE: IAppState = {
  userState: INITIAL_USER_STATE,
};

export const reducers = {
  userState: usersReducer,
};
