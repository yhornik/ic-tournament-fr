import { Component, OnInit } from '@angular/core';
import { PlayerService } from './services/player.service';
import { matchesPermutation } from './utils/matches-permutation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Interclub Tournament France';

  constructor(private service: PlayerService) {
  }

  ngOnInit(): void {
    console.log('');
    // console.log(matchesPermutation(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']));
  }

}
