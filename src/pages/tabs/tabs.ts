import { Component } from '@angular/core';

import { Manufacturer } from '../manufacturer/manufacturer';
import { List} from '../list/list';
import { ContentPage }from '../content/content';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab3Root = List;
  tab2Root = Manufacturer;
  tab1Root = ContentPage;

  constructor() {

  }
}
