import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
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
  private supportedLanguages: Array<string> = ['en', 'nl'];
  private defaultLanguage: string = 'en';

  constructor(
    private translate: TranslateService,
    private store: Store<IAppState>
  ) {
    const userFromLocalStorage = localStorage.getItem('blackjack-user-id');
    if (userFromLocalStorage) {
      this.userFromLocalStorage = userFromLocalStorage;
    }
    this.setupMultilanguage();
  }

  private setupMultilanguage() {
    this.translate.addLangs(['en', 'nl']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.previousSelectedLanguage());
  }

  private previousSelectedLanguage(): string {
    let selectedLanguage = localStorage.getItem('blackjack-language');
    if (!selectedLanguage) {
      selectedLanguage = this.determineBrowserLanguages();
    }
    return selectedLanguage;
  }

  private determineBrowserLanguages(): string {
    let preferredLanguage: string | undefined = undefined;
    navigator.languages.forEach((element) => {
      if (!preferredLanguage && this.supportedLanguages.indexOf(element) >= 0) {
        preferredLanguage = element;
      }
    });
    return preferredLanguage || this.defaultLanguage;
  }

  ngOnInit(): void {
    this.userIdSubscription = this.store
      .select((str) => str.userState)
      .subscribe((val) => (this.userState = val));
    this.store.dispatch(userIdentify({ userId: this.userFromLocalStorage }));
  }
}
