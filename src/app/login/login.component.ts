import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FirebaseAuthService } from "../services/firebaseAuth.service";

@Component({
    selector: "proiect-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent{
    constructor(
        private firebaseAuthService: FirebaseAuthService,
        private router: Router
    ){}

    login(){
        this.firebaseAuthService.GoogleAuth()
        .then(() => {
            this.router.navigate(['home'])
        })
        .catch((error) => {
            console.log(error);
        });
    }

    check(){
        this.firebaseAuthService.getLoginStatus()
        .subscribe(
            res => {
                if(res){
                console.log(" you are logged in")
            }else{
                console.log("not logged in")
            }
        }
        )
    }
}