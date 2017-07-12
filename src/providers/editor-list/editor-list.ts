import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {List} from './editor-list';
import 'rxjs/add/operator/map';


  @Injectable()
  export class EditorListProvider implements OnInit{
  	items:List[];
  	constructor(public http: Http) {

  	} 

  	getJsonData(){
  		return this.http.get('http://editor2.appenberg.co.za/api/v1/content').map(res => res.json());
  	}

  	ngOnInit(){
  	}

  }

  export interface List {
  	ID:number;
  	Header:string;
  	Content:string;
  }
