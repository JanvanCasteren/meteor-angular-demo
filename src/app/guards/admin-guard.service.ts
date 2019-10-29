import {Injectable} from '@angular/core';
import {
  CanActivate, Router
} from '@angular/router';
import {filter} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): Observable<boolean> {
    console.log('canActivate');
    if (this.authService.isLoggedIn()) {
      return this.authService.isAdmin$
        .pipe(filter(value => value != null));
    } else {
      this.router.navigate(['/login']);
    }
  }

}
