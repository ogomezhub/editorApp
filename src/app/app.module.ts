import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';

/*pages Module*/
import {LoginPageModule} from '../pages/login/login.module';
import {SignupPageModule} from '../pages/signup/signup.module';


import { AboutPage } from '../pages/about/about';
import { Manufacturer } from '../pages/manufacturer/manufacturer';
import { ListDetailsComponent} from '../pages/list/list-details/list-details';
import { ManufactureDetailsComponent} from '../pages/manufacturer/manufacture-details/manufacture-details';
import { List } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { ContentPage} from '../pages/content/content';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { EditorListProvider } from '../providers/editor-list/editor-list';
import { ManufactureProvider } from '../providers/manufacture/manufacture';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'c671d1d0'
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
    ListDetailsComponent,
    ManufactureDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    CloudModule.forRoot(cloudSettings),
    LoginPageModule,
    SignupPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    Manufacturer,
    List,
    TabsPage,
    ContentPage,
    ListDetailsComponent,
    ManufactureDetailsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    EditorListProvider,
    ManufactureProvider
  ]
})
export class AppModule {}
