import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
    let _Router = inject(Router)
    if (localStorage.getItem('userToken')) {
        return true;
    } else {
        _Router.navigate(['/login'])
        return false;
    }
    return true
};