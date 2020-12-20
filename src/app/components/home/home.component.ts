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
  imgURL: any = "/assets/person.svg"
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
      this.resetAll()
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
    this.loading = true
    console.log(this.selectedFile)
    // handle uploaded file here
    this.ApiService.predictBMI(this.selectedFile[0])
      .then((res) => {
        console.log(res);
        this.height = Number(res['prediction']['height'])
        this.weight = Number(res['prediction']['weight'])
        this.bmi = Number(res['prediction']['bmi'])
        this.category = res['prediction']['category']
        this.loading = false
      })
      .catch((err) => {
        console.log(err.status);
      });
  }

  resetAll(): void {
    this.selectedFileName = null
    this.imgURL = '/assets/person.svg'
    this.height = this.weight = this.bmi = this.category = null
  }
}

@Component({
  templateUrl: './info-dialog.component.html',
})
export class InfoDialogComponent { }
