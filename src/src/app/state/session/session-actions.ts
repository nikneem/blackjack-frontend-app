import { createAction, props } from '@ngrx/store';
import { ISystemError } from 'src/app/shared/models/systemerror';
import {
  ISessionCreateDto,
  ISessionDetailsDto,
  ISessionJoinDto,
} from './session-models';

export const sessionCreate = createAction(
  '[Sessions] Create',
  props<{ dto: ISessionCreateDto }>()
);
export const sessionCreatedOk = createAction(
  '[Sessions] Created OK',
  props<{ dto: ISessionDetailsDto }>()
);
export const sessionCreateFailed = createAction(
  '[Sessions] Create Failed',
  props<{ error: ISystemError }>()
);

export const sessionJoin = createAction(
  '[Sessions] Join',
  props<{ dto: ISessionJoinDto }>()
);
export const sessionJoinedOk = createAction(
  '[Sessions] Joined OK',
  props<{ dto: ISessionDetailsDto }>()
);
export const sessionJoinFailed = createAction(
  '[Sessions] Join Failed',
  props<{ error: ISystemError }>()
);

export const sessionRetrieve = createAction(
  '[Sessions] Retrieve',
  props<{ tableCodeOrId: string; userId: string }>()
);
export const sessionRetrievedOK = createAction(
  '[Sessions] Retrieved OK',
  props<{ dto: ISessionDetailsDto }>()
);
export const sessionRetrieveFailed = createAction(
  '[Sessions] Retrieve Failed',
  props<{ error: ISystemError }>()
);
