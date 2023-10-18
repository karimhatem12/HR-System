import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeInterface } from './employee-interface';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    userData = new BehaviorSubject(null);
    constructor(private _HttpClient: HttpClient) {
        if (localStorage.getItem('userToken')) {
            let decoded: any = JSON.stringify(localStorage.getItem('userToken'))
            this.userData.next(decoded);
        }
    }
    EmployeeData(): Observable<any> {
        return this._HttpClient.get('http://127.0.0.1:8000/api/users/', {})
    }
    Employee(id: number): Observable<any> {
        return this._HttpClient.get(`http://127.0.0.1:8000/api/users/${id}/`, {})
    }
    UpdateEmployee(id: number, data: EmployeeInterface): Observable<any> {
        console.log(data)
        return this._HttpClient.patch(`http://127.0.0.1:8000/api/users/${id}/`, data)
    }
    AddEmployee(data: any): Observable<any> {
        console.log(data)
        return this._HttpClient.post('http://127.0.0.1:8000/api/users/', data)
    }
    DeleteEmployee(id: number): Observable<any> {
        return this._HttpClient.delete(`http://127.0.0.1:8000/api/users/${id}/`, {})
    }
}
