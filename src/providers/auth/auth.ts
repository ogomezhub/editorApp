import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';


import { HelperProvider } from '../helper/helper';

@Injectable()
export class AuthProvider {

	constructor(public http: Http, private helper: HelperProvider) {


	}

	signup(user) {
		return this.http.post(this.helper.api + "signup", user, { headers: this.helper.headers })
			.map(this.helper.extractData)
			.catch(this.helper.handleServerError);
	}

	login(user) {
		return this.http.post(this.helper.api + 'authenticate', user, { headers: this.helper.headers })
			.map((res: Response) => {
				localStorage.setItem('username', res.json().user.first_name);
				localStorage.setItem('email', res.json().user.email);
				localStorage.setItem('token', res.json().token);
				const token = res.json().token;
				const base64Url = token.split('.')[1];
				const base64 = base64Url.replace('-', '+').replace('_', '/');
				return { token: token, decoded: JSON.parse(window.atob(base64)) };
			})/*
		.do(tokenData => {
			localStorage.setItem('token',tokenData.token);
			//localStorage.setItem('token',tokenData.token)
		})*/
			.catch((error: Response | any) => {

				return Observable.throw(error);
			});
	}

	verification(otp) {
		return this.http.get(this.helper.api + "activate/otp/" + otp, { headers: this.helper.headers })
			.map((res: Response) => {
				localStorage.setItem('username', res.json().user.first_name);
				localStorage.setItem('email', res.json().user.email);
				const token = res.json().token;
				const base64Url = token.split('.')[1];
				const base64 = base64Url.replace('-', '+').replace('_', '/');
				return { token: token, decoded: JSON.parse(window.atob(base64)) };
			})
			.do(tokenData => {
				localStorage.setItem('token', tokenData.token)
			})
			.catch(this.helper.handleServerError)
	}
	resendToken(email){
		return this.http.post(this.helper.api+"activate/resend",email,{headers:this.helper.headers})
				.map(this.helper.extractData)
				.catch(this.helper.handleServerError);
	}

	profile() {
		return this.http.get(this.helper.api + "profile?token=" + this.getToken())
			.map(this.helper.extractData)
			.catch(this.helper.handleServerError);
	}

	getGender() {
		return this.http.get(this.helper.api + "gender")
			.map(this.helper.extractData)
			.catch(this.helper.handleServerError);
	}

	logout() {
		return localStorage.removeItem('token');
	}
	getToken() {
		return localStorage.getItem("token");
	}

}

export interface IGender {
	uuid: number;
	sex: string;
}
