import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { Manufacturer } from '../manufacturer/manufacturer';
import { List} from '../list/list';
import { ContentPage }from '../content/content';

//import {AuthGuard} from '../../providers/auth/auth.guard';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab3Root = ContentPage;
  tab2Root = Manufacturer;
  tab1Root = List;

  constructor() {

  }

  ionViewCanEnter(){
    
  }
  ionViewDidLoad(){
    
  }
}
