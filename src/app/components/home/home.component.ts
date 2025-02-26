import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IndexedDBService } from '../../services/indexedDB.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [TimelineModule, 
    CommonModule, 
    CardModule, 
    AccordionModule, 
    FontAwesomeModule,
     ButtonModule, 
     ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService]
})
export class HomeComponent {

  // Icons
  faPlus = faPlus;
  faHeart = faHeart

  day1: any[] = [];
  day2: any[] = [];
  day3: any[] = [];

  tableEventsName: string = '';

  resourceIds: { [key: number]: any[] } = {}; // Objeto para almacenar eventos por room

  constructor(
    private apiService: ApiService,
    private indexedDBService: IndexedDBService,
    private messageService: MessageService,
    private router: Router) { }

  async ngOnInit() {
    try {
      [this.day1, this.day2, this.day3] = await Promise.all([
        //this.apiService.getEvents(new Date("2025-03-06"), new Date("2025-03-07")),
        //this.apiService.getEvents(new Date("2025-03-07"), new Date("2025-03-08")),
        //this.apiService.getEvents(new Date("2025-03-08"), new Date("2025-03-09")),

        this.apiService.getEventsFromFile('2025-03-06'),
        this.apiService.getEventsFromFile('2025-03-07'),
        this.apiService.getEventsFromFile('2025-03-08'),

      ]);

      
    } catch (error) {
      console.error(error);
    }
  }

  async onEventClick(event: any) {
    console.log('Add event:', event);

    const exists = await this.indexedDBService.eventExists(event.title, this.tableEventsName);
    if (!exists) {
      this.indexedDBService.addEvent(event, this.tableEventsName);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event added to favorites' });
    } else {
      this.messageService.add({ severity: 'info', summary: 'Evento existente', detail: `El evento "${event.title}" ya existe en la base de datos.` });
    }
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  extractRooms(day: any[]) {
    this.resourceIds = {}
    // Extraer los objetos en diferentes arrays según su atributo rooms
    day.forEach(event => {
      const resourceId = event.resourceId;
      if (!this.resourceIds[resourceId]) {
        this.resourceIds[resourceId] = [];
      }
      this.resourceIds[resourceId].push(event);
    });
  }

  getDayData(table: string, day: any[]) {
    this.extractRooms(day);
    this.tableEventsName = table;
  }
}
