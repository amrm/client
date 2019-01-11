
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../shared/employee/employee.service';
import { LookupService } from '../shared/lookup/lookup.service';
import { TokenStorageService } from '../shared/auth/token-storage.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit, OnDestroy {

  employee: any = {};
  departments: Array<any>;
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private lookupService: LookupService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {

    if (this.tokenStorage.getToken()){
      this.tokenStorage.constructAuth();
      if(!this.tokenStorage.isLogged || this.tokenStorage.authority !== 'admin'){
        this.router.navigate(['/home', {  }]);
      }
    }
    else {
      this.router.navigate(['/auth/login', {  }]);
    }

    this.sub = this.route.params.subscribe(params => {
      this.lookupService.getAllDepartment().subscribe((departments: any) => {
        this.departments=departments;
      });

      const id = params['id'];
      if (id) {
        this.employeeService.get(id).subscribe((employee: any) => {
          if (employee) {
            this.employee = employee;
          } else {
            console.log(`Employee with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        }, error =>{ console.error(error);this.gotoList();});
      }
      else {
        this.employee={department:{}};
        this.employee.department=this.departments[0];
      }
    });

}

ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }

  save(form: NgForm) {
    form['department']={id:form['departmentId']};
    this.employeeService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(id) {
    this.employeeService.remove(id).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
