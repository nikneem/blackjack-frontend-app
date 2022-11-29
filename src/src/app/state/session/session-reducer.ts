import { createReducer, on, Action } from '@ngrx/store';
import { IUserState } from '../user/user-state';
import { sessionCreate, sessionCreatedOk } from './session-actions';
import { INITIAL_SESSION_STATE, ISessionState } from './session-state';

const _sessionsReducer = createReducer(
  INITIAL_SESSION_STATE,
  on(sessionCreate, (state) => ({
    ...state,
    isCreating: true,
  })),
  on(sessionCreatedOk, (state, { dto }) => ({
    ...state,
    isCreating: false,
    isLoading: false,
    activeSession: dto,
  }))
);

export function sessionsReducer(
  state: ISessionState | undefined,
  action: Action
) {
  return _sessionsReducer(state, action);
}
