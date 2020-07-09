import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {AuthService} from '../../../shared/auth/auth.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                private formBuilder: FormBuilder,) { }
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    loginForm: FormGroup;
    password: string;
    username: string;

    get f() {
        return this.loginForm.controls; }

    // On submit button click
    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        this.authService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['dashboard/dashboard1']);
                },
             );
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }


}
