import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    errorMessage: string = ''
    isLoading: boolean = false
    showPassword: boolean = false

    registerForm = new FormGroup({
        "first_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        "last_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        "email": new FormControl(null, [Validators.required, Validators.email]),
        "password": new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}')]),
        "group": new FormControl(null, [Validators.required]),
    })
    constructor(private _EmployeeService: EmployeeService, private _Router: Router) { }
    showHidePassword() {
        if (this.showPassword == false) {
            this.showPassword = true
        } else {
            this.showPassword = false
        }
    }
    sendData(data: FormGroup) {
        console.log(data)
        this.isLoading = true
        this._EmployeeService.AddEmployee(data.value).subscribe({
            next: (res: any) => {
                this.errorMessage = ''
                console.log(res)
                this._Router.navigate(['/home'])
            },
            error: (err) => {
                this.isLoading = false

                console.log(err)
                if (err.error) {
                    this.errorMessage = JSON.stringify(err.error)
                }
            },
            complete: () => {
                this.isLoading = false;
                console.log("Done")
            }
        })
    }
}
