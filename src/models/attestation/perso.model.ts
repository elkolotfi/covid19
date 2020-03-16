export class PersoModel {

  constructor(public name = '', public birthday: Date = new Date(), public birthplace = '',
              public address = '', public reason = -1,
              public city = '', public today: Date = new Date()) {
  }
}
