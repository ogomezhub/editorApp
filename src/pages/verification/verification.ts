import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';
import {TabsPage} from '../tabs/tabs';

@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})

export class Verification {
	verificationForm:FormGroup;
	verify = 'Verify';
  loading = false; 
  error:any;
  msg:any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public formBuilder: FormBuilder,
    public auth:AuthProvider) {

    this.verificationForm = this.formBuilder.group({
    	'otp':[null,[Validators.required]]
    });

    this.msg = navParams.get('msg');

  }

  submitVerification($ev,value:any){
  	this.verify  ='Please wait..';
    this.loading = true;
    for(let v in this.verificationForm.controls){
      this.verificationForm.controls[v].markAsTouched();
    }

    return this.auth.verification(this.verificationForm.value.otp).subscribe(res =>{
      this.navCtrl.setRoot(TabsPage);
    },err => {this.error = err}
    ,()=>{'complete'});

  }
}