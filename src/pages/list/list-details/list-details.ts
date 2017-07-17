import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditorListProvider } from '../../../providers/editor-list/editor-list';

@Component({
  selector: 'list-details',
  templateUrl: 'list-details.html'
})
export class ListDetailsComponent {
	list:any;
	selectedItem:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public editor:EditorListProvider) {
    this.list = navParams.get('item');
  }

  
}
