import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../api/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  //constructor(public userService:UserService, private router: Router, private formBuilder: FormBuilder, ) {}
  constructor(private router: Router, public userService:UserService, private formBuilder: FormBuilder,
    private modalContriller: ModalController, private navCtrl: NavController, private plt: Platform) {
      this.test2()
     }
  ngOnInit() {
  }
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

  dismissModal(){
    this,this.modalContriller.dismiss({
      'dismissed': true
    })
  }

  confirm()
  {
    this.router.navigate(['/tabs/home'])
  }

  back()
  {
    this.router.navigate(['/tabs/home'])
  }

  //storeFeedback() 
  test2()
  {
    let restaurant = 'in n out'
    let dishes: string[] = ['burger', 'fries'];
    let dishes_rate: number[] = [5,4];
    let date = '3/11/2021'
    let rate = 4;
    var dataToSend = {
      restaurant: restaurant,
      dishes: dishes,
      dishes_rate: dishes_rate,
      date: date,
      rate: rate
    };
    this.userService.test2(dataToSend).subscribe(() => {
      // this.str_data = JSON.stringify(return_data)
      // console.log(return_data);
      //this.dismissModal();
      // this.navCtrl.navigateBack('/tabs/home')
    })
    //this.dismissModal();
  }
}
