import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ 
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  productDetail:any = [];
  productImages:any = [];
  ngOnInit() {   
     console.log(this.route.snapshot.params);
    this.rest.getProductDetail(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.productDetail = data; 
      console.log(this.productDetail);    
      this.productImages = this.productDetail.data.image_data; 
      console.log(this.productImages);
      
    });  



    
  }

}
