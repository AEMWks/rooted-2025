import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrlPrefix = '/api/v1/events/timeline/190?d='
  dateSufix = 'T00%3A00%3A00%2B01%3A00'

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string) { }

  getEvents(start: Date, end: Date): Promise<any[]> {
    //const url = `${this.apiUrlPrefix}${formatDate(start, "dd-MM-yyyy", this.locale)}&start=${formatDate(start, "yyyy-MM-dd", this.locale)}${this.dateSufix}&end=${formatDate(end, "yyyy-MM-dd", this.locale)}${this.dateSufix}`;
    const formattedDate = formatDate(start, "yyyy-MM-dd", this.locale);
    const url = `public/${formattedDate}.json`; // Ajusta la URL para apuntar a la carpeta 'public'
    console.log('Fetching URL:', url); // Añade este log para verificar la URL
    return lastValueFrom(this.http.get<any[]>(url));
  }
}
