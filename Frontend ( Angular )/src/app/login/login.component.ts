import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    errorMessage: string = ''
    isLoading: boolean = false
    showPassword: boolean = false

    loginForm = new FormGroup({
        "email": new FormControl(null, [Validators.required, Validators.email]),
        "password": new FormControl(null, [Validators.required]),
    })
    constructor(private _AuthService: AuthService, private _Router: Router) { }
    showHidePassword() {
        if (this.showPassword == false) {
            this.showPassword = true
        } else {
            this.showPassword = false
        }
        console.log(this.showPassword)
    }
    sendData(data: FormGroup) {
        this.isLoading = true
        this._AuthService.login(data.value).subscribe({
            next: (res: any) => {
                this.errorMessage = ''
                console.log(res.token)
                if (res.message == "Logged in successfully") {
                    localStorage.setItem('userToken', res.token.toString())
                    this._Router.navigate(['/home'])
                }
            },
            error: (err) => {
                this.isLoading = false

                console.log(err)
                if (err.error.errors) {
                    this.errorMessage = err.error.errors.msg
                } else if (err.error.message) {
                    this.errorMessage = err.error.message
                }
            },
            complete: () => {
                this.isLoading = false;
                console.log("Done")
            }
        })
    }
}
