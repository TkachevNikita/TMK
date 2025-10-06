import { ProductType } from '../enums/product-type.enum';
import { ExistingStatus } from '../enums/existing-status.enum';
import { IProduct } from '../interfaces/product.interface';

export class Product {
  public readonly id: string;
  public readonly idCat: string;
  public readonly idType: string;
  public readonly idTypeNew: string;
  public readonly productionType: ProductType;
  public readonly name: string;
  public readonly manufacturer: string;
  public readonly steelGrade: string;
  public readonly diameter: number;
  public readonly profileSize2: number;
  public readonly pipeWallThickness: number;
  public readonly status: ExistingStatus;
  public readonly koef: number;

  constructor(product: IProduct) {
    this.id = product.id;
    this.idCat = product.idCat;
    this.idType = product.idType;
    this.idTypeNew = product.idTypeNew;
    this.productionType = this.getProductionType(product.productionType);
    this.name = product.name;
    this.manufacturer = product.manufacturer;
    this.steelGrade = product.steelGrade;
    this.diameter = product.diameter;
    this.profileSize2 = product.profileSize2;
    this.pipeWallThickness = product.pipeWallThickness;
    this.status = this.getStatus(product.status);
    this.koef = product.koef;
  }

  // todo дописать согласно контрактам
  private getStatus(status: string): ExistingStatus {
    switch (status) {
      default:
        return ExistingStatus.exist;
    }
  }

  // todo дописать согласно контрактам
  private getProductionType(type: string): ProductType {
    switch (type) {
      default:
        return ProductType.todo;
    }
  }
}
