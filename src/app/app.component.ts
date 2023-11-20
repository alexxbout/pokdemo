import { Component, ViewChild } from "@angular/core";
import { InfoComponent } from "./info/info.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  @ViewChild(InfoComponent) infoComponent: InfoComponent | undefined;

  updateDetails(id: number) {
    if (this.infoComponent) {
      this.infoComponent.update(id);
    }
  }

  openDetails() {
    if (this.infoComponent) {
      this.infoComponent.toggle();
    }
  }
}
