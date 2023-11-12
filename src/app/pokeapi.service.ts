import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Pokemon } from "./pokemon";

/**
 * NOTE: Avec Angular, il est possible d'utiliser les Observables ainsi que les Promises.
 */

@Injectable({
  providedIn: "root",
})
export class PokeapiService {
  private allUrl = "https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0";
  private oneUrl = "https://pokeapi.co/api/v2/pokemon-species/";
  private imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<{ id: number; name: string }[]> {
    // Appeler l'URL initial pour obtenir la liste des noms et URLs des pokémons
    return this.http.get<any>(this.allUrl).pipe(
      map((response) => {
        return response.results.map((pokemon: any) => {
          const id: number = this.getIdFromUrl(pokemon.url);
          return { id, name: pokemon.name };
        });
      })
    );
  }

  getIdFromUrl(url: string): number {
    const urlSplit = url.split("/");
    return parseInt(urlSplit[urlSplit.length - 2]);
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.oneUrl + id);
  }

  getImage(id: number): string {
    return this.imageUrl + id + ".png";
  }

  getFrenchName(id: number): Observable<string> {
    return this.getPokemon(id).pipe(
      map((pokemon: any) => {
        if (pokemon && pokemon.names && pokemon.names.length >= 4) {
          return pokemon.names[4].name;
        }
        return "";
      })
    );
  }
}
