import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/shared/member.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-member-comment',
  templateUrl: './member-comment.component.html',
  styleUrls: ['./member-comment.component.scss']
})
export class MemberCommentComponent implements OnInit {

  userId: number = parseInt(sessionStorage.getItem('userid'));
  planId: number;
  comment: Review;
  plan: any;
  planName: string = "";

  constructor(private memberService: MemberService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.getCommentForUser();
  }
  getCommentForUser() {

    this.messageService.currentMessage.subscribe(msg => this.planName = msg)

    this.route.params.subscribe(params => {
      this.planId = params['id'];
      this.comment = { planId: this.planId, comment: "" };
      this.memberService.getCommentForUser(this.userId, this.comment).subscribe(data => {
        this.plan = data

      })
    })
  }

}
