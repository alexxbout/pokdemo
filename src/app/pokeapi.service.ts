import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(public service: HttpClient) { 
    // get https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0
    service.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').subscribe((data) => {
      console.log(data);
    });
  }
}
