import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LngLat, Map, MapStyle, Marker, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements OnInit, AfterViewInit {
  @ViewChild("map") divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 12;
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

    this.readFromLocalStorage();

    // const markerHtml = document.createElement("div");
    // markerHtml.innerHTML = "Jose Bejar"
    // const marker = new Marker({
    //   color: "#333",
    //   // element: markerHtml
    // })
    //   .setLngLat( this.currentLngLat )
    //   .addTo( this.map );
  }

  createMarker(){
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat( lngLat )
      .addTo( this.map );


    this.markers.push({ color,marker });
    this.saveToLocalStorage();

    marker.on("dragend", () => {
      this.saveToLocalStorage();
    });

  }


  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.saveToLocalStorage();
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    })
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      }
    })

    localStorage.setItem("plainMarkers", JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem("plainMarkers") ?? "[]";
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //!Inseguro

    plainMarkers.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat)
      this.addMarker(coords, color)
    });
  }
}
