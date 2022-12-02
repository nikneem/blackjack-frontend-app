import { createReducer, on, Action } from '@ngrx/store';
import { IUserState } from '../user/user-state';
import {
  sessionCreate,
  sessionCreatedOk,
  sessionCreateFailed,
  sessionJoin,
  sessionJoinedOk,
  sessionJoinFailed,
  sessionRetrieve,
  sessionRetrievedOK,
  sessionRetrieveFailed,
} from './session-actions';
import { INITIAL_SESSION_STATE, ISessionState } from './session-state';

const _sessionsReducer = createReducer(
  INITIAL_SESSION_STATE,
  on(sessionCreate, (state) => ({
    ...state,
    isCreating: true,
    createErrorMessage: undefined,
  })),
  on(sessionCreatedOk, (state, { dto }) => ({
    ...state,
    isLoading: false,
    isCreating: false,
    isJoining: false,
    activeSession: dto,
  })),
  on(sessionCreateFailed, (state, { error }) => ({
    ...state,
    isLoading: false,
    isCreating: false,
    isJoining: false,
    createErrorMessage: error.translatedValue,
  })),
  on(sessionJoin, (state) => ({
    ...state,
    isJoining: true,
    joinErrorMessage: undefined,
  })),
  on(sessionJoinedOk, (state, { dto }) => ({
    ...state,
    isLoading: false,
    isCreating: false,
    isJoining: false,
    activeSession: dto,
  })),
  on(sessionJoinFailed, (state, { error }) => ({
    ...state,
    isLoading: false,
    isCreating: false,
    isJoining: false,
    joinErrorMessage: error.translatedValue,
  })),
  on(sessionRetrieve, (state) => ({
    ...state,
    isLoading: true,
    loadErrorMessage: undefined,
  })),
  on(sessionRetrievedOK, (state, { dto }) => ({
    ...state,
    isLoading: false,
    isCreating: false,
    isJoining: false,
    activeSession: dto,
  })),
  on(sessionRetrieveFailed, (state, { error }) => ({
    ...state,
    isLoading: false,
    isCreating: false,
    isJoining: false,
    loadErrorMessage: error.translatedValue,
  }))
);

export function sessionsReducer(
  state: ISessionState | undefined,
  action: Action
) {
  return _sessionsReducer(state, action);
}
