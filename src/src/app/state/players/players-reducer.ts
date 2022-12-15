import { Action, createReducer, on } from '@ngrx/store';
import {
  playerCreate,
  playerCreatedOk,
  playerRetrieve,
  playerRetrievedOk,
} from './players-actions';
import { IPlayerDto } from './players-models';
import { INITIAL_PLAYERS_STATE, IPlayersState } from './players-state';

const _playersReducer = createReducer(
  INITIAL_PLAYERS_STATE,
  on(playerRetrieve, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(playerRetrievedOk, (state, { dto }) => ({
    ...state,
    isLoading: false,
    players: dto.filter((plyr) => !plyr.isDealer),
    dealer: dto.find((plyr) => plyr.isDealer),
  })),
  on(playerCreate, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(playerCreatedOk, (state, { dto }) => playerCreatedHandler(state, dto))
);

function playerCreatedHandler(
  state: IPlayersState,
  payload: IPlayerDto
): IPlayersState {
  const copyState: IPlayersState = Object.assign({}, state);

  if (payload.isDealer) {
    copyState.dealer = payload;
  } else {
    let playersList = copyState.players
      ? new Array<IPlayerDto>(...copyState.players)
      : new Array<IPlayerDto>();

    playersList.push(payload);
    copyState.players = playersList;
  }
  copyState.isLoading = false;
  return copyState;
}

export function playersReducer(
  state: IPlayersState | undefined,
  action: Action
) {
  return _playersReducer(state, action);
}
