import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';
import { Sport } from './sport';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.scss']
})
export class AddSportComponent implements OnInit {
  sport: Sport =new Sport();
  info:any
  public isVisible: boolean = false;
  constructor(private router: Router,
    
    private route: ActivatedRoute,private adminservice:AdminService) { }
adminId:number
  ngOnInit() {
  }
onSubmit(){
  this.addSport();
}

addSport(){
  //this.sport.adminId=parseInt(sessionStorage.getItem("userid"));
this.adminservice.addSport(this.sport).subscribe((result)=>{
  this.info=result;
  if (this.isVisible) { 
    return;
  } 
  this.isVisible = true;
  setTimeout(()=> this.isVisible = false,2500)
  if(result=="sport added successfully"){
   
  this.router.navigate(['../view-sports'],{relativeTo:this.route});
  }
 else
  this.router.navigate(['../add-sport'],{relativeTo:this.route});
  console.log(result);
})
}
}
