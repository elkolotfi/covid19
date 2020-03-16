import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PdfService} from '../../../services/pdf.service';
import {Subscription} from 'rxjs';
import {PdfModel} from '../../../models/attestation/pdf.model';
import {PdfDataService} from '../../../services/pdf-data.service';
import {PdfDataModel} from '../../../models/attestation/pdfData.model';
import {AttestationType} from '../../../models/attestation/attestationType.enum';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.css']
})
export class AttestationComponent implements OnInit, OnDestroy {
  @ViewChild('pdfViewer', {static: false}) pdfViewer;

  pdf: PdfModel;
  type = AttestationType.Perso;
  pdfSubscription: Subscription;
  pdfDataSubscription: Subscription;

  constructor(private http: HttpClient, private pdfService: PdfService, private pdfDataService: PdfDataService) { }

  async ngOnInit() {
    await this.pdfService.draw();
    this.pdfDataSubscription = this.pdfDataService.pdfSubject.subscribe((pdf: PdfDataModel) => {
      this.pdfService.draw();
    });

    this.pdfSubscription = this.pdfService.pdfSubject.subscribe((pdf: PdfModel) => {
        this.pdf = pdf;
        if (this.pdfViewer) {
          this.pdfViewer.pdfSrc = pdf.content;
          this.pdfViewer.downloadFileName = pdf.name;
          this.pdfViewer.refresh();
        }
    });
  }

  onChange($event: Event) {
    this.pdfDataService.type = ($event.target as HTMLSelectElement).value === 'perso' ? AttestationType.Perso : AttestationType.Pro;
  }

  ngOnDestroy(): void {
      this.pdfSubscription.unsubscribe();
      this.pdfDataSubscription.unsubscribe();
  }

  isPerso = () => this.pdfDataService.data.type === AttestationType.Perso;
  isPro   = () => this.pdfDataService.data.type === AttestationType.Pro;
}
