import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  //constructor(private httpClient: HttpClient) { }
  constructor( 
      public rest:RestService ,
      private route: ActivatedRoute,
      private router: Router,
  ) {
       
   }
  nutsProducts =  []; 
  isSubmitting = false;
  oilProducts =  [];  
  noodleProducts =  []; 
  noImageProduct = '';
  weolcome_word = '';    
  category_id = '';
  param1: string;
  products:any = [];
  categories:any = [];
  ngOnInit() { 
 
    
    this.oilProducts = [
      { id: 1, name: 'Oil product 1, 100g','price':'$149', 'display_price':'$169','image':'http://localhost:4200/assets/images/mk5.jpg'},
      { id: 2, name: 'Oil profuct 2 , 100g','price':'$200', 'display_price':'$220','image':'http://localhost:4200/assets/images/mk6.jpg'},
      { id: 3, name: 'Oil product 3, 1L','price':'$400', 'display_price':'$500','image':'http://localhost:4200/assets/images/mk7.jpg'},
    ]; 

    this.noodleProducts = [
      { id: 1, name: 'Noodle Peoduct1, 100g','price':'$149', 'display_price':'$169','image':'http://localhost:4200/assets/images/mk8.jpg'},
      { id: 2, name: 'Noodle product 2 , 100g','price':'$200', 'display_price':'$220','image':'http://localhost:4200/assets/images/mk9.jpg'},
      { id: 3, name: 'Noodle product 3','price':'$400', 'display_price':'$500','image':'http://localhost:4200/assets/images/mk9.jpg'},
    ];      
    this.weolcome_word = 'This is welcome word. '; 
    this.noImageProduct = 'http://192.168.1.151:8082/images/No_Image_Available.png';     
    this.products = []; 
      
    this.route.queryParams.subscribe(params => {
        if(params['category_id']){
            this.category_id = params['category_id']; 
        } 
    });   
    this.rest.getProducts(this.category_id).subscribe((data) => { 
            if(data.status == 200){
              this.products = data.data.product_list;  
            }else{ 
              console.log(data);     
            }         
        },
        error => {                     
          // redirect to some error component
        } 
    );   
  }  

  onClickSubmit(data) {
    alert("Entered Email id : " + data.emailid);
 }
 
  // submitForm() {
  //   this.isSubmitting = true;
  //   this.errors = {errors: {}};
  //   const credentials = this.authForm.value;
  //   this.userService
  //   .attemptAuth(this.authType, credentials)
  //   .subscribe(
  //     data => this.router.navigateByUrl('/'),
  //     err => {
  //       this.errors = err;
  //       this.isSubmitting = false;
  //     }
  //   );
  // }
 
  

}

