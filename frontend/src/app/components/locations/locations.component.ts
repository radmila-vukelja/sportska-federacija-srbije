import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/service/location.service';
import { Location } from '../../model/location';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  name: string;
  locations: Location[] = [];
  constructor(
    private locationService: LocationService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  checkForExistingLocations(location: string) {
    for(let i = 0; i < this.locations.length; i++){
      if(this.locations[i].name.toLowerCase() === location.toLowerCase()){
        this.openDialog('Ta lokacija vec postoji!', '350px', '300px', false);
        return false;
      }
    }
    return true;
  }

  addLocation() {
    if(this.checkForExistingLocations(this.name)){
      let location = new Location();
      location.name = this.name;
      this.locationService.save(location).subscribe(
        data =>{
          return this.openDialog('Uspesno ste dodali lokaciju!', '350px', '300px', true);
        },
        error =>{
          return this.openDialog('Desila se greska prilikom dodavanja nove lokacije!', '350px', '300px', false);
        }
      )
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
        this.router.navigate(['home']);
      }
    });
  }

}
