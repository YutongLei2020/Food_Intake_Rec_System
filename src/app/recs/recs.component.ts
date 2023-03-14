import { Component, OnInit } from '@angular/core';
import { Rec } from '../rec';
import { RECS } from '../mock-recs';
import { UserService } from '../api/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-recs',
  templateUrl: './recs.component.html',
  styleUrls: ['./recs.component.scss'],
})
export class RecsComponent implements OnInit {

  recs_names: any;

  constructor(public userService:UserService, private formBuilder: FormBuilder,
    private modalContriller: ModalController, private navCtrl: NavController, private plt: Platform) { 
      this.loadRec()
    }

  ngOnInit() {}

  loadRec() {
    var dataToSend = {
      data: 'Sending'
    };
    this.userService.test().subscribe((return_data) => {
      console.log(return_data);
      // if (return_data['valid'] == 'true') {
      //   console.log('Recommendation load');
      //   this.recs_names = return_data['rec_names']
      // }
      console.log('Recommendation load');
      this.recs_names = return_data
      //this.recs_names = this.recs_names['dishes']
    });
  }

}
