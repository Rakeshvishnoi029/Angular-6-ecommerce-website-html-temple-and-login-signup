import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'; 

const endpoint = 'http://192.168.1.151:8082/api/';
const cAPPServer = 'http://192.168.1.151:8082/api/';
//const endpoint = 'https://jsonplaceholder.typicode.com/posts';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};  

@Injectable({
  providedIn: 'root'
})
 
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  // get all products 
  register(formData): Observable<any> {
    return this.http.post(cAPPServer+'/customer/sign-up/', formData).pipe(
      map(this.extractData)); 
    //return this.http.post(endpoint+'dealList', {category_id: 2}); 
  }  
  // get all products 
  login(formData): Observable<any> {
    return this.http.post(cAPPServer+'/customer/login/', formData).pipe(
      map(this.extractData));  
    //return this.http.post(endpoint+'dealList', {category_id: 2}); 
  }  
  // get all products 
  getProducts(category_id): Observable<any> {
    return this.http.get(cAPPServer+'Products/getProductlist/?category_id='+category_id).pipe(
        map(this.extractData),
        catchError(this.handleError)
      ); 
    //return this.http.post(endpoint+'dealList', {category_id: 2}); 
  }   

  // get product details   
  getProductDetail(id): Observable<any> {
    return this.http.get(endpoint + 'dealDetails?id='+id).pipe(
      map(this.extractData));
  } 

  // get product details   
  getCategories(): Observable<any> {
    return this.http.get(endpoint + 'customer/categoryList').pipe(
      map(this.extractData)); 
  } 
  
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      //errorMessage = `Error: ${error.error.message}`;
      errorMessage = `Server not responding.`;
    } else {
      // server-side error
      //errorMessage = `Error Code: ${error.status}nMessage: ${error.message}`;
      errorMessage = `Server not responding.`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  private handleError000<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(' Error found from server side ')
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // sample method from angular doc
  private handleError00 (error: HttpErrorResponse) {
      // TODO: seems we cannot use messageService from here...
      let errMsg = (error.message) ? error.message : 'Server error';
      console.error(errMsg);
      // if (error.status === 401 ) {
      //     window.location.href = '/';
      // } 
      return Observable.throw(errMsg);
  }



}
