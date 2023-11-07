import { Component } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  // id: string = '';
  pokemons: Pokemon[] = [
    {
      id: 1,
      name: 'Bulbizarre'
    },
    {
      id: 2,
      name: 'Herbizarre'
    },
    {
      id: 3,
      name: "Florizarre"
    },
    {
      id: 4,
      name: "Salamèche"
    },
    {
      id: 5,
      name: "Reptincel"
    },
    {
      id: 6,
      name: "Dracaufeu"
    },
    {
      id: 7,
      name: "Carapuce"
    },
    {
      id: 8,
      name: "Carabaffe"
    }
  ]
  selected: number = -1;
  filter: string = '';

  validate(): void {
    if (this.selected === -1) {
      alert('Veuillez sélectionner un pokémon');
    }
    else {
      console.log("Vous avez sélectionné: " + this.pokemons[this.getSelectedPokemonIndex()].name);
    }
  }

  getSelectedPokemonIndex(): number {
    return this.pokemons.findIndex((e) => {
      return e.id == this.selected;
    });
  }
}
