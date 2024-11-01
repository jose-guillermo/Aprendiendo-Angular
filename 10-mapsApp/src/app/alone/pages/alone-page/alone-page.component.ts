import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  standalone: true,
  // imports: [CommonModule],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css',
  imports: [CounterAloneComponent, SideMenuComponent]
})
export class AlonePageComponent {
  constructor() {}
}
