import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public API = '//localhost:8080';
  public EMPLOYEE_API = this.API + '/employee';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.EMPLOYEE_API+'/all');
  }

  getList(page:number,size:number): Observable<any> {
    return this.http.get(this.EMPLOYEE_API+'/pagination?page'+page+"&size="+size);
  }

  get(id: number) {
    return this.http.get(this.EMPLOYEE_API + '/' + id);
  }

  save(employee: any): Observable<any> {
    let result: Observable<Object>;
    if (employee['id']) {
      result = this.http.put(this.EMPLOYEE_API+'/'+employee['id'], employee);
    } else {
      result = this.http.post(this.EMPLOYEE_API, employee);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(this.EMPLOYEE_API+'/'+id);
  }

  search(name:string): Observable<any> {
    return this.http.get(this.EMPLOYEE_API+'/search?name='+name);
  }

}
