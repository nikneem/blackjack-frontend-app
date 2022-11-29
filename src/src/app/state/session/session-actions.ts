import { createAction, props } from '@ngrx/store';
import { ISessionCreateDto, ISessionDetailsDto } from './session-models';

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
  props<{ errorMessage: string }>()
);
