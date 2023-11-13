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

  @ViewChild("stats_hp") stats_hp: ElementRef<HTMLElement>;

  id: number = 1;

  isBlur: boolean = false;

  timeline: GSAPTimeline | undefined;

  pokemon: any = null;
  species: any = null;

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
      backdropFilter: !this.isBlur ? "blur(10px)" : "blur(0px)",
    });

    this.timeline.fromTo(
      this.modal.nativeElement,
      {
        translateY: "100%",
        opacity: 1,
        scale: 0.2,
      },
      {
        translateY: "0%",
        opacity: 1,
        scale: 1,
        ease: "power4.out",
        duration: 0.8,
      },
      "<"
    );
  }

  animateStats(stats: any[]) {
    stats.forEach((stat: any) => {
      switch (stat.stat.name) {
        case "hp":
          gsap.to(this.stats_hp.nativeElement, {
            duration: 2,
            delay: 0.5,
            ease: "power4.out",
            width: `${this.getRealPercentage(stat.base_stat)}%`,
          });
          break;
      }
    });
  }

  resetStats() {
    this.stats_hp.nativeElement.style.width = "0%";
  }

  getRealPercentage(value: number): number {
    return Math.round((value * 100) / 255);
  }

  toggle(id: number): void {
    if (this.blur && this.modal && this.timeline) {
      if (!this.isBlur) {
        this.id = id;
        this.pokeapiService.getPokemon(this.id).subscribe((pokemon) => {
          this.pokemon = pokemon;

          console.log(this.species);
          this.animateStats(this.pokemon.stats);
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

        this.animateStats(this.species.stats);
      } else {
        this.timeline.timeScale(2.5);
        this.timeline.reverse().then(() => {
          this.isBlur = false;
          this.blur.nativeElement.classList.add("hidden");
          this.resetStats();
        });
      }
    }
  }
}
