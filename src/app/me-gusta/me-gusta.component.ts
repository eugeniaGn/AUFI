import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-me-gusta',
  templateUrl: './me-gusta.component.html',
  styleUrls: ['./me-gusta.component.scss'],
})
export class MeGustaComponent  implements OnInit {

  outfits: any[] = [];
  constructor() {
    if (localStorage.getItem('likes') != null) {
      this.outfits = JSON.parse(localStorage.getItem('likes')!);
    }
  }

  ngOnInit() {}

}
