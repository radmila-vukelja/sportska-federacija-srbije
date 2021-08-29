package rs.tfzr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.tfzr.model.AppUser;
import rs.tfzr.service.AppUserService;


@RestController
@RequestMapping("/user")
@CrossOrigin
public class AppUserController {

    private AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
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

}
