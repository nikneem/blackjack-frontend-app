import { IPlayerDto } from './players-models';

export interface IPlayersState {
  players?: Array<IPlayerDto>;
  dealer?: IPlayerDto;
  isLoading: boolean;
}

export const INITIAL_PLAYERS_STATE: IPlayersState = {
  isLoading: false,
};
