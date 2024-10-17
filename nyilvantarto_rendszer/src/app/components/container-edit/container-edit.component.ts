import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { User } from '../../models/user'
import { Container } from 'src/app/models/container';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-container-edit',
  templateUrl: './container-edit.component.html',
  styleUrls: ['./container-edit.component.css']
})
export class ContainerEditComponent implements OnInit {

  user= new User();
  username: string;
  name: string;
  email: string;
  id:string;
  container: any = new Container();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    private route:ActivatedRoute
  ) {
    
    this.getUser();
  }

 

  submitted = false;

  createForm:FormGroup = this.formBuilder.group({
    name: [this.container.name],
    limit: [this.container.limit]
  
});

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.route.params.subscribe(
      (params) =>{
        this.id=params['id'];
        this.apiService.getContainer(this.id).subscribe(
          (data) => {
            this.container=data;
            this.mainForm();
          }
        );
      })
  }

  mainForm() {
    this.createForm = this.formBuilder.group({
      name: [this.container.name],
      limit: [this.container.limit]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.createForm.valid) {
      return false;
    } else {
      let addThing=this.createForm.value;
      this.container.name=addThing.name;
      this.container.limit=addThing.limit;
      // addThing['user_id']=this.id;
      // console.log("id: "+ this.id)
      this.apiService.updateContainer(this.id, this.container).subscribe(
        (res) => {
          console.log('Container successfully edited!');
          this.ngZone.run(() => this.router.navigateByUrl('/container-list/'+this.container.user_id));
        }, (error) => {
          console.log(error);
        });
      // let id= this.router.url.toString();
      // id=id.replace('/product-edit/:','');

      // this.apiService.updateProduct(id,this.createForm.value).subscribe(
      //   (res) => {
      //     console.log('Product updated successfully!');
      //     this.ngZone.run(() => this.router.navigateByUrl('/product-list'));
      //   }, (error) => {
      //     console.log(error);
      //   });
    }
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

  back(){
    this.router.navigateByUrl('container-list/'+this.user._id)
  }

  add(){
    this.router.navigateByUrl('container-create/'+this.user._id)
  }


}
