import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ArticleDetailComponent } from './component/article-detail/article-detail.component';
import { CreatePostComponent } from './component/create-post/create-post.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthorDashboardComponent } from './component/author-dashboard/author-dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'article-detail/:id', component: ArticleDetailComponent },
  {
    path: 'create-post',
    component: CreatePostComponent, 
    canActivate: [AuthGuard] // Only accessible if the guard passes
  },
  {
    path: "author-directory",
    component: AuthorDashboardComponent,
    canActivate: [AuthGuard] // Only accessible if the guard passes
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
