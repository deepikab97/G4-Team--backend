import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AdminService } from 'src/app/shared/admin.service';
interface Manager{
  firstName: string;
  lastName: string;
  email:string;
  joiningDate: Date;
  active:boolean;
}

@Component({
  selector: 'app-view-managers',
  templateUrl: './view-managers.component.html',
  styleUrls: ['./view-managers.component.scss']
})

 
export class ViewManagersComponent implements OnInit {
  
  message:string;
  public isVisible: boolean = false;
  constructor(private service: AdminService) { }
 
  public displayedColumns = ['firstName', 'lastName', 'email', 'joiningDate', 'active','action'
];
public dataSource = new MatTableDataSource<Manager>();

  ngOnInit() {
   /* this.service.getManagerList().subscribe((result:any)=>
    {
      this.managers=result;
      console.log(result);
    },
      error=>console.log(error));*/
      this.service.getManagerList().subscribe(
        result=>{
          console.log(result);
          
          this.dataSource.data = result as Manager[];
        },
        error=>{
          console.log(error);
        }
      )
  }
  
 
  

  deactivate(id:number){
    
    this.service.deactivateManager(id).subscribe((data:any)=>{
      console.log(data)
      this.message=data;
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
      this.ngOnInit();
      },
      error=>{  console.log(error);
      })

  }

  activate(id:number){
    this.service.activateManager(id).subscribe((data:any)=>{
      this.message=data;
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
      this.ngOnInit();
    },
    error=>{console.log(error);
    }
    )
  }

}
