import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { prominent } from "color.js";
import { PokeapiService } from "../pokeapi.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
})
export class SearchComponent {
  // ? Différence entre [(ngModel)] et [ngModel] ?
  @Output() viewDetailsEvent: EventEmitter<any> = new EventEmitter();
  @Output() switchEvent: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild("pokepic") pokepic: ElementRef<HTMLElement> | undefined;

  pokemons: { id: number; name: string }[] = [];

  id: number = 1;
  name: string = "";

  switching: boolean = false;

  filter: string = "";

  enableFilter: boolean = false;

  color: string = "#f0d278";

  constructor(public pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.pokeapiService.getPokemonList().subscribe((pokemons) => {

      pokemons.forEach((pokemon) => {
        this.pokeapiService.getPokemonName(pokemon.id, "fr").subscribe((name) => {
          pokemon.name = name;
        });
      });

      this.pokemons = pokemons;

      // Preselect Pikachu
      if (pokemons.length > 0) {
        const pokemon = pokemons[24];
        this.selectPokemon(pokemon.id);
      }
    });
  }

  viewDetails(): void {
    this.viewDetailsEvent.emit();
  }

  switch(side: "LEFT" | "RIGHT") {
    if (this.switching) {
      return;
    }

    this.switching = true;

    const index = this.pokemons.findIndex((e) => e.id === this.id);
    const targetIndex = side === "LEFT" ? index - 1 : index + 1;

    if (
      this.pokepic &&
      targetIndex >= 0 &&
      targetIndex < this.pokemons.length
    ) {
      this.selectPokemon(this.pokemons[targetIndex].id);
    }

    this.switching = false;
  }

  selectPokemon(id: number|string): void {
    if (typeof id === "string") {
      id = parseInt(id);

      if (isNaN(id) || id < 1 || id > this.pokemons[this.pokemons.length - 1].id) {
        return;
      }
    }

    this.id = id;

    this.switchEvent.emit(this.id);

    prominent(this.pokeapiService.getImage(this.id), {
      format: "hex",
      group: 30,
      amount: 3,
    })
      .then((colors) => {
        this.color = colors[1] as string;
      })
      .catch(() => {
        this.color = "#000000";
      });

    this.pokeapiService.getPokemonName(id, "fr").subscribe((name: string) => {
      this.name = name;
    });
  }

  randomPokemon(): void {
    const randomIndex = Math.floor(Math.random() * this.pokemons.length);
    this.selectPokemon(this.pokemons[randomIndex].id);
  }

  getFilterType(): "name" | "id" {
    if (this.filter.match(/^\d/)) {
      return "id";
    } else {
      return "name";
    }
  }
}
