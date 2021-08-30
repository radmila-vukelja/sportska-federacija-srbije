import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { ClubService } from 'src/app/service/club.service';
import { SportTypeService } from 'src/app/service/sport-type.service';
import { PlayerService } from '../../service/player.service';
import { Location } from '../../model/location';
import { LocationService } from 'src/app/service/location.service';
import { Category } from 'src/app/model/category';
import { SportType } from 'src/app/model/sport-type';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {

  genders = [
    { value: 'Muski' },
    { value: 'Zenski' }
  ]
  playerId;
  player: Player;
  locations: Location[] = [];
  categories: Category[] = [];
  defaultGender = { value: '' };

  name;
  lastName;
  location: Location;
  age; jmbg;
  category: Category;

  gender;
  sportType: SportType;

  constructor(
    private clubService: ClubService,
    private sportTypeService: SportTypeService,
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private locationService: LocationService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllLocations();
    this.catchIdFromUrl();
  }

  catchIdFromUrl() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];
      this.playerId = id;
      this.fetchPlayerById(id);
    });
  }

  fetchPlayerById(id) {
    this.playerService.getOne(id).subscribe(
      data => {
        this.player = data;
        this.name = data.name;
        this.lastName = data.lastName;
        this.location = data.location;
        this.age = data.age
        this.jmbg = data.jmbg;
        this.category = data.category;

        console.log(data);
        this.defaultGender.value = data.gender;
        this.findSportTypeByCategoryId(data.category.id);
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

  getAllLocations() {
    this.locationService.getAll().subscribe(
      data => {
        this.locations = data;
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

  findSportTypeByCategoryId(id) {
    this.sportTypeService.findByCategoryId(id).subscribe(
      data => {
        console.log(data);
        this.sportType = data;
        this.categories = data.categories;
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

  editPlayer() {
    if (!this.name || !this.lastName || !this.location || !this.age || !this.jmbg || !this.category) {
      return this.openDialog('Morate da popunite sva polja.', '350px', '300px', false);
    } else {

      this.player.name = this.name;
      this.player.location = this.location;
      this.player.lastName = this.lastName;
      this.player.age = this.age;
      this.player.jmbg = this.jmbg;
      this.player.category = this.category;
      this.player.gender = this.gender ? this.gender : this.player.gender;
      console.log("This gender: ", this.gender);

      this.edit(this.player);
    }
  }

  edit(player: Player) {
    this.playerService.edit(player).subscribe(
      data => {
        return this.openDialog('Uspesno ste izmenili igraca.', '350px', '300px', true);
      },
      error => {
        return this.openDialog('Desila se greska prilikom izmene igraca.', '350px', '300px', false);
      }
    )
  }

  chooseLocation(value) {
    this.location = value;
  }

  chooseGender(gender) {
    console.log(gender)
    this.gender = gender.value;
    this.filterCategoriesByGender(gender.value);
  }

  chooseCategory(value) {
    this.category = value;
  }

  filterCategoriesByGender(gender) {
    let oldCategories = this.sportType.categories;
    this.categories = [];
    for (let i = 0; i < oldCategories.length; i++) {
      if (oldCategories[i].gender === gender) {
        this.categories.push(oldCategories[i]);
      }
    }
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      if (action) {
        this.router.navigate(['home'])
      }
    });
  }

}
