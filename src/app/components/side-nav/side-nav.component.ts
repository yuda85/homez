import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  private _isOpen: boolean = false;

  @Input() set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
  }

  get isOpen() {
    return this._isOpen;
  }
  constructor() {}

  ngOnInit(): void {}
}
