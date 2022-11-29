import { ISessionDetailsDto } from './session-models';

export interface ISessionState {
  activeSession?: ISessionDetailsDto;
  isLoading: boolean;
  isCreating: boolean;
}

export const INITIAL_SESSION_STATE: ISessionState = {
  isLoading: false,
  isCreating: false,
};
