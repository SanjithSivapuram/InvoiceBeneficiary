import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiary } from '../model/beneficiary.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  path: string = 'http://localhost:9999';

  constructor(private httpClient: HttpClient) { }

  public getBeneficiary(): Observable<Beneficiary[]> {
    return this.httpClient.get<Beneficiary[]>(this.path + '/beneficiary');
  }
}
