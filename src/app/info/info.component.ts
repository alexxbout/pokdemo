import { Component, ElementRef, ViewChild } from "@angular/core";
import gsap from "gsap";
import { PokeapiService } from "../pokeapi.service";
import { PokemonSpecies } from "../pokemon";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
})
export class InfoComponent {
  @ViewChild("blur") blur: ElementRef<HTMLElement>;
  @ViewChild("modal") modal: ElementRef<HTMLElement>;
  @ViewChild("img") img: ElementRef<HTMLElement>;
  @ViewChild("container") container: ElementRef<HTMLElement>;

  id: number = 1;
  name: string = "";

  isBlur: boolean = false;

  timeline: GSAPTimeline | undefined;

  pokemon: any = null;
  species: any = null;

  stats: { name: string; value: number }[] = [];

  types: { name: string; color: string }[] = [];

  constructor(public pokeapiService: PokeapiService) {}

  ngAfterViewInit(): void {
    const duration = 0.6;

    this.timeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (!this.isBlur) {
          this.isBlur = false;
          this.blur.nativeElement.classList.add("hidden");
        }
      },
    });

    this.timeline.fromTo(
      this.blur.nativeElement,
      {
        opacity: 0,
      },
      {
        duration: duration,
        ease: "power4.out",
        opacity: 1,
      }
    );

    this.timeline.fromTo(
      this.modal.nativeElement,
      {
        scale: 0.9,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        ease: "power4.out",
        duration: duration,
      },
      "<"
    );
  }

  getRealPercentage(value: number): number {
    return Math.round((value * 100) / 255);
  }

  getColor(category: "statistic" | "type", value: string): string {
    if (category === "type") {
      // Gérer la couleur en fonction du type
      switch (value) {
        case "Normal":
          return "#A8A77A";
        case "Combat":
          return "#C22E28";
        case "Vol":
          return "#A98FF3";
        case "Poison":
          return "#A33EA1";
        case "Sol":
          return "#E2BF65";
        case "Roche":
          return "#B6A136";
        case "Insecte":
          return "#A6B91A";
        case "Spectre":
          return "#735797";
        case "Acier":
          return "#B7B7CE";
        case "Feu":
          return "#EE8130";
        case "Eau":
          return "#6390F0";
        case "Plante":
          return "#7AC74C";
        case "Électrik":
          return "#F7D02C";
        case "Psy":
          return "#F95587";
        case "Glace":
          return "#96D9D6";
        case "Dragon":
          return "#6F35FC";
        case "Ténèbres":
          return "#705746";
        case "Fée":
          return "#D685AD";
        case "???":
          return "#000000";
        case "Ombre":
          return "#000000";
        default:
          return "#000000";
      }
    } else {
      // Gérer la couleur en fonction de la statistique si la catégorie est "statistic"
      switch (value) {
        case "PV":
          return "#d31027";
        case "Attaque":
          return "#f46b45";
        case "Défense":
          return "#f7971e";
        case "Attaque Spéciale":
          return "#95c4ff";
        case "Défense Spéciale":
          return "#1d976c";
        case "Vitesse":
          return "#8e2de2";
        default:
          return "#000000"; // Couleur par défaut pour les statistiques non gérées
      }
    }
  }

  toggle(): void {
    if (this.blur && this.modal && this.timeline) {
      if (!this.isBlur) {
        this.isBlur = true;

        this.container.nativeElement.classList.remove("hidden");
        this.blur.nativeElement.classList.remove("hidden");

        this.timeline.timeScale(1);
        this.timeline.play();
      } else {
        this.timeline.reverse(0.3).then(() => {
          this.isBlur = false;
          this.blur.nativeElement.classList.add("hidden");
          this.container.nativeElement.classList.add("hidden");
        });
      }
    }
  }

  update(id: number): void {
    this.reset();

    this.id = id;
    this.pokeapiService.getPokemon(this.id).subscribe((pokemon) => {
      this.pokemon = pokemon;

      this.pokemon.stats.forEach((stat: any) => {
        this.pokeapiService
          .getStatName(stat.stat.url, "fr")
          .subscribe((name) => {
            this.stats.push({
              name,
              value: stat.base_stat,
            });

            this.stats.sort((a, b) => {
              return (
                pokemon.stats.findIndex(
                  (stat: any) => stat.stat.name === a.name
                ) -
                pokemon.stats.findIndex(
                  (stat: any) => stat.stat.name === b.name
                )
              );
            });
          });

        this.pokeapiService.getPokemonName(this.id, "fr").subscribe((name) => {
          this.name = name;
        });
      });

      this.pokemon.types.forEach((type: any) => {
        this.pokeapiService
          .getStatName(type.type.url, "fr")
          .subscribe((name) => {
            this.types.push({
              name,
              color: this.getColor("type", name),
            });

            this.types.sort((a, b) => {
              return (
                pokemon.types.findIndex(
                  (type: any) => type.type.name === a.name
                ) -
                pokemon.types.findIndex(
                  (type: any) => type.type.name === b.name
                )
              );
            });
          });
      });
    });

    this.pokeapiService
      .getSpecies(this.id)
      .subscribe((pokemon: PokemonSpecies) => {
        this.species = pokemon;
      });
  }

  reset(): void {
    this.stats = [];
    this.types = [];
  }
}
