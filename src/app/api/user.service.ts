
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  //SaveFeedback(dataToSend: { restaurant: string; dishes: string[]; dishes_rate: number[]; date: string; rate: number; })
  SaveFeedback(dataToSend: any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3001/test2');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3000/feedback";
    var dataToSend2 = {'asdf': 'sdfsd'}
    //var dataToSend2 = 'sdfsdf'
    console.log('enter saveFeedBack')
    //var temp = this.http.post(url, dataToSend2, {headers: headers});
    var temp = axios.post(url, dataToSend, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT',
    'Access-Control-Allow-Credentials': 'true'}})
    console.log(temp)
    return temp
  }

  LoadRecommendation(dataToSend: { data: string; })
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/LoadRecommendation');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3000/LoadRecommendation";

    return this.http.post(url, dataToSend, {headers: headers});
  }

  LoadRecommendationRestaurant()
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/LoadRecommendation');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3000/calculate_rec_restaurant";
    return this.http.get(url, {headers: headers});
  }

  LoadRecommendationFood(dataToSend: any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/calculate_rec_food');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.append('Access-Control-Allow-Credentials', 'true');
    var url1 = "http://127.0.0.1:3000/calculate_rec_food";
    var url = url1.concat(dataToSend)
    return this.http.get(url);
  }

  getCalories(dataToSend: any)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/LoadRecommendation');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    var url1 = "http://127.0.0.1:3000/calculate_calories";
    var url = url1.concat(dataToSend)
    return this.http.get(url, {headers: headers});
  }

  get_restaurant(dataToSend: string
  )
{
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  // headers.append('Access-Control-Allow-Origin', 'http://localhost:3001/test2');
  // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
  // headers.append('Access-Control-Allow-Credentials', 'true');
  var url = "http://127.0.0.1:3000/get_restaurant";
  var dataToSend2 = {'asdf': 'sdfsd'}
  //var dataToSend2 = 'sdfsdf'
  console.log('enter get_restaurent')
  //var temp = this.http.post(url, dataToSend2, {headers: headers});
  var temp = axios.post(url, dataToSend2, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT',
  'Access-Control-Allow-Credentials': 'true'}})
  console.log(temp)
  return temp
}

  test()
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3001/test');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3001/test";

    return this.http.get(url, {headers: headers});
  }

  test2(dataToSend: {
      restaurant: string; dishes: string[]; dishes_rate: number[]; date: string; rate: number;
    })
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3001/test2');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3001/test2";
    var dataToSend2 = 'hello msg'

    return this.http.post(url, dataToSend, {headers: headers});
  }

  
}