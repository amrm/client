import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../shared/employee/employee.service';
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { TokenStorageService } from '../shared/auth/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Array<any>;
  searchName: string = '';

  employeesDataSource = new MatTableDataSource(this.employees);

   displayedColumns: string[] = [
     "id",
     "name",
     "email",
     "salary",
	   "department",
	   "edit"
  ];

  constructor(private employeeService: EmployeeService,
              private tokenStorage: TokenStorageService,private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    if (this.tokenStorage.getToken()){
      this.tokenStorage.constructAuth();
      if(this.tokenStorage.isLogged && this.tokenStorage.authority === 'admin'){
        this.employeeService.getAll().subscribe(data => {
          this.employees = data;
          this.employeesDataSource.data = this.employees;
          this.employeesDataSource.paginator = this.paginator;
        });
      }
      else {
        this.router.navigate(['/home', {  }]);
      }
    }
    else {
      this.router.navigate(['/auth/login', {  }]);
    }
  }

  search() {
    this.employeeService.search(this.searchName).subscribe(data => {
      this.employees = data;
      this.employeesDataSource.data = this.employees;
      this.employeesDataSource.paginator = this.paginator;
    });
  }

}
