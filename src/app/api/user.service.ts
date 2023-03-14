
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  SaveFeedback(dataToSend: { restaurant: string; dishes: string[]; dishes_rate: number[]; date: string; rate: number; })
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/feedback');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3000/feedback";

    return this.http.post(url, dataToSend, {headers: headers});
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

  test2(dataToSend: { restaurant: string; dishes: string[]; dishes_rate: number[]; date: string; rate: number; })
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3001/test2');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3001/test2";

    return this.http.post(url, dataToSend, {headers: headers});
  }
}