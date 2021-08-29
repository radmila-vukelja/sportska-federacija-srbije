import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Club } from '../../model/club';
import { ClubService } from 'src/app/service/club.service';
import { LoginService } from 'src/app/service/login.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { SportTypeService } from 'src/app/service/sport-type.service';
import { SportType } from 'src/app/model/sport-type';

@Component({
  selector: 'app-all-clubs',
  templateUrl: './all-clubs.component.html',
  styleUrls: ['./all-clubs.component.css']
})
export class AllClubsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'location',
    'owner', 'contactEmail', 'numberOfMembers', 'sportType', 'addMember', 'allMembers',
    'edit', 'delete'];

  dataSource = new MatTableDataSource<Club>();
  oldDataSource = new MatTableDataSource<Club>();
  sportTypes: SportType[] = [];

  constructor(
    private loginService: LoginService,
    private clubService: ClubService,
    private router: Router,
    public dialog: MatDialog,
    private sportTypeService: SportTypeService
  ) { }

  ngOnInit(): void {
    this.getAllClubs();
    this.getAllSportTypes();
  }

  edit(id) {
    this.router.navigate(['edit-club/' + id]);
  }

  delete(id) {
    this.openDeleteDialog("Da li ste sigurni da zelite da izbrisete klub?", '350px', '300px', false, id);
  }

  filter(parameter) {
    if (parameter === 'Ukloni Filter') {
      this.dataSource.data = this.oldDataSource.data;
    } else {
      let clubs : Club[] = [];
      for(let club of this.oldDataSource.data){
        if(club.sportType.sport === parameter){
          clubs.push(club);
        }
      }
      this.dataSource.data = clubs;
    }
  }

  navigateToAllMembers(id) {
    this.router.navigate(['all-club-players/' + id]);
  }

  addMember(id) {
    this.router.navigate(['add-player/' + id]);
  }


  getAllClubs() {
    this.clubService.getAll().subscribe(
      data => {
        this.dataSource.data = data;
        this.oldDataSource.data = data;
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

  deleteClub(id) {
    this.clubService.deleteClub(id).subscribe(
      data => {
        return this.openDialog('Klub je uspesno izbrisan. ', '350px', '200px', true);
      },
      error => {
        return this.openDialog('Desila se greska prilikom brisanja kluba. ', '450px', '400px', false);
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
        this.getAllClubs();
      }
    });
  }

  openDeleteDialog(text: string, height: string, width: string, action: boolean, id) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.dialog.closeAll();
        this.deleteClub(id);
      }
    });
  }

  getAllSportTypes(){
    this.sportTypeService.getAll().subscribe(
      data =>{
        this.sportTypes =  data;
      },
      error =>{
        console.error("ERROR: ", error);
      }
    )
  } 

}
