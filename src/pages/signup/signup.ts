import { Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	 @ViewChild('signupSlider') signupSlider: any;

	slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    submitAttempt: boolean = false;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public formBuilder: FormBuilder) {

  	 this.slideOneForm = formBuilder.group({
        firstName: [null,[Validators.required]],
        lastName: [null,[Validators.required]],
        dob:[null,[Validators.required]]
    });

  	 this.slideTwoForm = formBuilder.group({
        firstName: [null,[Validators.required]],
        lastName: [null,[Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  next(){
        this.signupSlider.slideNext();
    }
 
    prev(){
        this.signupSlider.slidePrev();
    }

    save(){
 
    }

}
