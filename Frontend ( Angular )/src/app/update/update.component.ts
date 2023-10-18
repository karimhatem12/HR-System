import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
    Users: any
    isLoading: boolean = false
    EmployeeId: number = NaN;
    constructor(private _EmployeeService: EmployeeService, private _ActivatedRoute: ActivatedRoute, private _Router: Router) {
        this.EmployeeId = _ActivatedRoute.snapshot.params['id']
        this.Employee(this.EmployeeId)
    }

    UpdateForm = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        attendance: new FormControl(null, [Validators.required]),
        group: new FormControl(null, [Validators.required]),
    })


    Employee(id: number) {
        this._EmployeeService.Employee(id).subscribe({
            next: (res: any) => {
                this.Users = res
                console.log(this.Users)
            }
        })
    }
    UpdateEmployee(data: any) {
        console.log()
        this.isLoading = true
        this._EmployeeService.UpdateEmployee(this.EmployeeId, this.Users).subscribe({
            next: (res: any) => {
                this.isLoading = false
                console.log(res)
                this._Router.navigate(['/home'])
            }, error: (res: any) => {
                this.isLoading = false
                console.log(res)
            }
        })
    }
}
