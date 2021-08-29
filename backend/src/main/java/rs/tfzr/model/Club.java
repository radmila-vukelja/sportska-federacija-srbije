package rs.tfzr.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "club")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    private Location location;

    @Column(nullable = false)
    private String owner;

    @Column(nullable = false)
    private String contactEmail;

    @Column
    private Long numberOfMembers;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Player> playerList;

    @ManyToOne
    private SportType sportType;

    public Club() {
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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public Long getNumberOfMembers() {
        return numberOfMembers;
    }

    public void setNumberOfMembers(Long numberOfMembers) {
        this.numberOfMembers = numberOfMembers;
    }

    public List<Player> getPlayerList() {
        return playerList;
    }

    public void setPlayerList(List<Player> playerList) {
        this.playerList = playerList;
    }

    public SportType getSportType() {
        return sportType;
    }

    public void setSportType(SportType sportType) {
        this.sportType = sportType;
    }

    @Override
    public String toString() {
        return "Club{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location=" + location +
                ", owner='" + owner + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", numberOfMembers=" + numberOfMembers +
                ", playerList=" + playerList +
                ", sportType=" + sportType +
                '}';
    }
}
