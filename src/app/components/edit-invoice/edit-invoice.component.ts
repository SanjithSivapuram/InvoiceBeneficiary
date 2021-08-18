import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiary } from 'src/app/model/beneficiary.model';
import { Invoice } from 'src/app/model/invoice.model';
import { BeneficiaryService } from 'src/app/service/beneficiary.service';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {

  invoiceForm: FormGroup;
  beneficiaries: Beneficiary[] = [];
  beneficiary: Beneficiary;
  id: string;
  error: Boolean;
  msg: string;

  constructor(private invoiceService: InvoiceService, private beneficiaryService: BeneficiaryService, private route: Router, private actRoute: ActivatedRoute) {
    this.invoiceForm = new FormGroup({
      amount: new FormControl(''),
      applyDate: new FormControl(''),
      beneficiary: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.invoiceService.getOneInvoice(+this.id).subscribe(data => {
      this.invoiceForm = new FormGroup({
        amount: new FormControl(data.amount, Validators.required),
        applyDate: new FormControl(data.applyDate, Validators.required),
        beneficiary: new FormControl(data.beneficiary?.id, Validators.required)
      })
    })
    this.beneficiaryService.getBeneficiary().subscribe(data => {
      this.beneficiaries = data;
    })
  }

  onInvoiceFormSubmit() {
    let invoice: Invoice = {
      amount: this.invoiceForm.value.amount,
      applyDate: this.invoiceForm.value.applyDate,
    }
    this.invoiceService.editInvoice(+this.id, +this.invoiceForm.value.beneficiary, invoice).subscribe(data => {
      this.route.navigateByUrl("/invoice");
      this.error = false;
    },
      (err: any) => {
        this.error = true
        this.msg = "You are not authorized"
      })
  }

}
