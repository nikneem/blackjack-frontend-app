import { ISessionDetailsDto } from './session-models';

export interface ISessionState {
  activeSession?: ISessionDetailsDto;
  isLoading: boolean;
  loadErrorMessage?: string;
  isCreating: boolean;
  createErrorMessage?: string;
  isJoining: boolean;
  joinErrorMessage?: string;
}

export const INITIAL_SESSION_STATE: ISessionState = {
  isLoading: false,
  isJoining: false,
  isCreating: false,
};
