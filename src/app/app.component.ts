import { Component } from '@angular/core';
// import { AuthService } from './service/auth.service';
import {  Auth, GoogleAuthProvider, signInWithRedirect } from '@angular/fire/auth';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'publishing-plateform';
  user: any;

//   constructor(private afAuth: Auth) {
//   }
// loginWithGoogle() {
//           signInWithRedirect(this.afAuth, new GoogleAuthProvider());
//   }
  showHead: boolean = false;
  constructor(private router: Router) {
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login') {
            this.showHead = false;
          } else {
            this.showHead = true;
          }
        }
      });
    }
    
}
