import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

  @Injectable()
  export class DataProvider {
  	
  	items:any;
  	
  	constructor() {
  		console.log('Hello DataProvider Provider');

  		this.items = [
            {title: 'Abbott Laboratories'},
            {title: 'Adcock Ingram Critical Care'},
            {title: 'African Medicines'},
            {title: 'Afrox Limited'},
            {title: 'Air Liquide'},
            {title: 'Akromed Products'},
            {title: 'Amka Pharmaceuticals'},
            {title: 'Anchorpharm Animal Health'},
            {title: 'Astra Pharmaceuticals'},
            {title: 'Atomic Energy Corporation of SA'},
            {title: 'Bayer (Pty) Ltd'},
            {title: 'Beige Pharmaceuticals cc'},
            {title: 'Better Nutrition (Pty) Ltd'},
            {title: 'Bioclones (Pty) Ltd'}
        ];

    }

  	filterItems(searchTerm){

  		return this.items.filter((item) => {
  			return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  		});     

  	}


  }
