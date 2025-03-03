import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from '../../interface/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  user!: User;
  userName: string = '';
  showlogin: boolean = false
  logout() {
    this.authService.logout();
  }
  ngOnInit() {
  }
  isLoggedIn() {
    // const user = this.authService.isLoggedIn();
    if (this.authService.isLoggedIn()) {
      return true
    }
    return false;
  }
  
  getUserInfo() {
    this.user = JSON.parse(this.authService.getUser());
    this.userName = this.user?.displayName
  }

  createPost() { 
    this.router.navigate(['/create-post'])
  }
  authorPage(){ 
      this.router.navigate(['/author-directory'])
  }
}

