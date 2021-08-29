package rs.tfzr.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "player")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private Integer age;

    @ManyToOne(cascade=CascadeType.ALL)
    private Location location;

    @Column(nullable = false)
    private Long jmbg;

    @Column(nullable = false)
    private String gender;

    @ManyToOne(cascade=CascadeType.ALL)
    private Category category;

    public Player(){}

    public Player(Long id, String name, String lastName, Integer age, Location location, Long jmbg, String gender, Category category) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.location = location;
        this.jmbg = jmbg;
        this.gender = gender;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Long getJmbg() {
        return jmbg;
    }

    public void setJmbg(Long jmbg) {
        this.jmbg = jmbg;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", location=" + location +
                ", jmbg=" + jmbg +
                ", gender='" + gender + '\'' +
                ", category=" + category +
                '}';
    }
}
