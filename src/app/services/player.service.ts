import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Player } from '../interfaces/player.interface';
const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersUrl = 'api/players/';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[] | never> {
    return this.http.get<Player[]>(this.playersUrl).pipe(
      catchError(this.handleError)
    )
  }

  getPlayerById(id: string): Observable<Player[] | never> {
    return this.http.get<Player[]>(`${this.playersUrl}?id=${id}`).pipe(
      catchError(this.handleError)
    )
  }

  searchPlayers(objectSearch: Partial<Player>): Observable<Player[]> {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(objectSearch)) {
      params = params.set(key, value);
    }
    console.log(params.toString());
    return this.http.get<Player[]>(`${this.playersUrl}?${params.toString()}`).pipe(
      catchError(this.handleError)
    )
  }

  updatePlayer(player: Player): Observable<Player> {
    console.log('updatePlayer', player);
    return this.http.put<Player>(`${this.playersUrl}`, player, cudOptions);
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => error);
  }
}
