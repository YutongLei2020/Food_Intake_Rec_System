import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  constructor(private router: Router) { }

  openProfile()
  {
    this.router.navigate(['/tabs/profile'])
  }

  ngOnInit() {
  }

}
