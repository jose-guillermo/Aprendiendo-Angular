import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { TitleComponent } from "@shared/title/title.component";


@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ TitleComponent, CommonModule],
  template: `
    <shared-title [title]='currentFramework()' />

    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre>{{ frameworkAsProperty | json }}</pre>
  `,
})
export default class ChangeDetectionComponent {

  public currentFramework = computed(
    () => `Change detection - ${ this. frameworkAsSignal().name }`
  )

  public frameworkAsSignal = signal({
    name: "angular",
    releaseDate: 2016 ,
  });

  public frameworkAsProperty = {
    name: "angular",
    releaseDate: 2016,
  };

  constructor() {

    setTimeout(() => {
      // this.frameworkAsProperty.name = "React";


      this.frameworkAsSignal.update( value => ({
        ...value,
        name: "react",
      }))
      console.log("Hecho")
    },3000)
  }
}
