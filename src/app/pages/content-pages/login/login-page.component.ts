import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/service/auth.service';
import { TokenStorageService } from 'app/service/token-storage.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
    form: any = {
        username: null,
        password: null
      };
      showAdminBoard = false;
      showUserBoard = false;
      
      isLoggedIn = false;
      isLoginFailed = false;
      errorMessage = '';
      roles: string[] = [];
      constructor(private authService: AuthService,  private _router: Router, private tokenStorage: TokenStorageService ) { }
      ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
          this.showUserBoard = this.roles.includes('ROLE_USER');
          console.log(this.tokenStorage.getToken());
          
          this.tokenStorage.saveToken(this.tokenStorage.getToken());
        this.tokenStorage.saveUser(this.tokenStorage.getUser());
      
       
        }
    }

    onrefresh(){
    localStorage.clear();
    }
 
    onSubmit(f : NgForm): void {
        console.log("f" , f);
        const { username, password } = this.form;
        this.authService.login(username, password).subscribe({
          next: data => {
            
            
            console.log(data);
            
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
            console.log("from on submit login component ");
            if(this.roles[0]=='ROLE_ADMIN'){
      
              this._router.navigate(['/dashboard/dashboard1'])}
        
              else if (this.roles[0]=='ROLE_USER'){
                this._router.navigate(['/pages/error'])
        
              }
         
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
        });
      }



    // On Forgot password link click
    onForgotPassword() {
    }
    // On registration link click
    onRegister() {
    }


}
