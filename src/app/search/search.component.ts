import { Component } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  // ? Différence entre [(ngModel)] et [ngModel] ?

  pokemons: { id: number; name: string }[] = [];

  // id du pokémon sélectionné
  selected: number = -1;
  filter: string = '';

  constructor(public pokeapiService: PokeapiService) {}

  // Méthode appelée au chargement de la page une fois que le composant est initialisé
  ngOnInit(): void {
    this.pokeapiService.getPokemonList().subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }

  // Méthode appelée lorsqu'on clique sur le bouton "Valider"
  validate(): void {
    if (this.selected === -1) {
      alert('Veuillez sélectionner un pokémon');
    } else {
      console.log(
        'Vous avez sélectionné: ' +
          this.pokemons[this.getSelectedPokemonIndex()].name
      );
    }
  }

  // Méthode pour obtenir l'index du pokémon sélectionné dans le tableau des pokémons
  getSelectedPokemonIndex(): number {
    return this.pokemons.findIndex((e) => {
      return e.id == this.selected;
    });
  }

  randomPokemon(): void {
    const randomIndex = Math.floor(Math.random() * this.pokemons.length);
    this.selected = this.pokemons[randomIndex].id;
  }
}
