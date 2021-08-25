package rs.tfzr.model;

import javax.persistence.Column;
import java.util.List;

public class AuthenticatedAppUser {

    private Long id;
    private String username;
    private String role;

    public AuthenticatedAppUser() {
    }

    public AuthenticatedAppUser(Long id, String username, String role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
