import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

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
  imgURL: any;


  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  infoDialog() {
    if (this.dialog.openDialogs.length == 0) {
      this.dialog.open(InfoDialogComponent);
    }
  }

  selectedFile: File;
  selectedFileName = '';

  fileChanged(file?: File): void {
    this.selectedFile = file
    if (!this.selectedFile) {
      this.selectedFileName = this.imgURL = ''
    } else {
      console.log(this.selectedFile)
      this.selectedFileName = this.selectedFile[0].name

      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result
      }
    }
  }

  uploadFile(): void {
    console.log(this.selectedFile)
    // handle uploaded file here
  }
}

@Component({
  templateUrl: './info-dialog.component.html',
})
export class InfoDialogComponent { }
