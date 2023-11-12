import { Component, ElementRef, ViewChild } from "@angular/core";
import { prominent } from "color.js";
import gsap from "gsap";
import { PokeapiService } from "../pokeapi.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent {
  // ? Différence entre [(ngModel)] et [ngModel] ?

  // @Output() selectedPokemonId: EventEmitter<number> =
  //   new EventEmitter<number>();
  // @Output() viewDetailsClicked: EventEmitter<number> =
  //   new EventEmitter<number>();

  @ViewChild("pokepic") pokepic: ElementRef<HTMLElement> | undefined;

  pokemons: { id: number; name: string }[] = [];

  id: number = -1;
  name: string = "";

  switching: boolean = false;

  // filter: string = '';

  color: string = "";

  constructor(public pokeapiService: PokeapiService) {}

  // Méthode appelée au chargement de la page une fois que le composant est initialisé
  ngOnInit(): void {
    this.pokeapiService.getPokemonList().subscribe((pokemons) => {
      this.pokemons = pokemons;

      if (pokemons.length > 0) {
        const pokemon = pokemons[24];
        this.selectPokemon(pokemon.id);
      }
    });
  }

  // viewDetails(): void {
  //   // Emit the event when "Voir les détails" button is clicked
  //   this.viewDetailsClicked.emit(this.selected);
  // }

  // Méthode pour obtenir l"index du pokémon sélectionné dans le tableau des pokémons
  // getSelectedPokemonIndex(): number {
  //   return this.pokemons.findIndex((e) => {
  //     return e.id == this.selected;
  //   });
  // }

  switch(side: "LEFT" | "RIGHT") {
    if (this.switching) {
      return;
    }

    this.switching = true;

    const index = this.pokemons.findIndex((e) => e.id === this.id);
    const targetIndex = side === "LEFT" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < this.pokemons.length) {
      const translateValue = side === "LEFT" ? "-100vw" : "100vw";
      const reverseTranslateValue = side === "LEFT" ? "100vw" : "-100vw";

      if (this.pokepic) {
        gsap
          .to(this.pokepic.nativeElement, {
            translateX: translateValue,
          })
          .then(() => {
            this.selectPokemon(this.pokemons[targetIndex].id);
            if (this.pokepic) {
              gsap.fromTo(
                this.pokepic.nativeElement,
                {
                  translateX: reverseTranslateValue,
                  duration: 0,
                },
                {
                  translateX: "0%",
                }
              );
            }
          });
      }
    }

    setTimeout(() => {
      this.switching = false;
    }, 1000);
  }

  selectPokemon(id: number): void {
    this.id = id;

    this.pokeapiService.getFrenchName(id).subscribe((frenchName: string) => {
      this.name = frenchName;

      prominent(this.pokeapiService.getImage(this.id), {
        format: "hex",
        group: 15,
        amount: 2,
      }).then((color) => {
        this.color = color[1] as string;
      });
    });
  }

  formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // randomPokemon(): void {
  //   const randomIndex = Math.floor(Math.random() * this.pokemons.length);
  //   this.selected = this.pokemons[randomIndex].id;

  //   setTimeout(() => {
  //     if (this.selected != -1) {
  //       prominent(this.pokeapiService.getImage(this.selected), {
  //         format: 'hex',
  //         group: 5,
  //         amount: 2,
  //       })
  //         .then((color) => {
  //           this.color = color[1] as string;
  //         })
  //         .catch((err) => {});
  //     }
  //   });
  // }
}
