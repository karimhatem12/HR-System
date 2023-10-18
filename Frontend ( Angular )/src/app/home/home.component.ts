import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { EmployeeInterface } from '../employee-interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    todayDate: any
    searchTerm: string = '';
    Users: EmployeeInterface[] = [];
    constructor(private _EmployeeService: EmployeeService) {
        this.EmployeeData()
    }

    EmployeeData() {
        this._EmployeeService.EmployeeData().subscribe({
            next: (res: any) => {
                this.Users = res
                // this.todayDate = this.Users[4].last_login.toString().slice(0, 16);
            }
        })
    }

    DeleteEmployee(id: number) {
        this._EmployeeService.DeleteEmployee(id).subscribe({
            next: (res: any) => {
                this.EmployeeData()
            }
        })
    }

    Employee(id: number) {
        this._EmployeeService.Employee(id).subscribe({
            next: (res: any) => {
                this.EmployeeData()
            }
        })
    }
}
