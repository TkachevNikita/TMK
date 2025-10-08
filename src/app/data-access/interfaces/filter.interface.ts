export interface IFilter {
  productionType?: 'cold' | 'hot' | 'welded';
  diameter?: number;
  steelGrade?: string;
  gost?: string;
  name?: string;
}
