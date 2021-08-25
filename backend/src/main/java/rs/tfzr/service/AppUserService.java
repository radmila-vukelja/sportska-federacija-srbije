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
import rs.tfzr.repository.AppUserRepository;
import rs.tfzr.repository.RoleRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Transactional
@Service
public class AppUserService {

    private AppUserRepository appUserRepository;
    private RoleRepository roleRepository;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository, RoleRepository roleRepository) {
        this.appUserRepository = appUserRepository;
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
        AppUser savedAppUser = appUserRepository.save(appUser);
        return savedAppUser;
    }
}
