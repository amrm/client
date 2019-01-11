import { Component } from '@angular/core';
import { TokenStorageService } from './shared/auth/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';

  private authority: string;
  private isLogged: boolean;

  constructor(private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()){
      this.tokenStorage.constructAuth();
      this.isLogged=this.tokenStorage.isLogged;
      this.authority=this.tokenStorage.authority;
    }
  }

  logout() {
    this.authority=null;
    this.isLogged=false;
    this.tokenStorage.signOut();
    this.router.navigate(['/auth/login', {  }]);
  }

}
