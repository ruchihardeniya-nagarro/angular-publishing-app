import { Component, OnInit } from '@angular/core';
import { Auth, getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private afAuth: Auth,private router:Router, private authService:AuthService) { }
  ngOnInit(): void { 
  }
  loginWithGoogle() { 
    this.authService.loginWithGoogle();
  }
    
  
}
