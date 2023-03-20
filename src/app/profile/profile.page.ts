import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openSurvey()
  {
    this.router.navigate(['/tabs/survey'])
  }

  logOut()
  {
    // this.router.navigate([''])
    this.router.navigateByUrl('')
        .then(() => {
          window.location.reload();
        });
  }

  // email = LoginPage.current_email;
  email = "abca@abc.com";
  // email = "abcabcabcabcbcabcabcabcabcbc.com"

}
