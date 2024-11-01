import { Component } from '@angular/core';
import { interval, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  // i18n Select
  public name: string = "Jose";
  public gender: "male"| "female" = "male";
  public invitationMap = {
    "male": "invitarlo",
    "female": "invitarla"
  }

  changeClient():void {
    this.name = "Melissa",
    this.gender = "female"
  }

  // i18nPlural
  public clients: string[] = ["Maria", "Pedro", "Fenando", "Hernando", "Eduardo"]
  public clientsMap = {
    "=0": "no tenemos ningún cliente esperando",
    "=1": "tenemos un cliente esperando.",
    "other": "tenemos # clientes esperando"
  }
  deleteClient():void {
    this.clients.shift();
  }

  // KeyValue Pipe
  public person = {
    name: "Jose",
    age: 22,
    address: "Cuenca, España"
  }

  // Async Pipe
  public myObservableTimer: Observable<number> = interval(2000).pipe(
    tap(value => console.log("tap:", value))
  );

  public promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Tenemos data de la promesa.");
    }, 3500)
  })
}
