import { Component } from '@angular/core';
//import { RestService } from 'rest.service';
import { ActivatedRoute, Router } from '@angular/router';

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  title = 'shopping-app';

  // constructor(public rest:RestService ,private route: ActivatedRoute,private router: Router) { }
  // this.rest.getCategories().subscribe((data) => {
  //   this.categories = data.data;  
  //   console.log(this.products);       
  // });

}
