import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Club } from '../../../model/club';
import { ClubService } from '../../../service/club.service';
import { LoginService } from '../../../service/login.service';
import { MatDialog } from '@angular/material/dialog';
import { SportTypeService } from '../../../service/sport-type.service';
import { SportType } from '../../../model/sport-type';

@Component({
  selector: 'app-all-clubs-user',
  templateUrl: './all-clubs-user.component.html',
  styleUrls: ['./all-clubs-user.component.css']
})
export class AllClubsUserComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'location', 'owner', 'contactEmail', 'numberOfMembers', 'sportType', 'allMembers'];

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
    this.router.navigate(['user-all-club-players/' + id]);
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
