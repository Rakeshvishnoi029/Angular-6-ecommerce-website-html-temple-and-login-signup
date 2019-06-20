import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
//import { $ } from 'protractor'; 
import * as $ from "jquery";


@Component({ 
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})
export class HeaderComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,
    public rest:RestService ,
    private route: ActivatedRoute,
    private router: Router) { }
    categories:any = [];
    successMessage = '';  
    ErrorMessage = '';  
    responseErrorMsg = '';  
    formdata;
    myGroup;
    submitted;
    formGroup: FormGroup;
    private fb: FormBuilder;
    registerForm: FormGroup;
    loginForm: FormGroup;
    loading = false; 
    AuthUser = false; 
    showLoginPopup = false; 
    returnUrl: string;  
  
  ngOnInit() {
      
      this.rest.getCategories().subscribe((data) => {
          if(data.status == 200){
            this.categories = data.data; 
            console.log(data);    
          }else{
            console.log(data.message);     
          }  
      });  
      this.registerForm = this.formBuilder.group({
          first_name: ['', Validators.required],
          last_name: ['', Validators.required], 
          email: ['', [Validators.required, Validators.email]],
          phone: ['', [Validators.required,  Validators.pattern('[6-9]\\d{9}')]],  
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
          address: ['',Validators.required] 
      }); 

      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });   
      
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      var AuthUser1 = localStorage.getItem('AuthUser'); 
      if(AuthUser1){
        this.AuthUser = true; 
      }
      
      
      
  } 

  public categoryChange(event ) {
    const category_id = event.target.value; 
    window.location.replace(environment.baseUrl+'?category_id='+category_id);
     
  }    
  redirectTo(uri) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }

  // convenience getter for easy access to form fields
  get getFormControl() { 
   
      return this.registerForm.controls; 
  }   
  get getFormControlLogin() { 
      return this.loginForm.controls;   
  }   


  onClickSubmit() { 
      this.submitted = true;   
        console.log(this.registerForm.value); 
      // stop here if form is invalid
        if (this.registerForm.invalid) { 
          return;
        } 
        this.registerForm.value.contact_number = this.registerForm.value.phone; 
        this.registerForm.value.role_id = 1;
        this.registerForm.value.account_type = 1;
        this.registerForm.value.longitude = '7878785454.14'; 
        this.rest.register(this.registerForm.value).subscribe((data) => { 
          
          if(data.status == 200){ 
              this.submitted = false; 
              this.registerForm.reset();
              this.successMessage = data.message;
              this.ErrorMessage = '';    
          }else{
              this.ErrorMessage = data.message; 
              this.successMessage = ''; 
          }  
          console.log(data);        
      });   
  } 

  login() { 
 
    
    this.loading = true;
    this.submitted = true;   
      console.log(this.loginForm.value); 
    // stop here if form is invalid
      if (this.loginForm.invalid) { 
        return;
      }     
      this.loginForm.value.role_id = 1; 
      this.loginForm.value.device_token = 1; 
      this.loginForm.value.device_type  = 1; 
      this.rest.login(this.loginForm.value).subscribe((data) => { 
        
        if(data.status == 200){  
            this.submitted = false; 
            this.registerForm.reset();
            this.successMessage = data.message;
            this.ErrorMessage = '';    
            // get return url from route parameters or default to '/'
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('AuthUser', JSON.stringify(data.data));
            location.reload(true);    
            //this.router.navigate(['']);    
            $('.closeModal').trigger('click');   
        }else{
 
            this.ErrorMessage = data.message;  
            this.successMessage = ''; 
            this.loading = true;
        }  
        console.log(data);        
    });    
  }

  logout() { 
      // remove user from local storage to log user out
      localStorage.removeItem('AuthUser'); 
      //this.router.navigate(['']);     
      location.reload(true);   
  } 

  
}
