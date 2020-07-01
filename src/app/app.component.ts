import { Comments } from './classes/comments';
import { Component } from '@angular/core';
import { freeApiService } from './services/freeapi.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  url = environment.api_url;
  cities = [];
  selectedValue = null;
  token = null;
  states = [];
  constructor(
    private _freeApiService: freeApiService,
    private http: HttpClient
  ) {}
  lstcomments: Comments[];

  ngOnInit() {
    this.gettoken();
    this._freeApiService.getcomments().subscribe((data) => {
      this.lstcomments = data;
    });
  }
  gettoken() {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'api-token':
        '1cMA3yNYCvJ3PL2FW86o-gtrIFHnZbkFZyJ3Q6X7uwoUvWvbuabro4G0nKTXfLzxWpo',
      'user-email': 'sreerajkarippala@gmail.com',
    });

    this.http
      .get(environment.api_url + 'api/getaccesstoken', { headers: headers })
      .subscribe((Response: any) => {
        console.log(Response.auth_token);
        this.getcities(Response.auth_token);
        this.token = Response.auth_token;


      });
  }
  getcities(token: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    });

    this.http
      .get(environment.api_url + 'api/countries/', { headers: headers })
      .subscribe((Response: any) => {
        console.log(Response);
        this.cities = Response;
      });
  }
  onChange(country) {

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
      Accept: 'application/json',
    });



    console.log(country);
    console.log(this.selectedValue);
    this.http.get(environment.api_url + 'api/states/' + this.selectedValue,{ headers : headers})
    .subscribe((Response: any) => {
      console.log(Response);
      this.states = Response;
    });
    
  }

  
}
