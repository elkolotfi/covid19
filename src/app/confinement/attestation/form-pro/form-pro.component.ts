import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PdfDataService} from '../../../../services/pdf-data.service';
import {ProModel} from '../../../../models/attestation/pro.model';
import {PdfModel} from '../../../../models/attestation/pdf.model';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {PdfService} from '../../../../services/pdf.service';

@Component({
  selector: 'app-form-pro',
  templateUrl: './form-pro.component.html',
  styleUrls: ['./form-pro.component.css']
})
export class FormProComponent implements OnInit {
  proForm: FormGroup;
  downloadUrl: SafeUrl;
  downloadName: string;

  startAt = new Date('1984-01-01');
  today = new Date();

  constructor(private formBuilder: FormBuilder, private sanitizer: DomSanitizer,
              private pdfDataService: PdfDataService, private pdfService: PdfService) { }

  ngOnInit() {
    this.pdfService.pdfSubject.subscribe((pdf: PdfModel) => {
      this.downloadUrl  = this.getSafeUrl(pdf);
      this.downloadName = pdf.name;
    });

    this.proForm = this.formBuilder.group({
      name: this.pdfDataService.pro.employerName,
      position: this.pdfDataService.pro.employerPosition,
      firstname: this.pdfDataService.pro.firstname,
      lastname: this.pdfDataService.pro.lastname,
      birthday: this.pdfDataService.pro.birthday.getFullYear() < this.today.getFullYear() ?
        this.pdfDataService.pro.birthday : '',
      address: this.pdfDataService.pro.address,
      activity: this.pdfDataService.pro.activity,
      workplace: this.pdfDataService.pro.workplace,
      path: this.pdfDataService.pro.path,
      mean: this.pdfDataService.pro.mean,
      city: this.pdfDataService.pro.city,
      today: this.pdfDataService.pro.today
    });

    this.onChanges();
  }

  private onChanges() {
    this.proForm.valueChanges.subscribe(value => {
      this.pdfDataService.pro = new ProModel(value.name, value.position, value.firstname, value.lastname, value.birthday, value.address,
        value.activity, value.workplace, value.path, value.mean, value.city, value.today);
    });
  }

  private getSafeUrl(pdf: PdfModel): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(new Blob([pdf.content], { type: 'application/pdf' }))
    );
  }
}
