import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from '@firebase/util'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: ''
  }
   
  constructor(private router: Router, public ngFireAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  // logIn()
  // {
  //   this.router.navigate(['/tabs/home'])
  // }
  async logIn() 
  {
    try 
    {
      const user = await this.ngFireAuth.signInWithEmailAndPassword(this.user.email, this.user.password);
      console.log(user);
      if (user.user?.email) 
      {
        this.router.navigate (['/tabs/home']);
      } 
    } 
    catch (error: unknown) 
    {
      if (error instanceof FirebaseError) 
      {
        alert ('login failed!');
      }
    }
    // if (user.user?.email) 
    // {
    //   this.router.navigate (['/tabs/home']);
    // } 
    // else 
    // {
    //   alert ('login failed!');
    // }
  }

  // signUp()
  // {
  //   this.router.navigate(['/tabs/survey'])
  // }
  async signUp()
  {
    try 
    {
      const user = await this.ngFireAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      console.log(user);
  
      if (user && user.user?.email) 
      {
        alert('registration successful!');
        this.router.navigate (['/tabs/survey']); 

      } 
    } 
    catch (error: unknown) 
    {
      if (error instanceof FirebaseError) 
      {
        alert ('registration failed!');
      }
    }

    // if (user && user.user?.email) 
    // {
    //   alert('registration successful!');
    //   this.router.navigate (['/tabs/survey']); 

    // } 
    // else 
    // {
    //   alert ('registration failed!');
    // }
  }
}
