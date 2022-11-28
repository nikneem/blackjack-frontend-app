import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  public width: string = '50px;';
  public height: string = '50px;';

  constructor() {}

  ngOnInit(): void {}
}
