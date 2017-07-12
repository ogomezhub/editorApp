import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditorListProvider } from '../../../providers/editor-list/editor-list';
/*
  Generated class for the NgoMap component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'list-details',
  templateUrl: 'list-details.html'
})
export class ListDetailsComponent {
	list:any;
	selectedItem:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public editor:EditorListProvider) {
    this.list = navParams.get('item');
    console.log(this.list);
  }

  
}
