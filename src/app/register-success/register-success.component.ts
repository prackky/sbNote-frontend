import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent implements OnInit {
  userId: any;

  constructor(private route: ActivatedRoute) {
    }

  ngOnInit() {
    /*this.userId = this.route
      .snapshot.params
      .subscribe(v => this.userId = v['userId']);*/
      
      this.userId = this.route.snapshot.params.userId;
  }

  ngOnDestroy() {
  }

}
