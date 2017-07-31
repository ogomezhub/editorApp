import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HelperProvider {
	headers = new Headers({'Content-Type':'application/json'});
	api = 'http://editor2.appenberg.co.za/api/v1/';

  constructor(public http: Http) {
   
  }

  public extractData(res:Response){
		let body = res.json();
		return body.data || {};
	}

	public handleServerError(error: Response | any) {
		let errMsg:string;

		if(error instanceof Response){
			const body = error.json() || '';
			const err =body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
			//errMsg = `${error.statusText || ''} ${err}`;
		}else{
			errMsg = error.message ? error.message : error.toString();
		}

		console.error(errMsg);
		return Observable.throw(errMsg);
    }
    
	getToken(){
		return localStorage.getItem('token');
	}

}
