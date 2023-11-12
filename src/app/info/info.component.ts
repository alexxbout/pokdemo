import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import gsap from "gsap";
import { PokeapiService } from "../pokeapi.service";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
})
export class InfoComponent {
  @Input() pokemonId: number = -1;
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild("blur") blur: ElementRef<HTMLElement>;

  // pokemon: any;

  isBlur: boolean = false;

  constructor(public pokeapiService: PokeapiService) {}

  setBlur(): void {
    if (this.blur) {
      this.blur.nativeElement.classList.remove("hidden");

      gsap.to(this.blur.nativeElement, {
        duration: 0.5,
        backdropFilter: "blur(20px) saturate(150%)",
      });

      this.isBlur = true;
    }
  }

  removeBlur(): void {
    if (this.blur) {
      gsap
        .to(this.blur.nativeElement, {
          duration: 0.5,
          backdropFilter: "blur(0px) saturate(100%)",
        })
        .then(() => {
          this.blur.nativeElement.classList.add("hidden");
        });

      this.isBlur = false;
    }
  }

  toggleBlur(): void {
    if (this.isBlur) {
      this.removeBlur();
    } else {
      this.setBlur();
    }
  }

  // private loadPokemonDetails(id: number): void {
  //   this.pokeapiService.getPokemon(id).subscribe((pokemon) => {
  //     this.pokemon = pokemon;
  //   });
  // }

  closeInfoPopup(): void {
    // Emit the event to notify the parent component to close the popup
    this.closePopup.emit();
  }
}
