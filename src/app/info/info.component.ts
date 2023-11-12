import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import gsap from "gsap";
import { PokeapiService } from "../pokeapi.service";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
})
export class InfoComponent {
  @Input() id: number = -1;
  @ViewChild("blur") blur: ElementRef<HTMLElement>;
  @ViewChild("modal") modal: ElementRef<HTMLElement>;

  isBlur: boolean = false;

  timeline: GSAPTimeline | undefined;

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
        y: "100%",
        opacity: 1,
        scale: 0.2,
      },
      {
        y: "0%",
        opacity: 1,
        scale: 1,
        ease: "power4.out",
        duration: 0.8,
      },
      "<"
    );
  }

  toggle(): void {
    console.log("Toggle");

    if (this.blur && this.modal && this.timeline) {
      if (!this.isBlur) {
        this.isBlur = true;
        this.blur.nativeElement.classList.remove("hidden");

        this.timeline.timeScale(1);
        this.timeline.play();
      } else {
        this.timeline.timeScale(2.5);
        this.timeline.reverse().then(() => {
          this.isBlur = false;
          this.blur.nativeElement.classList.add("hidden");
        });
      }
    }
  }
}