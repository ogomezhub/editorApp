import { Component, ViewChild, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage} from '../login/login';
import {Verification} from '../verification/verification';

import {AuthProvider, IGender} from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit{
	 @ViewChild('signupSlider') signupSlider: any;

    gender:IGender[];
    personDetails: FormGroup;
    loginDetails:FormGroup;
    loading = false;
    signup = 'Submit'; 
    error:any;
    msg = 'Please verify your account using the one time pin sent to your email!';
    submitAttempt: boolean = false;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public formBuilder: FormBuilder,
    public auth:AuthProvider) {

    this.signupBuild();

  }

  ionViewDidLoad() {
    
  }

  signupBuild(){
     this.personDetails = this.formBuilder.group({
        'first_name': [null,[Validators.required]],
        'last_name': [null,[Validators.required]],
        'dob':[null,[Validators.required]],
        'gender_uuid':[null,[Validators.required]]
    });
      this.loginDetails = this.formBuilder.group({
        'phone':[null,[Validators.required]],
        'email':[null,[Validators.required]],
        'password':[null,[Validators.required]]
    });
  }

  submitSignup(){
    this.loading = true;
    this.signup = 'wait...';

    for (let p in this.personDetails.controls){
      this.personDetails.controls[p].markAsTouched();
    }
    for( let l in this.loginDetails.controls){
      this.loginDetails.controls[l].markAsTouched();
    }
    let user = {
      'first_name':this.personDetails.value.first_name,
      'last_name':this.personDetails.value.last_name,
      'dob':this.personDetails.value.dob,
      'gender_uuid':this.personDetails.value.gender_uuid,
      'phone':this.loginDetails.value.phone,
      'email':this.loginDetails.value.email,
      'password':this.loginDetails.value.password
    }
   return  this.auth.signup(user).subscribe(res =>{
      this.navCtrl.setRoot(Verification,{
        msg: this.msg
      });
    }, err =>{
        console.log(err);
        this.error = err;
      },()=>{'complete'});
    
  }

  getGender(){
    return this.auth.getGender().subscribe(res =>{
      this.gender = res;
    },err => {
      console.log(err);
    },()=>'complete');
  }

  next(){
      if(!this.personDetails.valid)
        this.signupSlider.slideTo(0);
      else
        this.signupSlider.slideNext();
    
    }
 
    prev(){
        this.signupSlider.slidePrev();
    }

    login(){
      this.navCtrl.setRoot(LoginPage);
    }
    ngOnInit(){
      this.getGender();
    }

}
