import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeCard } from '../../../model/home-card';

@Component({
  selector: 'app-home-button-card',
  templateUrl: './home-button-card.component.html',
  styleUrls: ['./home-button-card.component.css']
})
export class HomeButtonCardComponent implements OnInit {

  @Input("card") card: HomeCard;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  redirect() {
    this.router.navigate([this.card.route]);
  }

}
