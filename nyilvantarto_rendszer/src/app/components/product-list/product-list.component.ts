import { Component, NgZone, OnInit } from '@angular/core';
import {ApiService} from 'src/app/service/api.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  Products: any=[];
  user= new User();
  username: string;
  name: string;
  email: string;
  id: string;
  displayedColumns: string[] = ["Név", "Mennyiség", "Mértékegység", "Lejárati idő"];
  search : String ="";
  

  dataSource = new MatTableDataSource(this.Products);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService:ApiService,
    private route:ActivatedRoute
    ) {
    this.mainForm();
    this.readProduct();
    this.getUser();

    }

    get myForm() {
      return this.createForm.controls;
    }

    submitted = false;

  createForm: FormGroup;

  ngOnInit(): void {
  }

  mainForm() {
    this.createForm = this.formBuilder.group({
      search: ['']
      
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.createForm.valid) {
      return false;
    } else {
      let id= this.router.url.toString();
      id=id.replace('/product-edit/:','');

      // let searchValue=this.createForm.value.search;
      // this.apiService.search(id, searchValue).subscribe((data)=>{
      //   this.setProductList(data);
      // });
    }
  }

  readProduct() {
    this.route.params.subscribe(
      (params) =>{
        this.id=params['id'];
    this.apiService.getProducts(this.id).subscribe((data) =>{
      this.setProductList(data);
    })
    });
  }
 
  setProductList(data){
    //console.log(data);
    this.Products=data;
    this.dataSource = new MatTableDataSource(this.Products);
    try{
    for (let index = 0; index < this.Products.length; index++)
      {
        //console.log(index)
      const element = new Date(this.Products[index].limit) ;
      this.Products[index].limit=element;
    }
    }
    catch(e){
      console.log(e.message);
    }
  }
  add(){
    this.router.navigateByUrl('/product-create/'+this.id);
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

    let id=this.Products[index]._id;
    this.router.navigate(['/product-edit/:'+ id]);

  }

  delete(index){

    this.apiService.deleteProduct(this.Products[index]._id ?? "").subscribe(() => {
      console.log("Deleted successfully!");
    });
    this.Products.splice(index,1);
  }

  colorRed(index){
    
    let now = Date.now();
    let limit = new Date(this.Products[index].limit).getTime();
    if(now-limit>=0){
      document.querySelectorAll("tr")[index+1].style.backgroundColor="red";
    }
    
  }
}
