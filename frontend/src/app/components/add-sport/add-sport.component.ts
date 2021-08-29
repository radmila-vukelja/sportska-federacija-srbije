import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../model/category';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { SportType } from '../../model/sport-type';
import { SportTypeService } from '../../service/sport-type.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.css']
})
export class AddSportComponent implements OnInit {

  sportName: string;
  categoryName: string;
  gender: string;

  selectedCategoryName: string;
  selectedGender: string;
  teamSport;

  genders = [
    { value: 'Muski' },
    { value: 'Zenski' },
  ]

  categoryList: Category[] = [];

  constructor(
    public dialog: MatDialog,
    private sportTypeService: SportTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  addSportType() {
    console.log()
    if(this.categoryList.length < 1){
      return this.openDialog('Morate imati bar jednu kategoriju!', '350px', '300px', false);
    }
    if(!this.sportName || this.sportName.length < 4){
      return this.openDialog('Naziv sporta mora biti duzi od 4 karaktera', '350px', '300px', false);
    }
    if(!this.teamSport && (this.teamSport !== 'individual' || this.teamSport !== 'team')){
      return this.openDialog('Morate izabrati da li je sport timski ili individualni!', '350px', '300px', false);
    }

    let sportType = new SportType();
    sportType.sport = this.sportName;
    sportType.categories = this.categoryList;
    sportType.teamSport = this.teamSport === 'individual' ? false : true;

    this.addNewSportTypeToDatabase(sportType);
  }

  addNewSportTypeToDatabase(sportType: SportType){
    this.sportTypeService.save(sportType).subscribe(
      data=>{
        return this.openDialog('Uspesno ste dodali sport!', '350px', '300px', true);
      },
      error=>{
        return this.openDialog('Doslo je do greske!', '350px', '300px', false);
      }
    )
  }

  chooseGender(gender) {
    this.gender = gender;
  }

  addCategoryToAList() {
    if (!this.gender || !this.categoryName || this.categoryName.length < 4) {
      return this.openDialog('Morate popuniti sva polja i kategorija mora biti duza od 4 karaktera!', '350px', '300px', false);
    }

    let category = new Category();
    category.gender = this.gender;
    category.name = this.categoryName;
    this.categoryList.push(category);

    this.categoryName = null;
  }

  deleteCategoryFromAList() {
    for (let i = 0; i < this.categoryList.length; i++) {
      if (this.categoryList[i].name === this.selectedCategoryName && this.categoryList[i].gender === this.selectedGender) {
        this.categoryList.splice(i, 1);
        return;
      }
    }
  }

  chooseCategory(category) {
    this.selectedCategoryName = category.name;
    this.selectedGender = category.gender;
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
