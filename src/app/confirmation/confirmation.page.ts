import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../api/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { RecommendationPage2Page } from '../recommendation-page2/recommendation-page2.page';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  //constructor(public userService:UserService, private router: Router, private formBuilder: FormBuilder, ) {}
  constructor(private router: Router, public userService:UserService, private formBuilder: FormBuilder,
    private modalContriller: ModalController, private navCtrl: NavController, private plt: Platform, 
    public recPage2: RecommendationPage2Page) {
      this.update_restaurant();
      console.log('enter confirmation page')
     }
  
  restaurant = RecommendationPage2Page.curr_restaurant;
  food1 = RecommendationPage2Page.curr_foods[0];
  food2 = RecommendationPage2Page.curr_foods[1];
  ionViewWillEnter() {
    this.restaurant = RecommendationPage2Page.curr_restaurant;
    this.food1 = RecommendationPage2Page.curr_foods[0];
    this.food2 = RecommendationPage2Page.curr_foods[1];
    console.log('entered')
  }
  update_restaurant () {
    this.restaurant = RecommendationPage2Page.curr_restaurant;
    console.log('......', RecommendationPage2Page.curr_restaurant)
  }

  ngOnInit() {
  }
  recs_names: any;
  get rate() {
    return this.feedback_r_Form.get("rate")
  }

  str_data:any="";
  
  feedback_r_Form = this.formBuilder.group({
    rate: ['', [Validators.required]]
  })

  feedback_d_Form = this.formBuilder.group({
    name: ['', [Validators.required]],
    date: ['', [Validators.required]],
    rate: ['', [Validators.required]]
  })

  submit() {
    console.log('Submitted!')
  }

  restaurant_form = this.formBuilder.group({
    rate: ['', [Validators.required, Validators.pattern('^[1-5]$')]]
  })

  food_form1 = this.formBuilder.group({
    rate: ['', [Validators.required, Validators.pattern('^[1-5]$')]]
  })

  food_form2 = this.formBuilder.group({
    rate: ['', [Validators.required, Validators.pattern('^[1-5]$')]]
  })

  dismissModal(){
    this.modalContriller.dismiss({
      'dismissed': true
    })
  }

  confirm()
  {
    this.storeFeedback()
    this.router.navigate(['/tabs/home'])
  }

  back()
  {
    this.router.navigate(['/tabs/home'])
  }


  //storeFeedback() 
  storeFeedback()
  {
    let restaurant = RecommendationPage2Page.curr_restaurant
    let dish1: string = RecommendationPage2Page.curr_foods[0];
    let dish2: string = RecommendationPage2Page.curr_foods[1];
    let dish1_rate: number = Number(this.food_form1.get('rate')?.value);
    let dish2_rate: number = Number(this.food_form2.get('rate')?.value);
    let date = '3/11/2021'
    let rate = Number(this.restaurant_form.get('rate')?.value);
    var dataToSend = {
      restaurant: restaurant,
      dish1: dish1,
      dish2: dish2,
      dish1_rate: dish1_rate,
      dish2_rate: dish2_rate,
      date: date,
      rate: rate
    };
    console.log(dataToSend)
    this.userService.SaveFeedback(dataToSend)
    // this.userService.SaveFeedback(dataToSend).subscribe((return_data) => {
    //   console.log(return_data);
    //   console.log('Recommendation load');
    //   this.recs_names = return_data
    // });
  }
}
