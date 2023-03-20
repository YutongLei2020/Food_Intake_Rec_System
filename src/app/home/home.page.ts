import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RecommendationPage2Page } from '../recommendation-page2/recommendation-page2.page';
import { DatePipe } from '@angular/common';
import { UserService } from '../api/user.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, datepipe:DatePipe, public userService:UserService) { 
    this.calories = RecommendationPage2Page.curr_calories;
    console.log('hahaha', this.calories, 'nonono', RecommendationPage2Page.curr_calories)
    this.curr_time = datepipe.transform((new Date), 'MM/dd/yyyy')
    console.log(this.curr_time)
  }
  goal = 0;
  curr_time: any;
  calories = RecommendationPage2Page.curr_calories;

  ionViewWillEnter() {
    this.calories = RecommendationPage2Page.curr_calories;
    this.update_goal()
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


  update_goal(){
    var str1 = '?email=';
    var str2 = str1.concat(String(LoginPage.current_email));
    this.userService.LoadGoal(str2).subscribe((return_data) => {
      this.goal = Number(return_data);
      console.log('update goal', return_data)
    })
  }

}
