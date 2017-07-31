import {Injectable} from '@angular/core';

@Injectable()

export class AuthGuard {

    isLogged:boolean;
    constructor() {
        this.authenticated();
     }

     authenticated(){
         if(localStorage.getItem('token')){
            return  this.isLogged = true;
         }else{
            return this.isLogged = false;
         }
     }

   


   
}