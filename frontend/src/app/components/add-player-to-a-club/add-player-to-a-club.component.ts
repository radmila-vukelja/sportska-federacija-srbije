import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Club } from 'src/app/model/club';
import { Player } from 'src/app/model/player';
import { ClubService } from 'src/app/service/club.service';
import { LocationService } from 'src/app/service/location.service';
import { SportTypeService } from 'src/app/service/sport-type.service';
import { Location } from '../../model/location';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-add-player-to-a-club',
  templateUrl: './add-player-to-a-club.component.html',
  styleUrls: ['./add-player-to-a-club.component.css']
})
export class AddPlayerToAClubComponent implements OnInit {

  clubId: number;
  club: Club;
  locations: Location[] = [];
  location: Location;
  categories: Category[] = [];
  genders = [
    { value: 'Muski' },
    { value: 'Zenski' }
  ]

  name: string;
  lastName: string;
  age: number;
  jmbg: number;
  category: Category;
  gender: string;
  
  constructor(
    private router: Router,
    private locationService: LocationService,
    public dialog: MatDialog,
    private clubService: ClubService,
    private sportTypeService: SportTypeService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.catchIdFromUrl();
    this.getAllLocations();
  }

  catchIdFromUrl() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];
      this.clubId = id;
      this.fetchClubById(id);
    });
  }

  fetchClubById(id) {
    this.clubService.getOne(id).subscribe(
      data => {
        console.log(data);
        this.club = data;
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

  chooseLocation(value) {
    this.location = value;
  }

  chooseGender(gender) {
    this.gender = gender.value;
    this.filterCategoriesByGender(gender.value);
  }

  chooseCategory(value) {
    this.category = value;
  }

  filterCategoriesByGender(gender) {
    let oldCategories = this.club.sportType.categories;
    this.categories.length = 0;
    for (let i = 0; i < oldCategories.length; i++) {
      if (oldCategories[i].gender === gender) {
        this.categories.push(oldCategories[i]);
      }
    }
  }

  addPlayerToAClub() {
    if (!this.name || !this.lastName || !this.location || !this.age || !this.jmbg || !this.category) {
      return this.openDialog('Morate da popunite sva polja.', '350px', '300px', false);
    } else {
      let player = new Player();
      player.name = this.name;
      player.location = this.location;
      player.lastName = this.lastName;
      player.age = this.age;
      player.jmbg = this.jmbg;
      player.gender = this.gender;
      player.category = this.category;
      this.club.playerList.push(player);
      this.club.numberOfMembers++;
      this.save(this.club);
    }
  }

  save(club: Club) {
    this.clubService.edit(club).subscribe(
      data => {
        return this.openDialog('Uspesno ste dodali igraca u klub!', '350px', '300px', true);
      },
      error => {
        return this.openDialog('Desila se greska prilikom dodavanja igraca!', '350px', '300px', false);
      }
    )
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      if (action) {
        this.dialog.closeAll();
        this.router.navigate(['home'])
      }
    });
  }

}
