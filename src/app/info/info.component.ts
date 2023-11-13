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

  // @ViewChild("stats_hp") stats_hp: ElementRef<HTMLElement>;

  id: number = 1;

  isBlur: boolean = false;

  timeline: GSAPTimeline | undefined;

  pokemon: any = null;
  species: any = null;

  stats = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];

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

  getColor(stat: string): string {
    switch (stat) {
      case "hp":
        return "linear-gradient(to right, #d31027, #ea384d)";
      case "attack":
        return "linear-gradient(to right, #f46b45, #eea849)";
      case "defense":
        return "linear-gradient(to right, #f7971e, #ffd200)";
      case "special-attack":
        return "linear-gradient(to right, #95c4ff, #6ddcff)";
      case "special-defense":
        return "linear-gradient(to right, #1d976c, #93f9b9)";
      case "speed":
        return "linear-gradient(to right, #8e2de2, #4a00e0)";
      default:
        return "black";
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
          // this.resetStats();
        });
      }
    }
  }
}
