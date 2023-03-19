import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-recommendation-page2',
  templateUrl: './recommendation-page2.page.html',
  styleUrls: ['./recommendation-page2.page.scss'],
})

@Injectable({
  providedIn: 'root'
})



export class RecommendationPage2Page implements OnInit {
  static curr_restaurant: any;

  constructor(private router: Router, public userService:UserService, private formBuilder: FormBuilder,
    private modalContriller: ModalController, private navCtrl: NavController, private plt: Platform) {
      this.load_restaurant()
      this.food1_valid = false
      this.test()
     }
  restaurants: any;
  foods: any;
  foods2: any;
  r_display: any;
  static curr_foods: string[] = [];
  food1_valid: boolean = false;
  food2_valid: boolean = false;
  static curr_calories: number = 0;
  local_calories: number = 0;

  update_rec() {
    return RecommendationPage2Page.curr_restaurant
  }

  restaurant_form = this.formBuilder.group({
    name: ['', [Validators.required]]
  })

  food_form1 = this.formBuilder.group({
    name: ['', [Validators.required]]
  })

  food_form2 = this.formBuilder.group({
    name: ['', [Validators.required]]
  })

  submit()
  {
    this.router.navigate(['/tabs/home'])
  }

  public submit1() {
    console.log(this.restaurant_form.value)
  }

  public submit2() {
    console.log('submit2 log')
  }

  // dateTime = new Date();
  ngOnInit() {
    // setTimeout(() => {
    //   this.dateTime;
    // });
  }
    
  back()
  {
    this.router.navigate(['/tabs/recommendation-page1'])
  }

  save_food1() {
    RecommendationPage2Page.curr_foods.push(String(this.food_form1.get('name')?.value))
    this.load_food2()
    this.userService.getCalories(this.temp).subscribe((return_data) => {
      console.log(return_data);
      RecommendationPage2Page.curr_calories += Number(return_data);
      this.local_calories = RecommendationPage2Page.curr_calories;
    });
  }

  save_food2() {
    RecommendationPage2Page.curr_foods.push(String(this.food_form2.get('name')?.value))
    var str1 = '?restaurant='
    var str2 =  String(this.restaurant_form.get('name')?.value)
    var str3 = '&foods='
    var str4 = str3.concat(JSON.stringify(RecommendationPage2Page.curr_foods))
    var str5 = str1.concat(str2)
    this.temp = str5.concat(str4)
    console.log(this.temp)
    this.userService.getCalories(this.temp).subscribe((return_data) => {
      console.log(return_data);
      RecommendationPage2Page.curr_calories += Number(return_data);
      this.local_calories = RecommendationPage2Page.curr_calories;
    });
  }

  test() {
    this.userService.get_restaurant('sdfd')
  }

  load_restaurant() {
    var str1 = '?email=';
    var str2 = str1.concat(String(LoginPage.current_email));

    //this.restaurants = [1,2,3]
    this.userService.LoadRecommendationRestaurant(str2).subscribe((return_data) => {
      console.log(return_data);
      console.log('Recommendation restaurant load');
      this.restaurants = return_data
      this.r_display = JSON.stringify(this.restaurants)
      console.log(this.r_display)
      console.log(JSON.stringify(RecommendationPage2Page.curr_foods))
    });
  }
  temp: any;

  load_food() {
    var str1 = '?restaurant='
    var str2 =  String(this.restaurant_form.get('name')?.value)
    RecommendationPage2Page.curr_restaurant = this.restaurant_form.get('name')?.value
    console.log('sdfsdfsdfsdfsdf', RecommendationPage2Page.curr_restaurant)
    var str3 = '&foods='
    var str4 = str3.concat(JSON.stringify(RecommendationPage2Page.curr_foods))
    console.log(str4)
    var str5 = str1.concat(str2)

    var str6 = '&email=';
    var str7 = str6.concat(String(LoginPage.current_email));

    this.temp = str5.concat(str4)
    this.temp = this.temp.concat(str7);

    console.log(this.temp)
    var dataToSend = {
      data: "sending"};
    this.userService.LoadRecommendationFood(this.temp).subscribe((return_data) => {
      console.log(return_data);
      console.log('Recommendation food load');
      this.foods = return_data;
      //this.recs_names = this.recs_names['dishes']
    });
  }

  load_food2() {
    console.log(LoginPage.current_email, "abc")
    var str1 = '?restaurant='
    var str2 =  String(this.restaurant_form.get('name')?.value)
    var str3 = '&foods='
    var str4 = str3.concat(JSON.stringify(RecommendationPage2Page.curr_foods))
    var str5 = str1.concat(str2)
    var str6 = '&email=';
    var str7 = str6.concat(String(LoginPage.current_email));

    this.temp = str5.concat(str4)
    this.temp = this.temp.concat(str7);
    
    console.log(this.temp)
    var dataToSend = {
      data: "sending"};
    this.userService.LoadRecommendationFood(this.temp).subscribe((return_data) => {
      console.log(return_data);
      console.log('Recommendation food load');
      this.foods2 = return_data;
      //this.recs_names = this.recs_names['dishes']
    });

  }

}

export var curr_rec = RecommendationPage2Page.curr_restaurant