import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SystemComponent } from './system.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropdownDirective } from './shared/directives/dropdown.directives';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { BillCurrencyComponent } from './bill-page/bill-currency/bill-currency.component';
import { ApiService } from './shared/sevices/api.service';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { FilterEvents } from '../shared/pipes/filter.pipe';
import { BillEditComponent } from './bill-page/bill-edit/bill-edit.component';

@NgModule({
  imports: [CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [BillPageComponent, HistoryPageComponent, PlanningPageComponent, RecordsPageComponent,
    SystemComponent, SidebarComponent, HeaderComponent, DropdownDirective, BillCardComponent,
    BillCurrencyComponent, AddEventComponent, AddCategoryComponent, EditCategoryComponent,
    HistoryEventsComponent, HistoryDetailComponent, HistoryFilterComponent, HistoryChartComponent,
    FilterEvents,
    BillEditComponent

  ],
  providers: [ApiService]
})
export class SystemModule {

}
