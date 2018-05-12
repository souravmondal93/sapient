import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dogs: Array<number> = [1, 2, 3, 4];

  constructor() { }

  ngOnInit() {
  }

}
