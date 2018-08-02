import {Component, OnInit} from '@angular/core';
import {DataService} from './../data.service';
import {IData} from './../data.interface';

@Component({selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.css']})
export class DashboardComponent implements OnInit {

  data : IData[];
  newLabel : string;
  newValue : number;

  constructor(private dataService : DataService) {}

  ngOnInit() {
    this
      .dataService
      .$data
      .subscribe(data => {
        this.data = data;
      });
  }

  addData() : void {
    let newData = {
      label: this.newLabel,
      value: this.newValue
    };
    //as IData;

    this
      .dataService
      .addData(newData);
  }

}
