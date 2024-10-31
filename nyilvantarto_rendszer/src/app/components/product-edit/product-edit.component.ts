import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { User } from '../../models/user'
import { Product } from 'src/app/models/product';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  user = new User();
  username: string;
  name: string;
  email: string;
  id:string;
  product: any = new Product();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    private route:ActivatedRoute
  ) {
    
    this.getUser();
  }

  // get myForm() {
  //   return this.createForm.controls;
  // }

  submitted = false;

  createForm:FormGroup = this.formBuilder.group({
      name: [this.product.name],
      amount: [this.product.amount],
      unit: [this.product.unit],
      limit: [this.product.limit]
    
  });

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.route.params.subscribe(
      (params) =>{
        this.id=params['id'];
        this.apiService.getProduct(this.id).subscribe(
          (data) => {
            this.product=data;
            this.mainForm();
          }
        );
      })
  }

  mainForm() {
    this.createForm = this.formBuilder.group({
      name: [this.product.name],
      amount: [this.product.amount],
      unit: [this.product.unit],
      limit: [this.product.limit]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.createForm.valid) {
      return false;
    } else {
      let addThing=this.createForm.value;
      this.product.name=addThing.name;
      this.product.amount=addThing.amount;
      this.product.limit=addThing.limit;
      this.product.unit=addThing.unit;
      //addThing['container_id']=this.id;
      this.apiService.updateProduct(this.id,this.product).subscribe(
        (res) => {
          console.log('Product successfully edited!');
          this.ngZone.run(() => this.router.navigateByUrl('/product-list/'+this.product.container_id));
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
    this.router.navigateByUrl('product-list/'+this.id)
  }

  add(){
    this.router.navigateByUrl('product-create/'+this.id)
  }


}
