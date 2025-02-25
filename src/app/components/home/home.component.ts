import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [TimelineModule, CommonModule, CardModule, AccordionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  day1: any[] = [];
  day2: any[] = [];
  day3: any[] = [];
  resourceIds: { [key: number]: any[] } = {}; // Objeto para almacenar eventos por room

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    try {
      [this.day1, this.day2, this.day3] = await Promise.all([
        //this.apiService.getEvents(new Date("2025-03-06"), new Date("2025-03-07")),
        //this.apiService.getEvents(new Date("2025-03-07"), new Date("2025-03-08")),
        //this.apiService.getEvents(new Date("2025-03-08"), new Date("2025-03-09")),

        this.getEvents('2025-03-06'),
        this.getEvents('2025-03-07'),
        this.getEvents('2025-03-08'),

      ]);

      // Extraer los objetos en diferentes arrays según su atributo rooms
      this.day1.forEach(event => {
        const resourceId = event.resourceId;
        if (!this.resourceIds[resourceId]) {
          this.resourceIds[resourceId] = [];
        }
        this.resourceIds[resourceId].push(event);
      });

      console.log(this.resourceIds);
    } catch (error) {
      console.error(error);
    }
  }

  async getEvents(date: string): Promise<any[]> {
    const url = `${date}.json`; // Ajusta la URL para apuntar a la carpeta 'assets'
    console.log('Fetching URL:', url); // Añade este log para verificar la URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return response.json();
  }
}
