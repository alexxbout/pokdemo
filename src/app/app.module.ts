import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterPokemonPipePipe } from './filter-pokemon--pipe.pipe';
import { PokeapiService } from './pokeapi.service';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FilterPokemonPipePipe,
    InfoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PokeapiService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
