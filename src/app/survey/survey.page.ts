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
  get age() {
    return this.registrationForm.get('age');
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
    gender: ['', [Validators.required, Validators.maxLength(100)]],
    age: ['', [Validators.required, Validators.maxLength(100)]],
    height: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{1,3}$')
      ]
    ],
    weight: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{1,3}$')
      ]
    ],
    email: [
      '',
      [
        // Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    telephone: ['', [
      // Validators.required, 
      Validators.maxLength(100)]],
    food_preference: ['', [
      // Validators.required,
       Validators.maxLength(100)]],
    calories: ['', [
      // Validators.required,
      Validators.maxLength(100)]],
    use_Recommendation: [false, [
      Validators.required,
      Validators.maxLength(100)]] 
  });


  constructor(private router: Router,  private plt: Platform, public userService:UserService, private formBuilder: FormBuilder, private navCtrl : NavController) {
  }

  back()
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
    let age = this.registrationForm.get("age")?.value;
    let height = this.registrationForm.get("height")?.value;
    let weight = this.registrationForm.get("weight")?.value;
    let email = this.registrationForm.get("email")?.value;
    let telephone = this.registrationForm.get("telephone")?.value;
    let food_preference = this.registrationForm.get("food_preference")?.value;
    let calories = this.registrationForm.get("calories")?.value;
    let use_Recommendation = this.registrationForm.get("use_Recommendation")?.value;

    let return_calories;
    if(use_Recommendation)
      return_calories = this.goal_calories;
    else
      return_calories = calories;
    

    var dataToSend = {
      full_name: full_name, 
      gender: gender, 
      age: age, 
      height: height, 
      weight: weight, 
      email: email, 
      telephone: telephone, 
      food_preference: food_preference,
      return_calories: return_calories, 
      use_Recommendation: use_Recommendation
    };
    console.log(dataToSend);
    console.log("dataToSend");
      
      this.userService.Savedata(dataToSend).subscribe((response) => {
        console.log(response);
        console.log('Load user data');
      });

      this.router.navigate(['/tabs/home'])
  }
  
  goal_calories = 0;
  display_recommendation()
  {
    
    let gender = this.registrationForm.get("gender")?.value;
    let age = this.registrationForm.get("age")?.value;
    let height = this.registrationForm.get("height")?.value;
    let weight = this.registrationForm.get("weight")?.value;

    if(gender == "Male")
      this.goal_calories = 66.5 + 13.8 * Number(weight) + 5 * Number(height) - 6.8 * Number(age); 
    else if (gender == "Female")
      this.goal_calories = 655 + 9.6 * Number(weight) + 1.9 * Number(height) - 4.7 * Number(age); 
    else
    {
      let male_calories = 66.5 + 13.8 * Number(weight) + 5 * Number(height) - 6.8 * Number(age); 
      let female_calories = 655 + 9.6 * Number(weight) + 1.9 * Number(height) - 4.7 * Number(age); 
      
      this.goal_calories = (male_calories + female_calories)/2 // (default as average from male and female)
    }

    console.log(this.goal_calories, "abd");
  }

  foods_preference = ["chinese food", "mexican food", "American food", "japanese food", "korean food",
   "fast food", "sat down restaurant", "to-go restaurant beef", "chicken", "fish", "vegetables",
    "fruits", "dessert", "ice cream", "carbohydrates", "rice", "noodles", "bread", "pizza", "raw", 
    "sushi" ,"salad", "drinks", "soda", "shakes", "Lamb", "pork", "shrimp", "spicy", "thai food",
    "asian food", "vietnamese", "alcohol", "egg", "dairy"];
  
    
}