import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "pokdemo";
  selectedPokemonId: number = -1;

  onPokemonSelected(id: number): void {
    this.selectedPokemonId = id;
  }

  toggleInfoWithBlur(): void {
    if (this.selectedPokemonId !== -1) {
      // this.toggleBlur(); // Toggle the blur
      // Additional logic to toggle the InfoComponent if needed
    }
  }
}
