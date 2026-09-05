import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Partner {
  name: string;
  abbr?: string;
  logoPath?: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {
  isPaused = false;

  readonly partners: Partner[] = [
    // Pharmaceutical Companies
    { name: 'Novo Nordisk', abbr: 'NN' },
    { name: 'PHARCO Pharmaceuticals', abbr: 'PHARCO' },
    { name: 'Sanofi Egypt', abbr: 'SANOFI' },
    { name: 'Pfizer Egypt', abbr: 'PFIZER' },
    { name: 'AstraZeneca Egypt', abbr: 'AZ' },
    { name: 'Novartis Egypt', abbr: 'NOVARTIS' },
    { name: 'Abbott Egypt', abbr: 'ABBOTT' },
    { name: 'Amoun Pharmaceutical', abbr: 'AMOUN' },
    { name: 'EIPICO', abbr: 'EIPICO' },
    { name: 'Hikma Pharmaceuticals', abbr: 'HIKMA' },
    // Universities & Academic
    { name: 'Port Said University', abbr: 'PSU' },
    { name: 'Galala University', abbr: 'GU' },
    { name: 'Horus University', abbr: 'HUE' },
    { name: 'Suez Canal University', abbr: 'SCU' },
    // Professional Bodies & CME
    { name: 'Egyptian Medical Syndicate', abbr: 'EMS' },
    { name: 'Egyptian Chest Society', abbr: 'ECS' },
    { name: 'Egyptian Society of Otolaryngology', abbr: 'ESOO' },
    // Events & Media
    { name: 'Tekno Square Academy', abbr: 'TSA' },
    { name: 'ENGAZ Initiative', abbr: 'ENGAZ' },
  ];

  // Duplicate for seamless infinite marquee loop
  get marqueeRow1(): Partner[] {
    return [...this.partners.slice(0, 10), ...this.partners.slice(0, 10)];
  }

  get marqueeRow2(): Partner[] {
    return [...this.partners.slice(9), ...this.partners.slice(9)];
  }

  pauseMarquee() { this.isPaused = true; }
  resumeMarquee() { this.isPaused = false; }
}
