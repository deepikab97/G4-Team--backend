import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/shared/manager.service';
import { UserService } from 'src/app/shared/user.service';
import { Batch } from 'src/app/models/batch';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss']
})
export class AddBatchComponent implements OnInit {

  batchForm: FormGroup;
  sports:any=[];
  message:String;
  batch: Batch = new Batch();
  submitted=false;
  public isVisible: boolean = false;
 
  constructor(private managerService: ManagerService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }
  
  ngOnInit() {

    this.batchForm = this.formBuilder.group({

      sportId: ['',Validators.required],
      startTime: ['',Validators.required],
      endTime: ['',Validators.required],
      size: ['',[Validators.required,Validators.min(10),Validators.max(50)]],


    });
  

    this.userService.getActiveSports().subscribe(
      data=>{
        console.log(data);
        this.sports=data;
      },
      error=>{console.log(error);}
    )
  }

  get f() { return this.batchForm.controls; }

  onSubmit(){

    this.submitted=true;

    if (this.batchForm.invalid) {
      
      return;
   }
   else{
    this.submitted=false;
    this.addBatch();
    
   }
   
  
    
  }

  addBatch(){
    this.batch.managerId=parseInt(sessionStorage.getItem("userid"));
    console.log(this.batch);
    this.managerService.addBatch(this.batch).subscribe(
      data=>{

        console.log(data);
        this.message=data.toString();
        if (this.isVisible) { 
          return;
        } 
        this.isVisible = true;
        setTimeout(()=> this.isVisible = false,2500)
        

        console.log(data)

      },
      error=>{
        console.log(error)
      }
    )
  }
}