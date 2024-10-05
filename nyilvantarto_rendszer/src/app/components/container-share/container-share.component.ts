import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { User } from '../../models/user'
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatCard } from '@angular/material/card';
import { Container } from 'src/app/models/container';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-container-share',
  templateUrl: './container-share.component.html',
  styleUrls: ['./container-share.component.css']
})
export class ContainerShareComponent implements OnInit {


  container:any= new Container();
  shared:[];
  username:string;
  
  


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.mainForm();
    
  }

  get myForm() {
    return this.createForm.controls;
  }

  submitted = false;

  createForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.getContainer();
  }

  mainForm() {
    this.createForm = this.formBuilder.group({
      username: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.createForm.valid) {
      return false;
    } else {
      let username =this.createForm.value.username;
      let shared_user:any = new User() 
      this.apiService.getUser(username).subscribe((data)=>{
        let addThing={}
        shared_user=data;
      addThing['userName']=shared_user.userName;
      addThing['name']=shared_user.name;
        console.log(data);
      console.log(this.container.shared)
      if(this.container['shared'].includes(addThing)) return;
      this.container['shared'].push(addThing);
      this.apiService.updateContainer(this.container._id, this.container).subscribe(
        (res) => {
          console.log('Container successfully created!');
          this.ngZone.run(() => this.router.navigateByUrl('/container-share/'+this.container._id));
        }, (error) => {
          console.log(error);
        });
      })
      
      // if(!(addThing in this.container.shared_user)){

      // }
      
    }
  }

  getContainer(){
    
    if (this.apiService.getCurrentuser().userName== null){
      this.router.navigate(['/login']);
    }
    this.route.params.subscribe(
      (params)=>{
       this.apiService.getContainer(params.id).subscribe((data)=>{
        this.container=data;
        this.username= this.container.user_id;
        this.shared=this.container.shared;
        console.log("Container: "+this.container[0])
       });
        
        
      });
    
  }

  getShared(){
    this.shared=this.container.shared;
  }


  logout(){
    let user= new User()
    this.apiService.setCurrentuser(user);
    this.router.navigate(['/login']);
  }

  back(){
    this.router.navigateByUrl('container-list/'+this.container.user_id)
  }

  delete(index){
    this.shared.splice(index, 1);
    
    this.container.shared=this.shared
    this.apiService.updateContainer(this.container._id, this.container).subscribe(
      (res) => {
        console.log('Container successfully deleted!');
        this.ngZone.run(() => this.router.navigateByUrl('/container-share/'+this.container._id));
      }, (error) => {
        console.log(error);
      });
  }

}
