import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {HelperProvider} from '../helper/helper';


  @Injectable()
  export class ManufactureProvider implements OnInit{
    headers = new Headers({'Content-Type':'application/json'});
  	constructor(public http: Http,
                public helper:HelperProvider) {

  	} 

  	getJsonData(){
  		return this.http.get(this.helper.api+'forms/manufactures')
      .map(this.helper.extractData)
      .catch(this.helper.handleServerError);
  	}

    search(data){
      return this.http.post(this.helper.api+'forms/manufactures/search',data,{headers:this.helper.headers})
            .map(this.helper.extractData)
            .catch(this.helper.handleServerError);
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
