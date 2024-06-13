import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUri = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser= new User();

  constructor(private http: HttpClient) { }

  // Create 
  createUser(data): Observable<any> {
    const url = `${this.baseUri}/addUser`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get all 
  getUsers() {
    return this.http.get(`${this.baseUri}/getallUser`);
  }

  // Get by ID
  getUser(id): Observable<any> {
    const url = `${this.baseUri}/getUser/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update 
  updateUser(id, data): Observable<any> {
    const url = `${this.baseUri}/updateUser/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Delete 
  deleteUser(id): Observable<any> {
    const url = `${this.baseUri}/deleteUser/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }


// Create 
createProduct(data): Observable<any> {
  const url = `${this.baseUri}/addProduct`;
  return this.http.post(url, data)
    .pipe(
      catchError(this.errorMgmt)
    );
}

// Get all 
getProducts() {
  return this.http.get(`${this.baseUri}/getallProduct`);
}

// Get by ID
getProduct(id): Observable<any> {
  const url = `${this.baseUri}/getProduct/${id}`;
  return this.http.get(url, { headers: this.headers }).pipe(
    map((res: Response) => {
      return res || {};
    }),
    catchError(this.errorMgmt)
  );
}

// Update 
updateProduct(id, data): Observable<any> {
  const url = `${this.baseUri}/updateProduct/${id}`;
  return this.http.put(url, data, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
  );
}

// Delete 
deleteProduct(id): Observable<any> {
  const url = `${this.baseUri}/deleteProduct/${id}`;
  return this.http.delete(url, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
  );
}


setCurrentuser(user){
  this.currentUser=user;
}


getCurrentuser(){
  return this.currentUser;
}



// Error handling
errorMgmt(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}



}

