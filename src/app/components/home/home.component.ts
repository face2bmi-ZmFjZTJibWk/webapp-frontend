import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  height: number;
  weight: number;
  bmi: number;
  category: string;

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  infoDialog() {
    if (this.dialog.openDialogs.length == 0) {
      this.dialog.open(InfoDialogComponent);
    }
  }

}

@Component({
  templateUrl: './info-dialog.component.html',
})
export class InfoDialogComponent { }
