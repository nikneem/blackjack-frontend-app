import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from './state/app.state';
import { userIdentify } from './state/user/user-actions';
import { IUserState } from './state/user/user-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'blackjack';

  private userIdSubscription?: Subscription;
  private userState?: IUserState;
  private userFromLocalStorage?: string;

  constructor(private store: Store<IAppState>) {
    const userFromLocalStorage = localStorage.getItem('blackjack-user-id');
    if (userFromLocalStorage) {
      this.userFromLocalStorage = userFromLocalStorage;
    }
  }

  ngOnInit(): void {
    this.userIdSubscription = this.store
      .select((str) => str.userState)
      .subscribe((val) => (this.userState = val));
    this.store.dispatch(userIdentify({ userId: this.userFromLocalStorage }));
  }
}
