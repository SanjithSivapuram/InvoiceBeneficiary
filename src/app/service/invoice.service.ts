import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../model/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  path: string = "http://localhost:9999";

  constructor(private httpClient: HttpClient) { }

  public getInvoice(page: number, size: number): Observable<Invoice[]> {
    let invoice_api = this.path + "/invoice?page=" + page + "&size=" + size;
    return this.httpClient.get<Invoice[]>(invoice_api);
  }

  public postInvoice(invoice: Invoice, bid: number): Observable<Invoice> {
    return this.httpClient.post<Invoice>(this.path + '/invoice/' + bid, invoice);
  }

  public editInvoice(id: number, bid: number, invoice: Invoice): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + window.sessionStorage.getItem('username')
      })
    }
    return this.httpClient.put<any>(this.path + '/invoice/edit/' + id + '/' + bid, invoice, httpOptions);
  }

  public getOneInvoice(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(this.path + '/invoice/' + id);
  }

  public deleteInvoice(id: number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + window.sessionStorage.getItem('username')
      })
    }
    return this.httpClient.delete<any>(this.path + '/invoice/delete/' + id, httpOptions);
  }
}
