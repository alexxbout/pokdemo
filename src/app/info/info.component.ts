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

  id: number = 1;

  isBlur: boolean = false;

  timeline: GSAPTimeline | undefined;

  pokemon: any = null;
  species: any = null;

  stats: { name: string; value: number }[] = [];

  types: { name: string; color: string }[] = [];

  constructor(public pokeapiService: PokeapiService) {}

  ngAfterViewInit(): void {
    this.timeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (!this.isBlur) {
          this.isBlur = false;
          this.blur.nativeElement.classList.add("hidden");
        }
      },
    });

    this.timeline.to(this.blur.nativeElement, {
      duration: 1,
      ease: "power4.out",
      backdropFilter: !this.isBlur ? "blur(20px)" : "blur(0px)",
    });

    this.timeline.fromTo(
      this.modal.nativeElement,
      {
        translateY: "100%",
        scale: 0,
      },
      {
        translateY: "0%",
        scale: 1,
        ease: "power4.out",
        duration: 0.8,
      },
      "<"
    );

    this.timeline.fromTo(
      this.img.nativeElement,
      {
        translateY: "80%",
      },
      {
        translateY: "0%",
        duration: 1.2,
        ease: "power4.out",
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

  toggle(id: number): void {
    if (this.blur && this.modal && this.timeline) {
      if (!this.isBlur) {
        this.reset();

        this.id = id;
        this.pokeapiService.getPokemon(this.id).subscribe((pokemon) => {
          this.pokemon = pokemon;

          this.pokemon.stats.forEach((stat: any) => {
            this.pokeapiService
              .getStatName(stat.stat.url, "fr")
              .subscribe((name) => {
                // Insert the stat at the beginning of the array sorted by name
                this.stats.splice(
                  this.stats.findIndex((s) => s.name > name),
                  0,
                  {
                    name,
                    value: stat.base_stat,
                  }
                );
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
              });
          });
        });

        this.pokeapiService
          .getSpecies(this.id)
          .subscribe((pokemon: PokemonSpecies) => {
            this.species = pokemon;
          });

        this.isBlur = true;
        this.blur.nativeElement.classList.remove("hidden");

        this.timeline.timeScale(1);
        this.timeline.play();
      } else {
        this.timeline.reverse(0.6).then(() => {
          this.isBlur = false;
          this.blur.nativeElement.classList.add("hidden");
        });
      }
    }
  }

  reset(): void {
    this.stats = [];
    this.types = [];
  }
}
