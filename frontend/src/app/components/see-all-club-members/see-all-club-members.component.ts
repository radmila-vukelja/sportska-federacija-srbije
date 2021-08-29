import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Club } from '../../model/club';
import { ClubService } from 'src/app/service/club.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-see-all-club-members',
  templateUrl: './see-all-club-members.component.html',
  styleUrls: ['./see-all-club-members.component.css']
})
export class SeeAllClubMembersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'lastName',
    'age', 'location', 'jmbg', 'gender', 'category',
    'edit', 'delete'];

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

  edit(id) {
    this.router.navigate(['edit-player/' + id]);
  }

  delete(id) {
    this.openDeleteDialog("Da li ste sigurni da zelite da izbrisete clana kluba?", '350px', '300px', false, id);
  }

  deleteMemberFromClub(id) {
    let club: Club = this.removePlayerFromClubList(this.club, id);
    club.numberOfMembers--;
    this.clubService.edit(club).subscribe(
      data => {
        return this.openDialog('Clan Kluba Je Uspesno Izbrisan. ', '350px', '200px', true);
      },
      error => {
        return this.openDialog('Desila se greska prilikom brisanja clana kluba. ', '450px', '400px', false);
      }
    )
  }

  removePlayerFromClubList(club: Club, id) {
    for (let i = 0; i < club.playerList.length; i++) {
      if (club.playerList[i].id === id) {
        club.playerList.splice(i, 1);
        return club;
      }
    }
    return club;
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      if (action) {
        this.getClubById(this.clubId);
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
        this.deleteMemberFromClub(id);
      }
    });
  }

}
