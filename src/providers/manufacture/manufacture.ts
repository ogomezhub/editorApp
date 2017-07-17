import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


  @Injectable()
  export class ManufactureProvider implements OnInit{
    headers = new Headers({'Content-Type':'application/json'});
  	constructor(public http: Http) {

  	} 

  	getJsonData(){
  		return this.http.get('http://editor2.appenberg.co.za/api/v1/forms/manufactures').map(res => res.json());
  	}

    search(data){
      return this.http.post('http://editor2.appenberg.co.za/api/v1/forms/manufactures/search',data,{headers:this.headers})
            .map(res => res.json());
    }

  	ngOnInit(){
  	}

  }

  export interface IManufacture {
  	uuid:number;
  	name:string;
    phine:string;
  	email:string;
    logo:string;
    country_uuid:string;
    province:string;
    town:string;
    address1:string;
    address2:string;
    postal_code:string;
  }
