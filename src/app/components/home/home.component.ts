import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

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
  imgURL: any = "/assets/male.svg"
  loading: boolean = false

  constructor(private ApiService: ApiService, public dialog: MatDialog,) { }

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
      this.selectedFileName = ''
      this.imgURL = '/assets/male.svg'
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
    this.ApiService.predictBMI(this.selectedFile[0])
      .then((res) => {
        console.log(res);
        this.height = Number(res['prediction']['height'])
        this.weight = Number(res['prediction']['weight'])
        this.bmi = Number(res['prediction']['bmi'])
        this.category = res['prediction']['category']
      })
      .catch((err) => {
        console.log(err.status);
      });
  }
}

@Component({
  templateUrl: './info-dialog.component.html',
})
export class InfoDialogComponent { }
