import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-recommendation-page2',
  templateUrl: './recommendation-page2.page.html',
  styleUrls: ['./recommendation-page2.page.scss'],
})
export class RecommendationPage2Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
    
  back()
  {
    this.router.navigate(['/tabs/recommendation-page1'])
  }

}
