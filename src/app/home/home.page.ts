import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecommendationPage2Page } from '../recommendation-page2/recommendation-page2.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { 
    this.calories = RecommendationPage2Page.curr_calories;
    console.log('hahaha', this.calories, 'nonono', RecommendationPage2Page.curr_calories)
  }

  calories = RecommendationPage2Page.curr_calories;

  ionViewWillEnter() {
    this.calories = RecommendationPage2Page.curr_calories;
    console.log('entered')
  }

  ngOnInit() {
  }

  confirm()
  {
    console.log(this.calories);
    console.log(RecommendationPage2Page.curr_calories);
    console.log(RecommendationPage2Page.curr_foods);
    this.router.navigate(['/confirmation'])
  }

}
