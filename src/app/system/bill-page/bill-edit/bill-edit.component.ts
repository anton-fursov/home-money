import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/sevices/api.service';

@Component({
  selector: 'app-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.scss']
})
export class BillEditComponent implements OnInit {
  @Output() onBillEdited = new EventEmitter();
  form: FormGroup;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      fieldEdit: new FormControl(null, [Validators.min(100), Validators.required])
    });
  }

  onSubmit() {
    this.apiService.editBill({
      value: this.form.value.fieldEdit
    }).subscribe(() => {
      this.onBillEdited.emit();
    });

  }

}
