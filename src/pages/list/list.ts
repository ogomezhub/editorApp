import { Component , OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController,LoadingController,NavParams } from 'ionic-angular';
import { ListService} from './../../services/list.service';
import { EditorListProvider} from '../../providers/editor-list/editor-list';
import { ListDetailsComponent} from './list-details/list-details';
import {Deploy} from '@ionic/cloud-angular';
@Component({
	selector: 'page-list',
	templateUrl: 'list.html',
	providers:[EditorListProvider]
})
export class List implements OnInit{

	searchQuery: string = '';
	items: any;
	lists:any;
	selectedItem:any;



	searching: any = false;
	searchTerm: string = '';
	searchControl: FormControl;
	newsData: any;
	loading: any;


	constructor(public navCtrl: NavController,
		private editor:EditorListProvider,
		private _list:ListService, 
		public navParams: NavParams,
		public deploy: Deploy,
		public loadingCtrl: LoadingController) {
		this.searchControl = new FormControl();
		this.loading = this.loadingCtrl.create({
			content: `<ion-spinner ></ion-spinner>`
		});

		this.getdata();
		this.selectedItem = navParams.get('item'); 
	}

	getdata(){
		this.loading.present();
		this.editor.getJsonData().subscribe(
			result => {
				this.items=result.data.data;
			},
			err =>{
				console.error("Error : "+err);
			} ,
			() => {
				this.loading.dismiss();
			}
			);
	}


	itemSelected(event, item){
		this.navCtrl.push(ListDetailsComponent,{
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

		this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

			this.searching = false;
			this.setFilteredItems();

		});
	}

	onSearchInput(){
		this.searching = true;
	}

	setFilteredItems() {

		this.items = this.getAllProdcuts("search",this.searchTerm);

	}

	getAllProdcuts(isFrom, searchText){
		this.editor.getJsonData().subscribe((res) => {
			this.items = res.data.data;
			if(isFrom == 'search' && searchText > 3) {
				return this.items.filter((item) => {
					return (item.Header.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
				})
			}
		}, (err) => {

		},
		()=> console.log('complete'));
	}

	getItems(ev: any) {
		this.searching = true;
		// set val to the value of the searchbar
		let val = ev.target.value;

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.getAllProdcuts("search", val);
		}
	}

	ngOnInit(){
		
	}

}
