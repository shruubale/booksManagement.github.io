import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Apphttp } from '../model/Apphttp';
import {
  addBook,
  allBooks,
  books,
  deleteBooks,
  updateBook,
} from '../model/response';

import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// import { Apphttp } from '../model/apphttp';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  // requestHeader = {
  // 	headers: new HttpHeaders({
  // 		'Content-Type': [],
  // 	})
  // };

  // node js API
  REST_API: string = 'http://localhost:5000';

  // set httpheader
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private showProgressSpinnerStatus: boolean = false;
  constructor(private httpClient: HttpClient) {}

  	// .....................................* Spinner *..................................... //

	setShowProgressSpinner(status) {
		this.showProgressSpinnerStatus = status;
	}

	getShowProgressSpinner() {
		return this.showProgressSpinnerStatus;
	}

  // add book
  // AddBook(data:any){
  //   let API_URL = `${this.REST_API}/add-book`
  //   return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
  // }

  AddBook(data) {
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post<addBook>(
      API_URL,
      data,
      Apphttp.requestHeadersJSON
    );
  }

  getBookList() {
    let API_URL = `${this.REST_API}/allBooks`;
    return this.httpClient.get<allBooks>(API_URL, Apphttp.requestHeadersJSON);
  }

  // categroies(){
  //  let url = 'https://api.storerestapi.com/categories';
  //  return this.httpClient.get(url);
  // }

  getBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/get-book/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  updateBook(id: any, data: any): Observable<any> {
    // let API_URL = `${this.REST_API}/update-book/${id}`;
    // return this.httpClient
    //   .put(API_URL, data, { headers: this.httpHeaders })
    //   .pipe(catchError(this.handleError));

    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put<updateBook>(
      API_URL,
      data,
      Apphttp.requestHeadersJSON
    );
  }

  deleteBook(id: any) {
    // let API_URL = `${this.REST_API}/delete-book/${id}`;
    // return this.httpClient
    //   .delete(API_URL, { headers: this.httpHeaders })

    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete<deleteBooks>(
      API_URL,
      Apphttp.requestHeadersJSON
    );
  }

  // handlerError error
  handleError(error: HttpErrorResponse) {
    let errMsg = '';
    if (error.error instanceof ErrorEvent) {
      //handle client error
      errMsg = error.error.message;
    } else {
      // handle server error
      errMsg = `error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errMsg);
    return throwError(errMsg);
  }
}
