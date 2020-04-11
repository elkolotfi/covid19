import {formatDate} from '@angular/common';

export class PersoModel {
  private Name: string;

  constructor(public firstname = '', public lastname = '', public birthday: Date = new Date(), public birthplace = '',
              public address = '', public reason = -1,
              public city = '', public today: Date = new Date()) {
  }

  private reasons = ['travail', 'courses', 'sante', 'famille', 'sport', 'judiciaire', 'missions'];

  toString(now: string): string {
    return [
      'Cree le: ' + now,
      'Nom: ' + this.lastname,
      'Prenom: ' + this.firstname,
      'Naissance: '
      + ( !(this.birthday instanceof Date) || isNaN(this.birthday.getTime()) ?
        '' : formatDate(this.birthday, 'dd/MM/yyyy', 'fr_FR'))
      + ' a ' + this.birthplace,
      'Adresse: ' + this.address,
      'Sortie: ' + formatDate(this.today, 'dd/MM/yyyy \'a\' HH\'h\'mm', 'fr_FR'),
      'Motifs: ' + (this.reason < 0 ? '' : this.reasons[this.reason])
    ].join('; ');
  }


  get name(): string {
    return [this.lastname, this.firstname].join(' ');
  }
}
