import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, map } from 'rxjs';
import { ISystemError } from '../shared/models/systemerror';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor(private translateService: TranslateService) {}

  public handleError(err: any): Observable<ISystemError> {
    if (err.status === 409) {
      return this.handleSystemError(err.error);
    }
    return of({
      translationKey: '',
      translatedValue: err.toString(),
    } as ISystemError);
  }

  private handleSystemError(err: ISystemError): Observable<ISystemError> {
    const subst =
      err.substitutions && err.substitutions.length > 0
        ? err.substitutions?.reduce(
            (result, { field, value }) => ({ ...result, [field]: value }),
            {}
          )
        : undefined;

    return this.translateService.get(err.translationKey, subst).pipe(
      map((res) => {
        return {
          translationKey: err.translationKey,
          translatedValue: res,
          substitutions: err.substitutions,
        } as ISystemError;
      })
    );
  }
}
