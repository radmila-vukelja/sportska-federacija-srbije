package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import rs.tfzr.model.AppUser;
import rs.tfzr.model.Role;
import rs.tfzr.model.dto.EmailMessage;
import rs.tfzr.repository.AppUserRepository;
import rs.tfzr.repository.RoleRepository;
import rs.tfzr.service.utils.EmailService;
import rs.tfzr.service.utils.StringGenerator;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Transactional
@Service
public class AppUserService {

    private AppUserRepository appUserRepository;
    private StringGenerator stringGenerator;
    private EmailService emailService;
    private RoleRepository roleRepository;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository, RoleRepository roleRepository, EmailService emailService) {
        this.stringGenerator = new StringGenerator();
        this.appUserRepository = appUserRepository;
        this.emailService = emailService;
        this.roleRepository = roleRepository;
    }

    public UserDetails loadUserByUsername(String korisnickoIme) throws UsernameNotFoundException {
        try {
            AppUser appUser = appUserRepository.findByUserName(korisnickoIme);
            if (appUser == null) {
                return null;
            }
            return new User(appUser.getUserName(), appUser.getPassword(), getAuthorities(appUser));
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found");
        }
    }

    private Set<GrantedAuthority> getAuthorities(AppUser appUser) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(appUser.getRole().getType().toString());
        authorities.add(grantedAuthority);
        return authorities;
    }

    public List<AppUser> findAll() {
        return appUserRepository.findAll();
    }

    public AppUser registrujSe(AppUser appUser) {
        List<Role> roles = this.roleRepository.findAll();
        appUser.setRole(roles.get(1));
        String randomGeneratedString = stringGenerator.nextString();
        appUser.setEmailConfirmationString(randomGeneratedString);
        appUser.setEmailIsConfirmed(false);
        AppUser savedAppUser = appUserRepository.save(appUser);
        EmailMessage emailMessage = emailService.createEmailConfirmationMessage(appUser);

        try {
            emailService.sendEmail(emailMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return savedAppUser;
    }

    public boolean confirmCode(String code) {
        AppUser appUser = this.appUserRepository.findByEmailConfirmationString(code);
        if (appUser != null) {
            appUser.setEmailIsConfirmed(true);
            this.appUserRepository.save(appUser);
            return true;
        } else {
            return false;
        }
    }

    public AppUser changePassword(String email, String newPassword, String oldPassword) {
        AppUser appUser = this.appUserRepository.findByEmail(email);
        if (appUser.getPassword().equals(oldPassword)) {
            appUser.setPassword(newPassword);
            return this.appUserRepository.save(appUser);
        } else {
            return null;
        }
    }

    public boolean resetPassword(String email) {
        String randomGeneratedString = stringGenerator.nextString();
        AppUser appUser = this.appUserRepository.findByEmail(email);
        appUser.setPassword(randomGeneratedString);
        this.appUserRepository.save(appUser);
        EmailMessage emailMessage = emailService.createResetPasswordMessage(appUser);
        try {
            this.emailService.sendEmail(emailMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return true;
    }
}
