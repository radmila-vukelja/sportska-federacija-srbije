package rs.tfzr.model;

public class AuthenticatedAppUser {

    private Long id;
    private String username;
    private String role;
    private Boolean emailIsConfirmed;
    private Boolean userIsBanned;

    public AuthenticatedAppUser() {
    }

    public AuthenticatedAppUser(Long id, String username, String role, Boolean emailIsConfirmed, Boolean userIsBanned) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.emailIsConfirmed = emailIsConfirmed;
        this.userIsBanned = userIsBanned;
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

    public Boolean getEmailIsConfirmed() {
        return emailIsConfirmed;
    }

    public void setEmailIsConfirmed(Boolean emailIsConfirmed) {
        this.emailIsConfirmed = emailIsConfirmed;
    }

    public Boolean getUserIsBanned() {
        return userIsBanned;
    }

    public void setUserIsBanned(Boolean userIsBanned) {
        this.userIsBanned = userIsBanned;
    }
}
