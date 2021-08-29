import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Club } from '../../../model/club';
import { ClubService } from 'src/app/service/club.service';
import { MatDialog } from '@angular/material/dialog';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})
export class ListPlayersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'lastName',
    'age', 'location', 'jmbg', 'gender', 'category'];

  dataSource = new MatTableDataSource<Player>();
  clubId;
  club: Club;
  players: Player[] = [];

  constructor(
    private clubService: ClubService,
    private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.catchIdFromUrl()
  }

  catchIdFromUrl() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];
      this.clubId = id;
      this.getClubById(id);
    });
  }

  getClubById(id) {
    this.clubService.getOne(id).subscribe(
      data => {
        this.club = data;
        this.players = data.playerList;
        this.dataSource.data = data.playerList;
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

}
