package rs.tfzr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.tfzr.model.AppUser;
import rs.tfzr.service.AppUserService;

import java.util.List;


@RestController
@RequestMapping("/user")
@CrossOrigin
public class AppUserController {

    private AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping
    public List<AppUser> findAll() {
        return appUserService.findAll();
    }

    @PostMapping("/registration")
    public ResponseEntity registrujSe(@RequestBody AppUser appUser) {
        System.out.println("user: " + appUser.getName() + " " + appUser.getUserName() + " " + appUser.getLastName() + " " + appUser.getPassword());
        return new ResponseEntity(appUserService.registrujSe(appUser), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all-users")
    public ResponseEntity getAllUsers() {
        System.out.println("Get all users");
        return new ResponseEntity(appUserService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/change-password/{email}/{newPassword}/{oldPassword}")
    public ResponseEntity changePassword(@PathVariable("email") String email, @PathVariable("newPassword") String newPassword, @PathVariable("oldPassword") String oldPassword) {
        System.out.println("Reset password for: " + email);
        return new ResponseEntity(appUserService.changePassword(email, newPassword, oldPassword), HttpStatus.OK);
    }

    @GetMapping("/reset-password/{email}")
    public ResponseEntity resetPassword(@PathVariable("email") String email) {
        System.out.println("Reset password for: " + email);
        return new ResponseEntity(appUserService.resetPassword(email), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/ban-user/{id}")
    public ResponseEntity banUser(@PathVariable("id") Long id) {
        System.out.println("Ban User");
        appUserService.banUser(id);
        return new ResponseEntity(appUserService.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/unban-user/{id}")
    public ResponseEntity unBanUser(@PathVariable("id") Long id) {
        System.out.println("unban User");
        appUserService.unBanUser(id);
        return new ResponseEntity(appUserService.findAll(), HttpStatus.OK);
    }

}
