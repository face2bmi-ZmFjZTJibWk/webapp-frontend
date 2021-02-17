import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  error: any

  constructor(private ApiService: ApiService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  infoDialog() {
    if (this.dialog.openDialogs.length == 0) {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
      });
    }
  }

  privacyDialog() {
    if (this.dialog.openDialogs.length == 0) {
      this.dialog.open(PrivacyDialogComponent, {
        width: '400px',
      });
    }
  }

  selectedFile: File;
  selectedFileName = '';

  fileChanged(file?: File): void {
    this.selectedFile = file
    if (!this.selectedFile) {
      this.resetAll()
    } else {
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
    let image = this.selectedFile[0]

    if (image) {
      this.ApiService.predictBMI(image)
        .then((res) => {
          let prediction = res['prediction']
          let err = res['error']
          if (prediction) {
            this.height = Number(res['prediction']['height'])
            this.weight = Number(res['prediction']['weight'])
            this.bmi = Number(res['prediction']['bmi'])
            this.category = res['prediction']['category']
          } else if (err) {
            this.error = err
            console.log(err);
            this.openSnackBar(err)
          }
        })
        .catch((err) => {
          this.error = err
          console.log(err.message);
          this.openSnackBar(err.message)
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    } else {
      this.openSnackBar("No Image Selected !")
    }

  }

  resetAll(): void {
    this.selectedFileName = null
    this.imgURL = '/assets/person.svg'
    this.height = this.weight = this.bmi = this.category = null
    this.loading = false
  }

  openSnackBar(message: any) {
    if (!this._snackBar._openedSnackBarRef) {
      this._snackBar.open(message, 'close', {
        duration: 3000,
      });
    }
  }
}

@Component({
  templateUrl: './info-dialog.component.html',
})
export class InfoDialogComponent { }

@Component({
  templateUrl: './privacy-dialog.component.html',
})
export class PrivacyDialogComponent { }
