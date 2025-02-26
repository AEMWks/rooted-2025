import { Component } from '@angular/core';
import { IndexedDBService } from '../../services/indexedDB.service';
import { TimelineModule } from 'primeng/timeline';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-favorites',
  imports: [TimelineModule, CommonModule, CardModule, FontAwesomeModule, AccordionModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  day1: any[] = [];
  day2: any[] = [];
  day3: any[] = [];

  faTrash = faTrash;
  faBack = faArrowLeft

  constructor(private indexedDBService: IndexedDBService, private router: Router) { }

  async ngOnInit() {
    this.day1 = await this.indexedDBService.getEvents('day1')
    this.day2 = await this.indexedDBService.getEvents('day2')
    this.day3 = await this.indexedDBService.getEvents('day3')
  }

  async removeEvent(event: any, table: string) {
    await this.indexedDBService.removeEvent(event, table);
    switch (table) {
      case 'day1':
        this.day1 = await this.indexedDBService.getEvents('day1');
        break;
      case 'day2':
        this.day2 = await this.indexedDBService.getEvents('day2');
        break;
      case 'day3':
        this.day3 = await this.indexedDBService.getEvents('day3');
        break;
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
