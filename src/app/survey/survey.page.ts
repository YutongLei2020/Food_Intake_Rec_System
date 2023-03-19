import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

// import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import {UserService} from '../api/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})

export class SurveyPage {

  get full_name() {
    return this.registrationForm.get("full_name");
  }
  get gender() {
    return this.registrationForm.get('gender');
  }
  get birthday() {
    return this.registrationForm.get('birthday');
  }
  get height() {
    return this.registrationForm.get('height');
  }
  get weight() {
    return this.registrationForm.get('weight');
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get telephone() {
    return this.registrationForm.get("telephone");
  }
  get food_preference() {
    return this.registrationForm.get("food_preference");
  }
  get calories() {
    return this.registrationForm.get("calories");
  }
  get use_Recommendation() {
    return this.registrationForm.get("use_Recommendation");
  }

  dataFromService:any="";
  registrationForm = this.formBuilder.group({
    full_name: ['', [Validators.required, Validators.maxLength(100)]],
    // gender: ['', [Validators.required, Validators.maxLength(100)]],
    // birthday: ['', [Validators.required, Validators.maxLength(100)]],
    // height: [
    //   '',
    //   [
    //     Validators.required,
    //     Validators.pattern('^[0-9]{1,3}$')
    //   ]
    // ],
    // weight: [
    //   '',
    //   [
    //     Validators.required,
    //     Validators.pattern('^[0-9]{1,3}$')
    //   ]
    // ],
    // email: [
    //   '',
    //   [
    //     Validators.required,
    //     Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
    //   ]
    // ],
    // telephone: ['', [Validators.required, Validators.maxLength(100)]],
    // food_preference: ['', [Validators.required, Validators.maxLength(100)]],
    // calories: ['', [Validators.required, Validators.maxLength(100)]],
    // use_Recommendation: ['', [Validators.required, Validators.maxLength(100)]] //???
  });


  constructor(private router: Router,  private plt: Platform, public userService:UserService, private formBuilder: FormBuilder, private navCtrl : NavController) {
  }

  back()
  {
    this.router.navigate(['/tabs/profile'])
  }

  openProfile()
  {
    this.router.navigate(['/tabs/profile'])
  }

  public submit() {
    console.log(this.registrationForm.value);
  }

  SaveData()
  {
    let full_name = this.registrationForm.get("full_name")?.value;
    let gender = this.registrationForm.get("gender")?.value;
    let birthday = this.registrationForm.get("birthday")?.value;
    let height = this.registrationForm.get("height")?.value;
    let weight = this.registrationForm.get("weight")?.value;
    let email = this.registrationForm.get("email")?.value;
    let telephone = this.registrationForm.get("telephone")?.value;
    let food_preference = this.registrationForm.get("food_preference")?.value;
    let calories = this.registrationForm.get("calories")?.value;
    let use_Recommendation = this.registrationForm.get("use_Recommendation")?.value;


    var dataToSend = {
      full_name: full_name, 
      // gender: gender, 
      // birthday: birthday, 
      // height: height, 
      // weight: weight, 
      // email: email, 
      // telephone: telephone, 
      // food_preference: food_preference,
      // calories: calories, 
      // use_Recommendation: use_Recommendation
    };
      
      this.userService.Savedata(dataToSend).subscribe((response) => {
        console.log(response);
        console.log('Load user data');

        this.navCtrl.navigateForward('LoadUserData'); 
      });

      // this.userService.LoadRecommendationRestaurant().subscribe((return_data) => {
      //   console.log(return_data);
      //   console.log('Recommendation restaurant load');
      //   this.restaurants = return_data
      //   this.r_display = JSON.stringify(this.restaurants)
      //   console.log(this.r_display)
      //   console.log(JSON.stringify(RecommendationPage2Page.curr_foods))
      // });
  }
  
}