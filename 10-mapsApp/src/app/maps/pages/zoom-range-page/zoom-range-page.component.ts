import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LngLat, Map, MapStyle, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("map") divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-77.04080754047084, -12.055828247041092);

  ngOnInit(): void {
    config.apiKey = 'cquos7zjiT6lf6VdljGR';
  } 

  ngAfterViewInit() {
    if (!this.divMap) throw "El elemento HTML no fue encontrado";

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentLngLat,
      zoom: this.zoom,
    });
    this.mapListeners();
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  mapListeners(){
    if (!this.map) throw "Mapa no inicializado";
    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
      this.zoom = this.map!.getZoom();
    })

    this.map.on("move", (ev) => {
      this.currentLngLat = this.map!.getCenter();

    })
  }

  zoomIn() {
    this.map?.zoomIn();
  }
  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }

}
