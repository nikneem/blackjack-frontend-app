import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import {
  ISessionCreateDto,
  ISessionDetailsDto,
} from '../state/session/session-models';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://endpoint-url';
  }

  public create(dto: ISessionCreateDto): Observable<ISessionDetailsDto> {
    const url = `${this.baseUrl}/sessions`;

    const mockResult = {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'mocks session',
      code: '123456',
      isOwner: true,
    };

    return of(mockResult).pipe(delay(2500));

    return this.http.post<ISessionDetailsDto>(url, dto);
  }
}
