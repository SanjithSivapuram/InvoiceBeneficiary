import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/model/invoice.model';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoices: Invoice[] = [];
  username: any = window.sessionStorage.getItem('username');
  page: number = 0;
  size: number = 5;
  num: number;
  msg: string;
  error: Boolean;

  constructor(private invoiceService: InvoiceService, private route: Router) { }

  ngOnInit(): void {
    this.invoiceService.getInvoice(this.page, this.size).subscribe(data => {
      this.invoices = data;
      this.invoices.sort((a, b) => (a.id < b.id) ? -1 : 1);
      this.num = this.invoices.length;
    })
  }

  onDelete(id: number) {
    this.invoiceService.deleteInvoice(id).subscribe(data => {
      this.invoices.forEach((i, index) => {
        if (i.id == id) {
          this.invoices.splice(index, 1);
          this.error = false;
        }
      })
    }, (err: any) => {
      this.error = true;
      this.msg = "You are not authorized to delete"
    })
  }

  onPrevious() {
    this.page = this.page - 1;
    this.invoiceService.getInvoice(this.page, this.size).subscribe(data => {
      this.invoices = data;
      this.invoices.sort((a, b) => (a.id < b.id) ? -1 : 1);
      this.num = this.invoices.length;
    })
  }

  onNext() {
    this.page = this.page + 1;
    this.invoiceService.getInvoice(this.page, this.size).subscribe(data => {
      this.invoices = data;
      this.invoices.sort((a, b) => (a.id < b.id) ? -1 : 1);
      this.num = this.invoices.length;
    })
  }

  onLogout() {
    if (this.username !== null) {
      this.username = null;
      window.sessionStorage.removeItem("username");
      window.sessionStorage.removeItem('isLoggedIn');
      this.route.navigateByUrl('/');
    }
  }
}
