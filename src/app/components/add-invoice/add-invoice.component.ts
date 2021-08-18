import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/model/beneficiary.model';
import { Invoice } from 'src/app/model/invoice.model';
import { BeneficiaryService } from 'src/app/service/beneficiary.service';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  invoiceForm: FormGroup;
  beneficiaries: Beneficiary[] = [];
  beneficiary: Beneficiary;

  constructor(private invoiceService: InvoiceService, private beneficiaryService: BeneficiaryService, private route: Router) {
    this.invoiceForm = new FormGroup({
      amount: new FormControl(''),
      applyDate: new FormControl(''),
      beneficiary: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.beneficiaryService.getBeneficiary().subscribe(data => {
      this.beneficiaries = data;
    })
    this.invoiceForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      applyDate: new FormControl('', Validators.required),
      beneficiary: new FormControl('', Validators.required)
    })
  }

  onInvoiceFormSubmit() {
    let invoice: Invoice = {
      amount: this.invoiceForm.value.amount,
      applyDate: this.invoiceForm.value.applyDate,
    }
    this.invoiceService.postInvoice(invoice, +this.invoiceForm.value.beneficiary).subscribe(data => {
      this.route.navigateByUrl('/invoice');
    })
  }

}
