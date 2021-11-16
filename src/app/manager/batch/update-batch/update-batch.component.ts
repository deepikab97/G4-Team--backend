import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/models/batch';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/shared/manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-batch',
  templateUrl: './update-batch.component.html',
  styleUrls: ['./update-batch.component.scss']
})
export class UpdateBatchComponent implements OnInit {

  batchForm: FormGroup;
  message:string;
  id: number;
  batch: Batch;
  submitted=false;
  public isVisible: boolean = false;
  constructor(private route: ActivatedRoute,private router: Router,
    private managerService: ManagerService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.batchForm = this.formBuilder.group({
      sportName: ['',Validators.required],
      startTime: ['',Validators.required],
      endTime: ['',Validators.required],
      size: ['',[Validators.required,Validators.min(10),Validators.max(50)]],
    });
    
    this.batch = new Batch() ;

    this.id = this.route.snapshot.params['id'];
    this.managerService.findBatch(this.id).subscribe(
      data=>{
        console.log(data)
        this.batch=data;
      },
      error=>{
        console.log(error);
      }
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
    this.updateBatch();
   }
    
  }

  updateBatch(){
    this.managerService.updateBatch(this.id,this.batch).subscribe(
      data=>{
        console.log(data)
        this.message=data.toString();
        if (this.isVisible) { 
          return;
        } 
        this.isVisible = true;
        setTimeout(()=> this.isVisible = false,2500)
        

      },
      error=>{
        console.log(error);
      }
    )
    
  }

}
