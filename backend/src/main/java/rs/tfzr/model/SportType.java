package rs.tfzr.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "club_type")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SportType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String sport;

    @Column(nullable = false)
    private Boolean teamSport;

    @OneToMany(cascade=CascadeType.ALL)
    private List<Category> categories;

    public SportType() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSport() {
        return sport;
    }

    public void setSport(String sport) {
        this.sport = sport;
    }

    public Boolean getTeamSport() {
        return teamSport;
    }

    public void setTeamSport(Boolean teamSport) {
        this.teamSport = teamSport;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    @Override
    public String toString() {
        return "SportType{" +
                "id=" + id +
                ", sport='" + sport + '\'' +
                ", teamSport=" + teamSport +
                ", categories=" + categories +
                '}';
    }
}
