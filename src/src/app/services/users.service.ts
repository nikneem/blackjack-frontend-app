import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDetailsDto } from '../state/user/user-models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl =
      'https://blckjck-user-prod-neu-aca.delightfulsand-07ec4153.northeurope.azurecontainerapps.io/api';
  }

  public identify(userId?: string): Observable<IUserDetailsDto> {
    const userIdAddon = userId ? `/${userId}` : '';
    const url = `${this.baseUrl}/users${userIdAddon}`;
    return this.http.get<IUserDetailsDto>(url);
  }
}
