import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    favouriteGames: new FormArray([
      new FormControl('Metal Gear', Validators.required),
      new FormControl('Death Stranding', Validators.required),
    ]),
  });

  public newFavourite: FormControl = new FormControl('', Validators.required)

  get favouriteGames(){
    return this.myForm.get('favouriteGames') as FormArray;
  }

  isInvalidField(field: string): boolean | null{
    return this.myForm.controls[field].errors
        && this.myForm.controls[field].touched;
  }

  isInvalidFieldInArray(formArray: FormArray, index: number){
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  getFieldError(field: string): string | null {

    if( !this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          return "Este campo es requerido.";
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `El valor mínimo de este campo es de ${errors['min'].min}`
      }
    }

    return null;
  }

  onAddToFavourites():void {
    if (this.newFavourite.invalid) return;

    const newGame = this.newFavourite.value;

    this.favouriteGames.push( new FormControl(newGame, Validators.required ))
    this.newFavourite.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favouriteGames.removeAt(index);
  }

  onSubmit():void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.controls['favouriteGames'] = new FormArray([]);
    console.log(this.myForm.value);
    this.myForm.reset();

  }
}
