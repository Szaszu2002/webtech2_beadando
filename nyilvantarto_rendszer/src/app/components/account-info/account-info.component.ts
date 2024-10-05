import { Component, OnInit } from '@angular/core';
import {ApiService} from 'src/app/service/api.service';
import { User } from '../../models/user'
import { Router} from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  user= new User();
  username: string;
  name: string;
  email: string;
  

  constructor(
    private router: Router,
    private apiService:ApiService

    ) {
    this.getUser();

    }

  ngOnInit(): void {
  }

  getUser(){

    if (this.apiService.getCurrentuser().userName== null){
      this.router.navigate(['/login']);
    }

    this.user=this.apiService.getCurrentuser();
    this.name= this.user.name
    this.username= this.user.userName
    this.email= this.user.email
  }

  back(){
    
    this.router.navigateByUrl('/container-list/'+ this.username);
  }
  
  logout(){
    this.user= new User()
    this.apiService.setCurrentuser(this.user);
    this.router.navigate(['/login']);
  }
}
