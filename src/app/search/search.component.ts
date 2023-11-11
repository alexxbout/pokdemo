import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { prominent } from 'color.js';
import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  // ? Différence entre [(ngModel)] et [ngModel] ?

  @Output() selectedPokemonId: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() viewDetailsClicked: EventEmitter<number> =
    new EventEmitter<number>();

  @ViewChild('pokepic') pokepic: ElementRef<HTMLImageElement>;

  pokemons: { id: number; name: string }[] = [];

  // id du pokémon sélectionné
  selected: number = -1;
  filter: string = '';

  color: string = '';

  loaded: boolean = false;

  constructor(public pokeapiService: PokeapiService) {}

  // Méthode appelée au chargement de la page une fois que le composant est initialisé
  ngOnInit(): void {
    this.pokeapiService.getPokemonList().subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }

  viewDetails(): void {
    // Emit the event when "Voir les détails" button is clicked
    this.viewDetailsClicked.emit(this.selected);
  }

  // Méthode pour obtenir l"index du pokémon sélectionné dans le tableau des pokémons
  getSelectedPokemonIndex(): number {
    return this.pokemons.findIndex((e) => {
      return e.id == this.selected;
    });
  }

  randomPokemon(): void {
    this.loaded = false;

    const randomIndex = Math.floor(Math.random() * this.pokemons.length);
    this.selected = this.pokemons[randomIndex].id;

    setTimeout(() => {
      if (this.pokepic) {
        prominent(this.pokepic.nativeElement, {
          format: 'hex',
          group: 5,
          amount: 2
        }).then((color) => {
          this.color = color[1] as string;

          this.loaded = true;
        }).catch((err) => {});
      }
    });
  }
}
