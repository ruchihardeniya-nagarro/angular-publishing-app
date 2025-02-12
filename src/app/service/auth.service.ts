import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth,
  private router:Router) { }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.router.navigate(['/dashboard']);
      // Handle the result
      console.log(result);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }

  async loginWithGoogle() {
    const userCred = await signInWithPopup(this.auth, new GoogleAuthProvider());
    if (userCred?.user) {
      localStorage.setItem('currentUser', JSON.stringify(userCred.user));
      this.router.navigate(['/dashboard']);
      return userCred.user;
    } else { 
      this.router.navigate(['/login']);
      return null;
    }
  }

  isLoggedIn() { 
    if (localStorage.getItem('currentUser')) {
      localStorage.setItem('isLoggedIn', 'true');
      return true
    }  
     localStorage.setItem('isLoggedIn', 'false');
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    localStorage.setItem('isLoggedIn', 'false');
  }

  getUser():any { 
    let user = localStorage.getItem('currentUser');
    return user;
  }
  
}
