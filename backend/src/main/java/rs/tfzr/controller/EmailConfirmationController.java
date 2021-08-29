package rs.tfzr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.tfzr.service.AppUserService;

@RestController
@RequestMapping("/email")
public class EmailConfirmationController {

    private AppUserService appUserService;

    @Autowired
    public EmailConfirmationController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/confirm-email/{code}")
    public String confirmEmail(@PathVariable("code") String code) {
        System.out.println("\n\n " + code);
        if (appUserService.confirmCode(code)) {
            return "<h1 style='text-align : center; top: 50%; color: gray;' >Uspesno ste potvrdili Vas nalog!</h1> <script> setTimeout(function(){ window.location.replace('http://localhost:4200'); }, 2000);</script>";
        } else {
            return "Nesto nije u redu. Molimo da pokusate kasnije!";
        }
    }

}
