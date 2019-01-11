import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LookupService {

  public API = '//localhost:8080';
  public DEPARTMENT_API = this.API + '/department';

  constructor(private http: HttpClient) {
  }

  getAllDepartment(): Observable<any> {
    return this.http.get(this.DEPARTMENT_API+'/all');
  }

}
