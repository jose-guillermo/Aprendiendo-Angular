import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements OnInit, AfterViewInit{
  @ViewChild("map") divMap?: ElementRef;
  @Input() lngLat?: [number, number];
  public map?: Map;

  ngOnInit(): void {
    config.apiKey = 'cquos7zjiT6lf6VdljGR';
  }

  ngAfterViewInit(){
    if(!this.divMap!.nativeElement) throw "Map Div not found";
    if(!this.lngLat) throw "LngLat can't be null";

    let [lng, lat] = this.lngLat!;
    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: MapStyle.STREETS,
      center: [lng, lat],
      zoom: 15,
      interactive: false,
    })

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    new Marker({
      color: color,
    })
      .setLngLat( [lng, lat] )
      .addTo( this.map );
  }

}
