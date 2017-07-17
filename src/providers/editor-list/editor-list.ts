import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


  @Injectable()
  export class EditorListProvider implements OnInit{
    headers = new Headers({'Content-Type':'application/json'});
  	constructor(public http: Http) {

  	} 

  	getJsonData(){
  		return this.http.get('http://editor2.appenberg.co.za/api/v1/content').map(res => res.json());
  	}

    search(data){
      return this.http.post('http://editor2.appenberg.co.za/api/v1/content/search',data,{headers:this.headers})
            .map(res => res.json());
    }

  	ngOnInit(){
  	}

  }

  export interface IList {
  	ID:number;
  	Header:string;
  	Content:string;
  }
