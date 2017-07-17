import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { DataProvider} from '../../providers/data/data';
import {Deploy} from '@ionic/cloud-angular';
import 'rxjs/add/operator/debounceTime';

@Component({
	selector: 'page-manufacturer',
	templateUrl: 'manufacturer.html'
})
export class Manufacturer {

	items: any;
	searching: any = false;
	searchTerm: string = '';
	searchControl: FormControl;

	constructor(public navCtrl: NavController,
			 public dataService: DataProvider,
			 public deploy: Deploy) {
		this.searchControl = new FormControl();
	}

	ionViewDidLoad() {

		this.setFilteredItems();

		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

			this.searching = false;
			this.setFilteredItems();

		});
	}

	onSearchInput(){
		this.searching = true;
	}

	setFilteredItems() {

		this.items = this.dataService.filterItems(this.searchTerm);

	}


}
