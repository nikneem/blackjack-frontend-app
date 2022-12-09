import { createAction, props } from '@ngrx/store';
import { ISystemError } from 'src/app/shared/models/systemerror';
import { IPlayerDto } from './players-models';

export const playerRetrieve = createAction(
  '[Players] Retrieve',
  props<{ sessionId: string }>()
);
export const playerRetrievedOk = createAction(
  '[Players] Retrieved OK',
  props<{ dto: Array<IPlayerDto> }>()
);
export const playerRetrieveFailed = createAction(
  '[Players] Retrieve Failed',
  props<{ error: ISystemError }>()
);
