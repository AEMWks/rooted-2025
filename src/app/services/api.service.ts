import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrlPrefix = 'https://reg.rootedcon.com/api/v1/events/timeline/190?d='
  dateSufix = 'T00%3A00%3A00%2B01%3A00'

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string) { }

  getEvents(start: Date, end: Date): Promise<any[]> {
    let url = `${this.apiUrlPrefix}${formatDate(start, "dd-MM-yyyy", this.locale)}&start=${formatDate(start, "yyyy-MM-dd", this.locale)}${this.dateSufix}&end=${formatDate(end, "yyyy-MM-dd", this.locale)}${this.dateSufix}`;
    return lastValueFrom(this.http.get<any[]>(url));
  }
}
