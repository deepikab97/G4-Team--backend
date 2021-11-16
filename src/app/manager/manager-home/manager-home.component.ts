import { Component, OnInit, Injectable } from '@angular/core';
import { Enrollment } from 'src/app/models/enrollment';
import { ManagerService } from 'src/app/shared/manager.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class ManagerHomeComponent implements OnInit {
 
  constructor(private service: ManagerService) { }

  ngOnInit() {
  }
}
