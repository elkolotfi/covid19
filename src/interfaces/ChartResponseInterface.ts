export interface ChartResponseInterface {
  date: Date;
  nom: string;
  code: string;
  source: {nom: string, url: string, archive: string};
  sourceType: string;
  casConfirmes: number;
  deces: number;
}
