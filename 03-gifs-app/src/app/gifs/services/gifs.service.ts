import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  // *Propiedades
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'MlYDKbFFbKIcBFUKFLoy645rKbBRoI8p';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  // *Constructor
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs service ready');
  }

  // *Getter
  get tagsHistory() {
    return [...this._tagsHistory];
  }

  // *Métodos propios
  private organizedHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length > 0) this.searchTag(this._tagsHistory[0]);
  }
  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizedHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 12)
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }
}
