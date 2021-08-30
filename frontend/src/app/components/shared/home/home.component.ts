import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeCard } from 'src/app/model/home-card';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  homeCards: HomeCard[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.loginService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
    let userRole = this.loginService.getRoleFromLocalStorage();
    if (userRole === 'ROLE_USER') {
      this.router.navigate(['user-all-clubs'])
    }
    this.populateHomeCardsList();
  }

  populateHomeCardsList() {

    let picUrl = 'https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/37/58/4c/37584c7a-fa98-502c-7cd4-d5092d9458d1/source/512x512bb.jpg';

    // let addContestantCard = new HomeCard();
    // addContestantCard.buttonName = 'Dodaj Takmicara';
    // addContestantCard.pictureUrl = picUrl;
    // addContestantCard.route = 'add-contestant';

    let viewAllClubsCard = new HomeCard();
    viewAllClubsCard.buttonName = 'Pogledaj Sve Klubove';
    viewAllClubsCard.pictureUrl = 'https://www.cvru.ac.in/Content/images/sports-club.jpg';
    viewAllClubsCard.route = 'all-clubs';

    let addNewClubCard = new HomeCard();
    addNewClubCard.buttonName = 'Dodaj Nov Klub';
    addNewClubCard.pictureUrl = 'https://image.freepik.com/free-vector/circular-sport-club-logo-badge-set-illustration_1344-432.jpg';
    addNewClubCard.route = 'add-club';

    let adminPageCard = new HomeCard();
    adminPageCard.buttonName = 'Admin Stranica';
    adminPageCard.pictureUrl = 'https://media.istockphoto.com/vectors/default-users-vector-id482800261?b=1&k=6&m=482800261&s=170667a&w=0&h=YjNgzgICQfvnzjNYEglCuhLFFCw_uwsVEqsPQ35Gi9s=';
    adminPageCard.route = 'admin-page';

    let addSportCard = new HomeCard();
    addSportCard.buttonName = 'Dodaj Nov Sport';
    addSportCard.pictureUrl = 'https://ec.europa.eu/eurostat/documents/6921402/9104237/Shutterstock_Lisa_Kolbasa.png/f988f8b6-4138-4a91-9761-885bacab0ce2?t=1533725002000';
    addSportCard.route = 'add-sport';

    let locationsCard = new HomeCard();
    locationsCard.buttonName = 'Dodaj Lokacije';
    locationsCard.pictureUrl = 'https://thumbs.dreamstime.com/b/map-red-pin-locator-concept-clipart-design-illustrator-vector-map-pin-location-address-company-isolated-159529757.jpg';
    locationsCard.route = 'locations';

    // this.homeCards.push(addContestantCard);
    this.homeCards.push(viewAllClubsCard);
    this.homeCards.push(addNewClubCard);
    this.homeCards.push(adminPageCard);
    this.homeCards.push(addSportCard);
    this.homeCards.push(locationsCard);
  }

}
