import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

import {AuthProvider} from '../../providers/auth/auth';
import {AuthGuard} from '../../providers/auth/auth.guard';
import { SignupPage} from '../signup/signup';
import { TabsPage} from '../tabs/tabs';
import {Verification} from '../verification/verification';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm:FormGroup;
  loading = false;
    login = 'Login'; 
    error:any;
    msg:string = "Activation email resent. Please check your inbox for Activation Code.";
  constructor(public fb:FormBuilder,
              private guard:AuthGuard,
              private auth:AuthProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {
             this.formBuild();
  }

  ionViewDidLoad() {
    if(this.guard.isLogged){
      this.navCtrl.setRoot(TabsPage);
    }
  }
  
  formBuild(){
    this.loginForm = this.fb.group({
      'email':[null,[Validators.required]],
      'password':[null,[Validators.required]]
    })
  }
  
  submitLogin($ev, value:any){
    this.error = '';
        this.loading = true;
        this.login = 'Please wait... ';
    for (let l in this.loginForm.controls){
      this.loginForm.controls[l].markAsTouched();
    }

    this.auth.login(this.loginForm.value)
        .subscribe(res =>{
          this.navCtrl.setRoot(TabsPage);
        },err =>{
               if(err.status == 403){
                 this.confirmEamil();
               }else if(err.status == 401){
                 this.showErrorAlert();
               }else{
                 console.log(err);
               }

               this.login = 'Login';
               this.loading = false;
        },()=>{'Logdded in successful'});


  }
  signup(){
  	this.navCtrl.setRoot(SignupPage);
  }

   showErrorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Username or Password provided does not match with our records!',
      buttons: ['OK']
    });
    alert.present();
  }

  confirmEamil() {
    let confirm = this.alertCtrl.create({
      title: 'Account Not active',
      message: 'Your account is not verified, click verify below to resend OTP code! ',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Verify',
          handler: () => {
            this.loading = true;
            this.login = 'Resending OTP... ';
            let user = {
              'email':this.loginForm.value.email
            }
           this.auth.resendToken(user).subscribe(res =>{
            this.navCtrl.setRoot(Verification, {
              msg:this.msg
            });
           },err=>{this.error = err}
           ,()=>{'complete'});
          }
        }
      ]
    });
    confirm.present();
  }

}
