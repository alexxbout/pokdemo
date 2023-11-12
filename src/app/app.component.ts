import { Component, Input, ViewChild } from "@angular/core";
import { InfoComponent } from "./info/info.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  @Input() id: number = -1;

  @ViewChild(InfoComponent) infoComponent: InfoComponent | undefined;

  openDetails(id: number) {
    console.log("AppComponent: openDetails", id);
    // Manually call toggleBlur when id changes
    if (this.infoComponent) {
      this.infoComponent.toggle();
    }
  }
}
