import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData = new BehaviorSubject(null);
    constructor(private _HttpClient: HttpClient) {
        if (localStorage.getItem('userToken')) {
            let decoded: any = JSON.stringify(localStorage.getItem('userToken'))
            this.userData.next(decoded);
        }
    }

    register(data: FormGroup): Observable<any> {
        return this._HttpClient.post('http://127.0.0.1:8000/api/users/', data)
    }

    login(data: FormGroup): Observable<any> {
        console.log(data)
        return this._HttpClient.post('http://127.0.0.1:8000/login/', data)
    }

    logout(): Observable<any> {
        return this._HttpClient.post('http://127.0.0.1:8000/logout/', {})
    }

}
