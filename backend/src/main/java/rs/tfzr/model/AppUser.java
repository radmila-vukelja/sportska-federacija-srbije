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

    @ManyToOne(cascade = CascadeType.ALL)
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

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
                ", role=" + role +
                '}';
    }
}
