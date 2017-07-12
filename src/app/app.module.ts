import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { Manufacturer } from '../pages/manufacturer/manufacturer';
import { ListDetailsComponent} from '../pages/list/list-details/list-details';
import { List } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { ContentPage} from '../pages/content/content';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { EditorListProvider } from '../providers/editor-list/editor-list';
import { ContentProvider } from '../providers/content/content';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'c7eeadf7'
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    Manufacturer,
    List,
    TabsPage,
    ContentPage,
    ListDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    Manufacturer,
    List,
    TabsPage,
    ContentPage,
    ListDetailsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    EditorListProvider,
    ContentProvider
  ]
})
export class AppModule {}
