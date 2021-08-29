import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Club } from '../../model/club';
import { Location } from '../../model/location';
import { LocationService } from '../../service/location.service';
import { ClubService } from '../../service/club.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { SportType } from '../../model/sport-type';
import { SportTypeService } from 'src/app/service/sport-type.service';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css']
})
export class AddClubComponent implements OnInit {

  name: string;
  locations: Location[] = [];
  sportTypes: SportType[] = [];
  location: Location;
  club: Club;
  owner: string;
  contactEmail: string;
  sportType: SportType;

  constructor(
    private router: Router,
    private locationService: LocationService,
    public dialog: MatDialog,
    private clubService: ClubService,
    private sportTypeService: SportTypeService
  ) { }

  ngOnInit(): void {
    this.getAllSportTypes();
    this.getAllLocations();
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

  getAllSportTypes() {
    this.sportTypeService.getAll().subscribe(
      data => {
        this.sportTypes = data;
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

  chooseLocation(value) {
    this.location = value;
  }

  chooseSportType(value) {
    this.sportType = value;
  }

  addNewClub() {
    if (
      !this.name || !this.location || !this.owner || !this.contactEmail || !this.sportType
    ) {
      return this.openDialog('Morate da popunite sva polja.', '350px', '300px', false);
    } else {
      let club = new Club();
      club.name = this.name;
      club.location = this.location;
      club.owner = this.owner;
      club.contactEmail = this.contactEmail;
      club.sportType = this.sportType;
      this.saveNewClub(club);
    }
  }

  saveNewClub(club: Club) {
    this.clubService.save(club).subscribe(
      data => {
        return this.openDialog('Uspesno ste dodali klub', '350px', '300px', true);
      },
      error => {
        return this.openDialog('Desila se greska prilikom dodavanja kluba.', '350px', '300px', false);
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
