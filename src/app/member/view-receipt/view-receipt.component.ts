import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/shared/member.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { PdfMakeWrapper, Txt, Img, Ul, Canvas, Line } from 'pdfmake-wrapper';
@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.scss']
})
export class ViewReceiptComponent implements OnInit {

  id:number
  userName
  planName
  startDate
  endDate
  amountPaid
  appliedDate
  status
  receipt
  constructor(private memberService : MemberService, private route: ActivatedRoute) { }
 
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.viewReceipt(this.id)
  }
//to view receipts of enrollments
  viewReceipt(id){
    this.memberService.viewReceipt(id).subscribe(data=>{
      console.log(data)
      this.receipt=data
      this.userName=this.receipt.userFirstName +' '+ this.receipt.userLastName
      this.amountPaid=this.receipt.amountPaid
      this.planName=this.receipt.planName
      this.endDate=this.receipt.endDate
      this.appliedDate=this.receipt.appliedDate
      this.status=this.receipt.status
      this.startDate=this.receipt.startDate
    })
  }

 async exportAsPdf(){
    const pdf= new PdfMakeWrapper()

    pdf.pageSize('A4')
    pdf.pageSize({
      width: 595.28,
      height: 'auto'
    })
    pdf.info({
      title: 'receipt',
      author: 'deccan.com',
      subject: 'enrollment receipt',
    })
  
      
 
    pdf.add( await new Img('http://localhost:4200/assets/logo-black-small.jpg').alignment('center').build());
    pdf.add(new Txt('Deccan Sports Club').alignment('center').bold().end)
    pdf.add(new Txt('                     ').end) 
    pdf.add(new Txt('Payment Receipt').alignment('center').color('blue').bold().end)
    pdf.add(new Txt('                     ').end) 
    pdf.add(new Txt('Amount Paid :'+'        '  +'₹'+ this.amountPaid).alignment('center').color('green').bold().end) 
    pdf.add(new Txt('                     ').end) 
    pdf.add(new Txt('Received From :'+'        '  + this.userName).alignment('center').bold().end) 
    pdf.add(new Txt('                     ').end) 
    pdf.add(new Txt('For Plan :'+'        '  + this.planName).alignment('center').color('black').bold().end) 
    pdf.add(new Txt('                     ').end) 
    pdf.add(new Txt('Starting From :'+'        '  + this.startDate).alignment('center').color('black').bold().end) 
    pdf.add(new Txt('                     ').end) 
    pdf.add(new Txt('Will be ending On :'+'        '  + this.endDate).alignment('center').color('black').bold().end) 
    pdf.add(new Txt('                     ').end) 
    pdf.add(new Txt('Applied Date :'+'        '  + this.appliedDate).alignment('center').color('black').bold().end) 
    pdf.add(new Txt('                     ').end) 
    pdf.add(new Txt('Enrollment Status :'+'        '  + this.status).alignment('center').color('black').bold().end) 
    pdf.add(new Txt('                          ').end) 
    pdf.add(new Txt('Thank You for giving us a chance to serve you!').alignment('center').color('black').bold().end) 
  
     
      
      
        pdf.create().open()
    }

    
}
