import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Map, MapStyle, config } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements OnInit, AfterViewInit, OnDestroy{
  public map?: Map;

  @ViewChild("map") divMap?: ElementRef;

  ngOnInit(): void {
    config.apiKey = 'cquos7zjiT6lf6VdljGR';
  }

  ngAfterViewInit() {
    if (!this.divMap) throw "El elemento HTML no fue encontrado";

    const initialState = { lng: -74.5, lat: 40, zoom: 9 };
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
