import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateProductFormComponent } from '../create-product-form/create-product-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, DoCheck {

  productsData:any = [];

  constructor(
    private productsDataService: ProductsDataService,
    private dialog : MatDialog)
  {

  }

  ngOnInit(): void {
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "100%";
    this.productsDataService.clearProductData();
    this.productsDataService.buttonClicked = "Create";
    this.dialog.open(CreateProductFormComponent, dialogConfig);
  }

  onEdit(productData:any, i:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "100%";
    this.productsDataService.buttonClicked = "Edit";
    this.dialog.open(CreateProductFormComponent, dialogConfig);
    this.productsDataService.existingProductData(productData);
    this.productsDataService.editedIndex = i;
  }

  onDelete(deletedIndex:any) {
    this.productsDataService.productsData.splice(deletedIndex, 1);
    let indices = this.productsDataService.indicesOfCartProducts;
    for (let j = 0; j < indices.length; ++j) {
      if (indices[j] > deletedIndex) {
        indices[j]--;
      }
    }
    this.productsDataService.indicesOfCartProducts = indices;
  }

  ngDoCheck(): void {
    this.productsData = this.productsDataService.productsData;
    console.log(this.productsData);
  }

  isInCart(decideToDeletedIndex:any) {
    let indices = this.productsDataService.indicesOfCartProducts;
    for (let i = 0; i < indices.length; ++i) {
      if (indices[i] == decideToDeletedIndex) {
        return true;
      }
    }
    return false;
  }
}
