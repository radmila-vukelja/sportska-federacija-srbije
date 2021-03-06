package rs.tfzr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.tfzr.model.AppUser;
import rs.tfzr.model.AuthenticatedAppUser;
import rs.tfzr.repository.AppUserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class LoginController {

    private AppUserRepository appUserRepository;

    @Autowired
    public LoginController(AppUserRepository korisnik) {
        this.appUserRepository = korisnik;
    }

    @RequestMapping("/user")
    public AuthenticatedAppUser getUser(Authentication authentication) {
        System.out.println("Korisnik " + authentication.getName() + " pokusava da se uloguje");
        List<String> roles = new ArrayList<>();
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            roles.add(authority.getAuthority());
        }

        AppUser currentAppUser = appUserRepository.findByUserName(authentication.getName());
        AuthenticatedAppUser korisnik = new AuthenticatedAppUser(
                currentAppUser.getId(), authentication.getName(), roles.get(0), currentAppUser.getEmailIsConfirmed(), currentAppUser.getUserIsBanned());
        return korisnik;
    }
}