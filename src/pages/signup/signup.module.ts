import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import {Verification} from '../verification/verification';

@NgModule({
  declarations: [
    SignupPage,
    Verification
  ],
  imports: [
    IonicPageModule.forChild([SignupPage,Verification]),
  ],
  exports: [
    SignupPage
  ]
})
export class SignupPageModule {}
