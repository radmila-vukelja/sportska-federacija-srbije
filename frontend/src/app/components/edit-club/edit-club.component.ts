import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Club } from '../../model/club';
import { Location } from '../../model/location';
import { LocationService } from '../../service/location.service';
import { ClubService } from '../../service/club.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { SportType } from '../../model/sport-type';
import { SportTypeService } from 'src/app/service/sport-type.service';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.css']
})
export class EditClubComponent implements OnInit {

  id: number;
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
    private sportTypeService: SportTypeService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAllSportTypes();
    this.getAllLocations();
    this.catchIdFromUrl();
  }

  catchIdFromUrl() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];
      this.id = id;
      this.fetchClubById(id);
    });
  }

  fetchClubById(id) {
    this.clubService.getOne(id).subscribe(
      data => {
        this.club = data;
        this.name = data.name;
        this.location = data.location;
        this.owner = data.owner;
        this.contactEmail = data.contactEmail;
        this.sportType = data.sportType;
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

  editClub() {
    if (
      !this.name || !this.location || !this.owner || !this.contactEmail || !this.sportType
    ) {
      return this.openDialog('Morate da popunite sva polja.', '350px', '300px', false);
    } else {
      this.club.id = this.id;
      this.club.name = this.name;
      this.club.location = this.location;
      this.club.owner = this.owner;
      this.club.contactEmail = this.contactEmail;
      this.club.sportType = this.sportType;
      this.edit(this.club);
    }
  }

  edit(club: Club) {
    this.clubService.edit(club).subscribe(
      data => {
        return this.openDialog('Uspesno ste izmenili klub', '350px', '300px', true);
      },
      error => {
        return this.openDialog('Desila se greska prilikom izmene kluba.', '350px', '300px', false);
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
