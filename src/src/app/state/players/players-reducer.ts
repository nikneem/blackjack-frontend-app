import { Action, createReducer, on } from '@ngrx/store';
import { playerRetrieve, playerRetrievedOk } from './players-actions';
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
    players: dto,
  }))
);

export function playersReducer(
  state: IPlayersState | undefined,
  action: Action
) {
  return _playersReducer(state, action);
}
