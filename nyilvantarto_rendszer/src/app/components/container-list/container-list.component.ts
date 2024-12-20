import { Component, OnInit } from '@angular/core';
import {ApiService} from 'src/app/service/api.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Container } from 'src/app/models/container';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.css']
})
export class ContainerListComponent implements OnInit {

  Containers: any=[];
  user= new User();
  username: string;
  name: string;
  email: string;
  id: string;
  sharedContainers: any=[];
  redContainers:number[]=[];
  sharedRedContainers: number[]=[];
  
  

  constructor(
    private router: Router,
    private apiService:ApiService,
    private route:ActivatedRoute

    ) {
    this.readContainer();
    this.getUser();
    this.sharedContainer();
    }

  ngOnInit(): void {
  }

  readContainer() {
    this.route.params.subscribe(
      (params)=>{
        this.id=params['id'];
        this.apiService.getContainers(this.id).subscribe((data) =>{
          this.Containers=data;
          try{
            this.colorRed();
          }catch{
            console.log(this.Containers);
          }
        });
      }
    )
    
  }

  sharedContainer() {
    this.route.params.subscribe(
      (params)=>{
        this.id=params['id'];
        this.apiService.getSharedContainers(this.id).subscribe((data) =>{
          this.sharedContainers=data;
          
          
          try{
            this.colorRedShared();
          }
          catch(e){
            console.log(e.message);
          }
        });
      }
    )
    
  }


  add(){
    this.router.navigateByUrl('/container-create/'+this.id);
  }

  getUser(){

    if (this.apiService.getCurrentuser().userName== null){
      this.router.navigate(['/login']);
    }

    this.user=this.apiService.getCurrentuser();
    this.name= JSON.stringify(this.user.name)
    this.username= JSON.stringify(this.user.userName)
    this.email= JSON.stringify(this.user.email)
  }


  logout(){
    this.user= new User()
    this.apiService.setCurrentuser(this.user);
    this.router.navigate(['/login']);
  }


  edit(index){

    let id=this.Containers[index]._id;
    this.router.navigate(['/container-edit/'+ id]);

  }

  delete(index){
    let message = confirm("Biztos, hogy törli?")
    if(message){
      this.apiService.deleteContainer(this.Containers[index]._id ?? "").subscribe(() => {
        console.log("Deleted successfully!");
        this.Containers.splice(index,1);
      });
    } 
  }

  open(index){
    let id=this.Containers[index]._id;
    this.router.navigate(['/product-list/'+ id]);
  }

  openshared(index){
    let id=this.sharedContainers[index]._id;
    this.router.navigate(['/product-list/'+ id]);
  }

  share(index){
    let id=this.Containers[index]._id;
      this.router.navigate(['/container-share/'+ id]);
  }

  colorRed(){
    let now = new Date();
    for( let i = 0; i< this.Containers.length; i++){
      this.apiService.getLimits(this.Containers[i]._id).subscribe((data)=>{
        let limit="";
        try{
          limit = data;
        }catch{
          console.log(data);
        }
        if (limit != ""){
          let limitDate = new Date(limit);
          if(now>=limitDate&&this.redContainers.indexOf(i)==-1){
            this.redContainers.push(i);
          }
        }
      });
    }
  }
 
  colorRedShared(){
    let now = new Date();
    for( let i = 0; i< this.sharedContainers.length; i++){
      this.apiService.getLimits(this.sharedContainers[i]._id).subscribe((data)=>{
        let limit="";
        try{
          limit = data;
        }catch{
          console.log(data);
        }
        if (limit != ""){
          let limitDate = new Date(limit);
          if(now>=limitDate&&this.sharedRedContainers.indexOf(i)==-1){
            this.sharedRedContainers.push(i);
          }
        }
      });
    }
  }
}


