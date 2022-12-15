import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreatePlayerDto, IPlayerDto } from '../state/players/players-models';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:7237/api';
  }

  public get(sessionId: string): Observable<Array<IPlayerDto>> {
    const url = `${this.baseUrl}/players?sessionId=${sessionId}`;
    return this.http.get<Array<IPlayerDto>>(url);
  }
  public post(dto: ICreatePlayerDto): Observable<IPlayerDto> {
    const url = `${this.baseUrl}/players`;
    return this.http.post<IPlayerDto>(url, dto);
  }
}
