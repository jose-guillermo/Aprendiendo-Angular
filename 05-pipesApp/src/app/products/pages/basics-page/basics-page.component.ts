import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent {
  public nameLower: string = "Jose";
  public nameUpper: string = "JOSE";
  public fullName: string = "JoSe BeJAr";

  public customDate: Date = new Date();

}
