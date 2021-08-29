# SPORTSKI SAVEZ SRBIJE

## Uputstvo za dodavanje novih funkcionalnosti

Da biste pokrenuli projekat, potrebno je da na racunaru imate odredjene programe.

Ti programi su:

Visual Studio Code, InteliJ, Node.js, JDK, JRE, MySql, Angular

Ove tehnologije mozete preuzeti ovde:

<a href="https://www.jetbrains.com/idea/download/#section=windows"> InteliJ </a> <br>
<a href="https://code.visualstudio.com/download"> Visual Studio Code </a> <br>
<a href="https://dev.mysql.com/downloads/"> MySql </a> <br>
<a href="https://nodejs.org/en/download/"> Node.js </a> <br>
<a href="https://angular.io/guide/setup-local"> Angular </a> (ili samo ukucajte npm install -g @angular/cli)<br>

Nakon sto otvorite backend deo projekta preko Intelij-a, sacekajte da Gradle ucita sve potrebne biblioteke.
Kada instlirate Node.js a zatim Angular, otvorite frontend deo projekta preko Visual Studio Code-a i zatim u terminalu kudajte narebu "npm install" da bi NPM skinuo sve potrebne biblioteke za rad.
Zatim pokrenite frontend tako sto ce te ukucati komandu "ng s".



Da biste dodali novu funkcionalnost u softveru, potrebno napraviti GitHub nalog i potrebno je pridruziti se nasoj radnoj ogranizaciji.
Da biste to uradili, potrebno je poslati email sa vasim podacima na ```emailzaseminarskitest@gmail.com```.
Podaci koje saljete na email bi trebali da sadrze vase korisnicko ime na Github-u, vase ime i prezime.<br>
Ukoliko zelite, mozete nam reci i zasto zelite da se pridruzite nasoj radnoj grupi i sta zelite da izmenite.

Kada vam pristup bude odobren, mozete poceti izmenu koda time sto ce te napraviti tiket za odgovarajucu promenu koju zelite napraviti.<br>
Tiket mozete kreirati tako sto ce te otici na ovaj 
<a href="https://github.com/radmila-vukelja/sportska-federacija-srbije/issues"> link</a>  i kliknuti na "New Issue".<br>
Unesite naslov vase izmene u sekciji "Title".<br>
* U sekciji "Assignees" izaberite vas Github profil.
* U komentaru napisite detaljan opis promene koju zelite da napravite, zatim u sekciji "Labels" izaberite odgovaraju tip promene. <br>
* Ukoliko zelite dodate novu funkcionalnost, izberite "enhancement", ukoliko ste naisli na bug, izaberite sekciju "bug" i ukoliko zelite da izmenite ili dodate novu dokumentaciju, izaberite sekciju "documentation". <br>
* Zatim izabrati "Sportska Federacija Srbije" u sekciji "Projects".<br>
* Kada sve to ispunite, kliknite na "Submit new issue". <br> 
* Zatim klikom na ovaj <a href="https://github.com/radmila-vukelja/sportska-federacija-srbije/projects/1">link</a> mozete videti sve dostupne tikete, svoj tiket prebacite iz sekcije "To do" u sekciju "In Progress". <br>

Kada iskodirate funkcionalnost koju ste zeleli da dodate, vas kod treba podici na odredjenu git granu.
To mozete uraditi ovako:

```
git checkout -b SFS#73 (gde je 73 broj tiketa koji ste napravili)
git add .
git commit -m "[SFS#73] - kratak opis dodate funkcionalnosti"
git fetch origin (ukoliko vidite da postoje promene, morati povuci odredjene promene sa 'develop' grane)
git pull origin develop
git push origin SFS#73
```

Nakon treba napraviti PR (Pull Request), to mozete uraditi na ovom <a href="https://github.com/radmila-vukelja/sportska-federacija-srbije/pulls"> linku</a> <br>
Vas kod treba spojiti sa granom 'develop'. <br>
U sekciji "reviews" dodajte barem dva clana naseg tima. <br>
U sekciji "assignees" dodajte sebe.
Dodajte odgovarajuci "Labels" i "Projects" a zatim u komentaru napisite detaljan opis vase izmene i dodajte link ka vasem tiketu. I na kraju, kliknite na "Create pull request"<br>

Ukoliko vasa izmena zadovoljava minimalne standarde, vase izmene ce biti odobrene. <br>
Ukoliko ima zahteva za izmenom vaseg koda, dobicete email sa zahtevanim izmenama.

