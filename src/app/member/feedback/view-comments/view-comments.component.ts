import { Component, OnInit, Input } from '@angular/core';
import { MemberService } from 'src/app/shared/member.service';
import { ActivatedRoute } from '@angular/router';
import {  Observable } from 'rxjs';
import { ViewPlansMemberComponent } from '../../view-plans-member/view-plans-member.component';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent implements OnInit {

  comments:any=[];
  planId: number;
  planName:string="";

  constructor(private memberService: MemberService, private route: ActivatedRoute,private messageService:MessageService) { }

  ngOnInit() {
    this.messageService.currentMessage.subscribe(msg=>this.planName=msg)
    
    this.route.params.subscribe(params => {
      this.planId = params['id'];

      this.memberService.showComments(this.planId).subscribe(data=>{
        this.comments=data;

      });
          });
          console.log(this.comments);
          
  }
}
