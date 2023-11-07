import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  // @Input() pokemonId: number; // Utilise l'annotation Input pour récupérer l'id du composant parent
  // pokemon: any;

  // constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    // if (this.pokemonId) {
    //   this.loadPokemonDetails(this.pokemonId);
    // }
  }

  // private loadPokemonDetails(id: number): void {
  //   this.pokeapiService.getPokemon(id).subscribe((pokemon) => {
  //     this.pokemon = pokemon;
  //   });
  // }
}
