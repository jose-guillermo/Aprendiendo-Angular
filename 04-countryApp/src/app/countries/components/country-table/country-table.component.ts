import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: `
    img{
      width: 40px;
    }
  `
})
export class CountryTableComponent {

  @Input()
  public countries: Country[] = [];

}
