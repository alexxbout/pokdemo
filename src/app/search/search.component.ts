import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { FastAverageColor } from "fast-average-color";
import { PokeapiService } from "../pokeapi.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
})
export class SearchComponent {
  @Output() viewDetailsEvent: EventEmitter<any> = new EventEmitter();
  @Output() switchEvent: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild("pokepic") pokepic: ElementRef<HTMLImageElement | null>;

  pokemons: { id: number; name: string }[] = [];

  index: number = 24;
  id: number = 25;
  name: string = "Pikachu";

  switching: boolean = false;

  filter: string = "";

  enableFilter: boolean = false;

  color: string = "#d6ba6f";

  mode: string = "info";

  fac: FastAverageColor = new FastAverageColor();

  constructor(public pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.pokeapiService.getPokemonList().subscribe((pokemons) => {
      this.pokemons = pokemons;

      this.pokemons.forEach((pokemon) => {
        this.pokeapiService
          .getPokemonName(pokemon.id, "fr")
          .subscribe((name) => {
            pokemon.name = name;
          });
      });
    });
  }

  ngOnDestroy(): void {
    this.fac.destroy();
  }

  viewDetails(): void {
    this.viewDetailsEvent.emit();
  }

  switch(side: "LEFT" | "RIGHT") {
    if (this.switching) {
      return;
    }

    this.switching = true;

    const targetIndex = side === "LEFT" ? this.index - 1 : this.index + 1;

    if (targetIndex >= 0 && targetIndex < this.pokemons.length) {
      this.selectPokemon(this.pokemons[targetIndex].id, targetIndex);
    }

    this.switching = false;
  }

  selectPokemon(id: number | string, index?: number): void {
    if (typeof id === "string") {
      id = parseInt(id);

      if (
        isNaN(id) ||
        id < 1 ||
        id > this.pokemons[this.pokemons.length - 1].id
      ) {
        return;
      }
    }

    if (index !== undefined) {
      this.index = index;
    } else {
      this.index = this.pokemons.findIndex((e) => e.id === id);
    }

    this.id = id;

    this.updatePokemonName();

    this.updateColor();

    this.switchEvent.emit(this.id);
  }

  randomPokemon(): void {
    this.selectPokemon(this.pokemons[Math.floor(Math.random() * this.pokemons.length)].id);
  }

  getFilterType(): "name" | "id" {
    if (this.filter.match(/^\d/)) {
      return "id";
    } else {
      return "name";
    }
  }

  updatePokemonName(): void {
    // Utilisation de l'index au lieu de la recherche
    const pokemon = this.pokemons[this.index];

    if (pokemon) {
      this.name = pokemon.name;
    } else {
      this.name = "Inconnu";
    }
  }

  updateColor() {
    this.fac
      .getColorAsync(this.pokeapiService.getImage(this.id))
      .then((color) => {
        this.color = color.hex;
      })
      .catch((e) => {
        console.error(e);

        this.color = "#000000";
      });
  }
}
