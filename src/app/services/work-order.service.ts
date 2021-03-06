import { Injectable, Inject } from '@angular/core';
import { apiUrl } from './user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { WorkOrder } from '../models/WorkOrder';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  @Inject(apiUrl)
  private apiUrl : string;
  addReportUrl: string = apiUrl + "/work-orders/create";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  addReport(workOrder: WorkOrder): Observable<WorkOrder>{
    console.log("inside add report", this.addReportUrl);
    return this.http.post<WorkOrder>(this.addReportUrl, workOrder, this.httpOptions)
      .pipe(tap(data => console.log(data)), catchError(this.handleError<WorkOrder>('add Work Order', null)));  
  }



/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
