import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth';

import {LoginPage} from '../login/login';
@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
})
export class ContentPage implements OnInit {
  profile:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth:AuthProvider) {
  }

  ionViewDidLoad() {
    
  }

  getProfile(){
    return this.auth.profile().subscribe(res =>{
      this.profile = res;
    },err=>{console.log(err)}
    ,()=>{'complete'});
  }

  ngOnInit(){
    this.getProfile();
    console.log(this.profile);
  }

  logout(){
    this.auth.logout();
   this.navCtrl.setRoot(LoginPage);
   return window.location.reload();
  }

}
