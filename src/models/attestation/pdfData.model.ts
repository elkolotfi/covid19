import {AttestationType} from './attestationType.enum';
import {PersoModel} from './perso.model';
import {ProModel} from './pro.model';

export class PdfDataModel {
  type: AttestationType;
  perso: PersoModel;
  pro: ProModel;


  constructor() {
    this.type = AttestationType.Perso;
    this.perso = new PersoModel();
    this.pro = new ProModel();
  }
}
