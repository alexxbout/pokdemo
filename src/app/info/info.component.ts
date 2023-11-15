import { Component, ElementRef, ViewChild } from "@angular/core";
import gsap from "gsap";
import { PokeapiService } from "../pokeapi.service";
import { PokemonSpecies, Type } from "../pokemon";

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

  types: Type[] = [];

  constructor(public pokeapiService: PokeapiService) {
    this.pokeapiService.getTypes().subscribe((types) => {
      this.types = types;
    });
  }

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
        case "normal":
          return "#A8A77A";
        case "fighting":
          return "#C22E28";
        case "flying":
          return "#A98FF3";
        case "poison":
          return "#A33EA1";
        case "ground":
          return "#E2BF65";
        case "rock":
          return "#B6A136";
        case "bug":
          return "#A6B91A";
        case "ghost":
          return "#735797";
        case "steel":
          return "#B7B7CE";
        case "fire":
          return "#EE8130";
        case "water":
          return "#6390F0";
        case "grass":
          return "#7AC74C";
        case "electric":
          return "#F7D02C";
        case "psychic":
          return "#F95587";
        case "ice":
          return "#96D9D6";
        case "dragon":
          return "#6F35FC";
        case "dark":
          return "#705746";
        case "fairy":
          return "#D685AD";
        case "unknown":
          return "#000000";
        case "shadow":
          return "#000000";
        default:
          return "#000000";
      }
    } else {
      // Gérer la couleur en fonction de la statistique si la catégorie est "statistic"
      switch (value) {
        case "hp":
          return "#d31027";
        case "attack":
          return "#f46b45";
        case "defense":
          return "#f7971e";
        case "special-attack":
          return "#95c4ff";
        case "special-defense":
          return "#1d976c";
        case "speed":
          return "#8e2de2";
        default:
          return "#000000"; // Couleur par défaut pour les statistiques non gérées
      }
    }
  }

  toggle(id: number): void {
    if (this.blur && this.modal && this.timeline) {
      if (!this.isBlur) {
        this.id = id;
        this.pokeapiService.getPokemon(this.id).subscribe((pokemon) => {
          this.pokemon = pokemon;
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
}
