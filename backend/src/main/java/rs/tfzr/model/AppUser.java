package rs.tfzr.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "user")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String password;

    @Column
    private Boolean emailIsConfirmed;

    @Column
    private String emailConfirmationString;

    @Column
    private Boolean userIsBanned;

    @ManyToOne(cascade=CascadeType.ALL)
    private Role role;

    public AppUser() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String korisnickoIme) {
        this.userName = korisnickoIme;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String sifra) {
        this.password = sifra;
    }

    public String getName() {
        return name;
    }

    public void setName(String ime) {
        this.name = ime;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String prezime) {
        this.lastName = prezime;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getEmailIsConfirmed() {
        return emailIsConfirmed;
    }

    public void setEmailIsConfirmed(Boolean emailIsConfirmed) {
        this.emailIsConfirmed = emailIsConfirmed;
    }

    public String getEmailConfirmationString() {
        return emailConfirmationString;
    }

    public void setEmailConfirmationString(String emailConfirmationString) {
        this.emailConfirmationString = emailConfirmationString;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Boolean getUserIsBanned() {
        return userIsBanned;
    }

    public void setUserIsBanned(Boolean userIsBanned) {
        this.userIsBanned = userIsBanned;
    }

    @Override
    public String toString() {
        return "AppUser{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", emailIsConfirmed=" + emailIsConfirmed +
                ", emailConfirmationString='" + emailConfirmationString + '\'' +
                ", userIsBanned=" + userIsBanned +
                ", role=" + role +
                '}';
    }
}
