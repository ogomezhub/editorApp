import { Component , OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController,LoadingController,NavParams } from 'ionic-angular';
import { ManufactureProvider} from '../../providers/manufacture/manufacture';
import { ManufactureDetailsComponent} from './manufacture-details/manufacture-details';
import {Deploy} from '@ionic/cloud-angular';
@Component({
	selector: 'page-manufacturer',
	templateUrl: 'manufacturer.html',
	providers:[ManufactureProvider]
})
export class Manufacturer implements OnInit{

	data:any
	items: any;
	loading: any;
	selectedItem:any;
	searching: any = false;
	searchTerm: string = '';
	searchControl: FormControl;


	constructor(public navCtrl: NavController,
		private manufacture:ManufactureProvider,
		public navParams: NavParams,
		public deploy: Deploy,
		public loadingCtrl: LoadingController) {
		this.searchControl = new FormControl();
		this.loading = this.loadingCtrl.create({
			content: `<ion-spinner ></ion-spinner>`
		});
		this.items = [];
		this.data  = [];
		this.selectedItem = navParams.get('item'); 
	}

	getdata(){
		this.loading.present();
		this.manufacture.getJsonData().subscribe(
			result => {
				this.items=result.data.data;
				this.data = result.data.data;
			},
			err =>{
				console.error("Error : "+err);
			} ,
			() => {
				this.loading.dismiss();
			}
			);
	}
	

	doRefresh(refresher) {

		this.items = this.data;
		setTimeout(() => {
			refresher.complete();
		}, 2000);
	}

	itemSelected(event, item){
		this.navCtrl.push(ManufactureDetailsComponent,{
			item:item 
		});
	}
	doInfinite(infiniteScroll) {

		setTimeout(() => {
			for (let i = 0; i < 20; i++) {
				this.items.push( this.items.length );
			}

			infiniteScroll.complete();
		}, 500);
	}

	ionViewDidLoad() {

		this.setFilteredItems();

		this.searchControl.valueChanges.debounceTime(400).subscribe(search => {

			this.searching = false;
			this.setFilteredItems();

		});
	}
	onSearchInput(){
		this.searching = true;
	}

	setFilteredItems() {
		if(this.searchTerm != ''){
			this.items = this.searchContent("search",this.searchTerm);
		}else{
			this.items = this.data;
		}

	}

	searchContent(isFrom, searchText){
		this.searching = true;
		let q:any = {'data':searchText}
		this.manufacture.search(q).subscribe((res) => {
			this.items = res.data;
			if(isFrom == 'search' && searchText != '') {
				return this.items.filter((item) => {
					return (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
				})
			}
		}, (err) => {

		},
		()=> {this.searching = false});
	}

	ngOnInit(){
		this.getdata();
	}

}
