import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-recommendation-page1',
  templateUrl: './recommendation-page1.page.html',
  styleUrls: ['./recommendation-page1.page.scss'],
})
export class RecommendationPage1Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  recommendFood()
  {
    this.router.navigate(['/tabs/recommendation-page2'])
  }
}
