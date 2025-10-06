import { ProductType } from '../enums/product-type.enum';
import { ExistingStatus } from '../enums/existing-status.enum';

export interface IProduct {
  id: string;
  idCat: string;
  idType: string;
  idTypeNew: string;
  productionType: string;
  name: string;
  manufacturer: string;
  steelGrade: string;
  diameter: number;
  profileSize2: number;
  pipeWallThickness: number;
  status: string;
  koef: number;
}
