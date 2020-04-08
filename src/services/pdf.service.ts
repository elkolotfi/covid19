import {Subject} from 'rxjs';
import {PDFDocument, PDFPage} from 'pdf-lib';
import {PdfModel} from '../models/attestation/pdf.model';
import {formatDate} from '@angular/common';
import {PdfDataModel} from '../models/attestation/pdfData.model';
import {AttestationType} from '../models/attestation/attestationType.enum';
import {PdfDataService} from './pdf-data.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private pdf: PdfModel;
  pdfSubject = new Subject<PdfModel>();

  constructor(private pdfDataService: PdfDataService) {
  }

  draw() {
    const data = this.pdfDataService.data;
    const pdfName = data.type === AttestationType.Pro ? 'justificatif_de_deplacement_professionnel.pdf' :
                                                'attestation-deplacement-fr.pdf';

    fetch('assets/files/' + pdfName).then(res => {
      res.arrayBuffer().then(buffer => {
        PDFDocument.load(buffer).then((pdf: PDFDocument) => {
           data.type === AttestationType.Pro ? this.drawPro(pdf, data) : this.drawPerso(pdf, data);

           pdf.saveAsBase64({ dataUri: true }).then(dataUri => {
            this.PDF = new PdfModel(this.base64ToArrayBuffer(dataUri.split(';').slice(-1)[0]
                                                                    .split(',').slice(-1)[0]),
                                      pdfName);
          });
        });
      });
    });
  }

  emitSubject() {
    this.pdfSubject.next(this.pdf);
  }

  set PDF(pdf: PdfModel) {
    this.pdf = pdf;
    this.emitSubject();
  }

  get PDF(): PdfModel {
    return this.pdf;
  }

  private drawPro = (pdf: PDFDocument, data: PdfDataModel) => {
    const page: PDFPage = pdf.getPages()[0];

    page.drawText(data.pro.employerName,  {x: 156, y: 619, size: 15}); // Employer full name
    page.drawText(data.pro.employerPosition,  {x: 426, y: 619, size: 10});    // Employer position (function)
    page.drawText(data.pro.lastname,  {x: 106, y: 476, size: 15}); // Last name
    page.drawText(data.pro.firstname,  {x: 117, y: 447, size: 15}); // First name
    if (data.pro.birthday instanceof Date && data.pro.birthday.getFullYear() < new Date().getFullYear()) {
      page.drawText(formatDate(data.pro.birthday, 'dd/MM/yyyy', 'fr_FR'), {x: 176, y: 418, size: 15}); // Birthday
    }
    page.drawText(data.pro.address,  {x: 192, y: 390, size: 15}); // Address
    page.drawText(data.pro.activity,  {x: 270, y: 360, size: 15});
    page.drawText(data.pro.workplace,  {x: 315, y: 331, size: 15});
    page.drawText(data.pro.path,  {x: 202, y: 302, size: 15});
    page.drawText(data.pro.mean,  {x: 208, y: 274, size: 15});

    page.drawText(data.pro.city, {x: 371, y: 188, size: 15});
    page.drawText(formatDate(data.pro.today, 'dd', 'fr_FR'), {x: 475, y: 188, size: 15});
    page.drawText(formatDate(data.pro.today, 'MM', 'fr_FR'), {x: 502, y: 188, size: 15});
  }

  private drawPerso = (pdf: PDFDocument, data: PdfDataModel) => {
    const page: PDFPage = pdf.getPages()[0];
    const reasonPoints = [0, 49, 90.5, 126, 182, 229, 265];

    page.drawText(data.perso.name, { x: 134, y: 686, size: 14 });
    if (data.perso.birthday instanceof Date && data.perso.birthday.getFullYear() < new Date().getFullYear()) {
      page.drawText(formatDate(data.perso.birthday, 'dd/MM/yyyy', 'fr_FR'), { x: 134, y: 661, size: 14 });
    }
    page.drawText(data.perso.birthplace, { x: 134, y: 637, size: 14 });
    page.drawText(data.perso.address, { x: 134, y: 613, size: 14 });

    if (data.perso.reason > -1) {
      const mv = reasonPoints[data.perso.reason];
      page.drawLine({start: {x: 73.5, y: 540 - mv}, end: {x: 90, y: 522 - mv}});
      page.drawLine({start: {x: 73.5, y: 522 - mv}, end: {x: 90, y: 540 - mv}});
    }

    page.drawText(data.perso.city, {x: 112, y: 225.5, size: 15});
    page.drawText(formatDate(data.perso.today, 'dd/MM/yyyy', 'fr_FR'), {x: 96, y: 201, size: 15});
    page.drawText(formatDate(data.perso.today, 'HH', 'fr_FR'), {x: 195, y: 201, size: 15});
    page.drawText(formatDate(data.perso.today, 'mm', 'fr_FR'), {x: 222, y: 201, size: 15});

    const qrPage: PDFPage = pdf.addPage([page.getWidth(), page.getHeight()]);
  }

  private base64ToArrayBuffer = (base64): Uint8Array => {
    const binaryString =  window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array( len );
    for (let i = 0; i < len; i++)        {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}
