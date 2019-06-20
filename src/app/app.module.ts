import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProductDetailComponent,
    AboutUsComponent,
    FaqComponent,  
    AdminloginComponent, LoginLayoutComponent,
    
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule, 
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path : '',
        component : HomeComponent
      },
      {
        path: "product-detail/:id",
        component : ProductDetailComponent
      },
      {
        path: "about-us",
        component : AboutUsComponent
      }, 
      {
        path: "faq",
        component : FaqComponent
      },   
      
      //Admin routes 
      { path: 'admin', component:LoginLayoutComponent, 
          children : [
              { path : '', component:AdminloginComponent }, 
              { path : 'login', component:AdminloginComponent }, 
          ]
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
