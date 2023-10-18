import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

    isLogedIn: boolean = false
    myCartNum: number = 0
    constructor(private _AuthService: AuthService) {
        _AuthService.userData.subscribe({
            next: () => {
                if (_AuthService.userData.getValue()) {
                    this.isLogedIn = true
                } else {
                    this.isLogedIn = false
                }
            }
        })

    }

    LogOut() {
        this.isLogedIn = false
        localStorage.removeItem('userToken')
    }
}
