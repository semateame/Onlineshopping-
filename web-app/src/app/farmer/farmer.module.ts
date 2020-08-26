import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListProductsComponent } from "./components/list-products.component";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { EditproductComponent } from "./components/editproduct.component";
import { AddproductsComponent } from "./components/addproducts.component";
import { HomeComponent } from "./components/home.component";
import { FarmNav } from "./components/farmNav";
import { MatMenuModule } from "@angular/material/menu";
import { OrderComponent } from "./components/order.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatExpansionModule } from "@angular/material/expansion";
import { TabletemplateComponent } from "./superuser/tabletemplate.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FarmersComponent } from "./superuser/farmers.component";
import { MatTableModule } from "@angular/material/table";
import { CustomersComponent } from "./superuser/customers.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogComponent } from "./superuser/dialog.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TransactionComponent } from "./superuser/transaction.component";
import { MatNativeDateModule } from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { LogsComponent } from './superuser/logs/logs.component';
@NgModule({
  declarations: [
    ListProductsComponent,
    AddproductsComponent,
    EditproductComponent,
    FarmNav,
    HomeComponent,
    OrderComponent,
    TabletemplateComponent,
    FarmersComponent,
    CustomersComponent,
    DialogComponent,
    TransactionComponent,
    LogsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: FarmNav,
        children: [
          { path: "list", component: ListProductsComponent },
          { path: "edit", component: EditproductComponent },
          { path: "home", component: HomeComponent },
          { path: "add", component: AddproductsComponent },
          { path: "order", component: OrderComponent },
          { path: "admin", component: FarmersComponent },
          { path: "customer", component: CustomersComponent },
          {path:"transaction",component:TransactionComponent},
          {path:"logs",component:LogsComponent}
        ],
      },
    ]),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule ,
    MatListModule   

  ],
})
export class FarmerModule {}
