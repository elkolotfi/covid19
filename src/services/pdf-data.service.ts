import {Injectable} from '@angular/core';
import {PersoModel} from '../models/attestation/perso.model';
import {ProModel} from '../models/attestation/pro.model';
import {PdfDataModel} from '../models/attestation/pdfData.model';
import {AttestationType} from '../models/attestation/attestationType.enum';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfDataService {
  private pdf = new PdfDataModel();
  pdfSubject = new Subject<PdfDataModel>();
  private PROFIL_LABEL = 'profil';

  private typingDelay = 700;
  private typingTimer: number;
  private doneTyping = () => this.pdfSubject.next(this.pdf);

  constructor() {
    if (this.PROFIL_LABEL in localStorage) {
      const perso: PersoModel = JSON.parse(localStorage.getItem(this.PROFIL_LABEL));
      this.perso.name = perso.name;
      this.perso.birthday = new Date(perso.birthday.toString());
      this.perso.birthplace = perso.birthplace;
      this.perso.address = perso.address;
      this.perso.city = perso.city;
    }
  }

  get data(): PdfDataModel {
    return this.pdf;
  }

  get type(): AttestationType {
    return this.pdf.type;
  }

  set type(type: AttestationType) {
    this.pdf.type = type;
    this.emitTypeSubject();
  }

  get perso(): PersoModel {
    return this.pdf.perso;
  }

  set perso(perso: PersoModel) {
    this.pdf.perso = perso;
    localStorage.setItem(this.PROFIL_LABEL, JSON.stringify(this.pdf.perso));
    this.emitSubject();
  }

  get pro(): ProModel {
    return this.pdf.pro;
  }

  set pro(pro: ProModel) {
    this.pdf.pro = pro;
    this.emitSubject();
  }

  emitSubject() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(this.doneTyping, this.typingDelay);
  }


  private emitTypeSubject() {
    this.pdfSubject.next(this.pdf);
  }
}
