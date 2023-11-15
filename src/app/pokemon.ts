export class Pokemon {
  id: number = 0;
  name: string = "";
  base_experience: number = 0;
  height: number = 0;
  is_default: boolean = false;
  order: number = 0;
  weight: number = 0;
  abilities: any[] = [];
  forms: any[] = [];
  game_indices: any[] = [];
  held_items: any[] = [];
  location_area_encounters: string = "";
  moves: any[] = [];
  sprites: any = {};
  species: any[] = [];
  stats: any[] = [];
  types: any[] = [];
}

export class PokemonSpecies {
  base_happiness: number = 0;
  capture_rate: number = 0;
  color: {} = {};
  egg_groups: any[] = [];
  evolution_chain: {} = {};
  evolves_from_species: null = null;
  flavor_text_entries: any[] = [];
  form_descriptions: any[] = [];
  forms_switchable: false = false;
  gender_rate: number = 0;
  genera: any[] = [];
  generation: {} = {};
  growth_rate: {} = {};
  habitat: {} = {};
  has_gender_differences: boolean = false;
  hatch_counter: number = 0;
  id: number = 1;
  is_baby: boolean = false;
  is_legendary: boolean = false;
  is_mythical: boolean = false;
  name: string = "";
  names: any[] = [];
  order: number = 0;
  pal_park_encounters: any[] = [];
  pokedex_numbers: any[] = [];
  shape: {} = {};
  varieties: any[] = [];
}

export interface Type {
  count: number;
  next: string;
  previous: null;
  results: { name: string; url: string }[];
}
