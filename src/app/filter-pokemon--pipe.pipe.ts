import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterPokemonPipe",
})
export class FilterPokemonPipePipe implements PipeTransform {
  transform(value: any[], property?: string, searchString?: string): any {
    if (property && searchString && typeof value !== "undefined") {
      return value.filter((e) => {
        if (typeof e[property] === "number") {
          return e[property] === parseInt(searchString);
        } else {
          return (
            e[property].toLowerCase().indexOf(searchString.toLowerCase()) !== -1
          );
        }
      });
    } else {
      return value;
    }
  }
}
