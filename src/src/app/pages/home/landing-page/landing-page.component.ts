import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    trigger('isLoaded', [
      state(
        'false',
        style({
          filter: 'blur(0rem)',
        })
      ),
      state(
        'true',
        style({
          filter: 'blur(0.5rem)',
        })
      ),
      transition('false <=> true', [animate('1s')]),
    ]),
  ],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  public userIsLoaded: boolean = false;
  public isLoading: boolean = true;
  private userIdSubscription?: Subscription;
  constructor(private store: Store<IAppState>) {}
  ngOnInit(): void {
    this.userIdSubscription = this.store
      .select((str) => str.userState)
      .subscribe((val) => {
        if (val) {
          this.isLoading = val.isRefreshing;
          this.userIsLoaded = val.userId !== undefined;
        }
      });
  }
  ngOnDestroy(): void {}
}
