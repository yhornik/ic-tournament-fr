import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { players } from '../data-db/players';
import { Player } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }

  createDb() {
    return { players };
  }


}
