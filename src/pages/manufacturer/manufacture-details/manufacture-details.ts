import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ManufactureProvider} from '../../../providers/manufacture/manufacture';

@Component({
  selector: 'manufacture-details',
  templateUrl: 'manufacture-details.html'
})
export class ManufactureDetailsComponent {
	list:any;
	selectedItem:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public manufacture:ManufactureProvider) {
    this.list = navParams.get('item');
  }

  
}
