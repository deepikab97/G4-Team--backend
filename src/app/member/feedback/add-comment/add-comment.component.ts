import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MemberService } from 'src/app/shared/member.service';
import { Review } from 'src/app/models/review';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit, OnDestroy {

  comment: Review;
  commentForm: FormGroup;
  submitted = false
  public isVisible: boolean = false;
  userId = parseInt(sessionStorage.getItem('userid'));
  planId: number;
  memberComment: string;

  private ngUnsubscribe = new Subject();

  constructor(private memberService: MemberService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {

    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.min(10), Validators.max(255)]]
    });

  }

  get c() { return this.commentForm.controls }

  onSubmit() {

    this.submitted = true;
    if (this.commentForm.invalid) {

      return;
    }
    else {
      this.submitted = false;
      this.addComment();

    }
  }
  addComment() {
    this.route.params.subscribe(params => {
      this.planId = params['id'];
    });
    this.comment = { planId: this.planId, comment: this.memberComment }

    this.memberService.comment(this.userId, this.comment)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.router.navigate(['member/feedback'])
      })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
