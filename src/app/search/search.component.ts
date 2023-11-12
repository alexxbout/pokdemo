import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { prominent } from "color.js";
import gsap from "gsap";
import { PokeapiService } from "../pokeapi.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
})
export class SearchComponent {
  // ? Différence entre [(ngModel)] et [ngModel] ?
  @Output() viewDetailsEvent: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild("pokepic") pokepic: ElementRef<HTMLElement> | undefined;

  pokemons: { id: number; name: string }[] = [];

  id: number = 1;
  name: string = "";

  switching: boolean = false;

  filter: string = "";

  enableFilter: boolean = false;

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

  viewDetails(): void {
    this.viewDetailsEvent.emit(this.id);
  }

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
            duration: 0.8,
            ease: "power4.inOut",
            scale: 0,
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
                  ease: "power4.out",
                  scale: 1,
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
      })
        .then((color) => {
          this.color = color[1] as string;
        })
        .catch(() => {
          this.color = "#000000";
        });
    });
  }

  randomPokemon(): void {
    const randomIndex = Math.floor(Math.random() * this.pokemons.length);
    this.selectPokemon(this.pokemons[randomIndex].id);
  }
}
