import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { IPlayerDto } from 'src/app/state/players/players-models';
import { IPlayerCard } from '../../models/playercard';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [
    trigger('playerValue', [
      state('false', style({ opacity: 0.8, fontSize: '1rem' })),
      state('true', style({ opacity: 1, fontSize: '2rem' })),
      transition('false => true', animate('500ms ease-in')),
      transition('true => false', animate('1000ms ease-out')),
    ]),
  ],
})
export class PlayerComponent implements OnInit {
  private playersStateSubscription?: Subscription;

  @Input() public playerId?: string;

  public player?: IPlayerDto;
  public sumOfCards: number = 0;
  public cards: Array<IPlayerCard>;
  public animate: boolean = false;

  constructor(private store: Store<IAppState>) {
    this.cards = new Array<IPlayerCard>();
    this.cards.push({
      value: 11,
      description: 'ace-of-diamonds',
    });
    this.cards.push({
      value: 10,
      description: 'ten-of-spades',
    });

    this.calculateSum();
    setTimeout(() => this.addCard(), 2500 + Math.floor(Math.random() * 2500));
  }

  private calculateSum() {
    this.sumOfCards = this.cards.reduce((acc, obj) => {
      return acc + obj.value;
    }, 0);
  }

  private addCard() {
    this.cards.push({
      value: 8,
      description: 'eight-of-hearts',
    });
    this.calculateSum();
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
    }, 500);
    // if (this.cards.length < 7) {
    //   setTimeout(() => this.addCard(), 2500 + Math.floor(Math.random() * 2500));
    // }
  }

  ngOnInit(): void {
    this.playersStateSubscription = this.store
      .select((str) => str.playersState)
      .subscribe((val) => {
        if (val.players) {
          this.player = val.players.find((p) => p.id == this.playerId);
        }
      });
  }
}
