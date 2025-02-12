import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {firebaseConfig } from '../../firebase.config'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';  // Updated import
import { provideAuth, getAuth } from '@angular/fire/auth';  // Updated for authentication
import { AngularFireModule} from '@angular/fire/compat';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component'
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";
import {  Auth, GoogleAuthProvider, signInWithRedirect } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { NavigationComponent } from './component/navigation/navigation.component';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ArticleDetailComponent } from './component/article-detail/article-detail.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { CreatePostComponent } from './component/create-post/create-post.component';
import { QuillModule } from 'ngx-quill';  // Quill editor module

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavigationComponent,
    ArticleDetailComponent,
    DialogComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,    
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot()
        
    

  ],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    AngularFireAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
