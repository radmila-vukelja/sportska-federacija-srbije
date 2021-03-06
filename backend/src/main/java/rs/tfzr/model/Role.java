package rs.tfzr.model;

import javax.persistence.*;

@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RoleType type;

    public Role() {
    }

    public Role(RoleType type) {
        this.type = type;
    }

    public Role(Long id, RoleType type) {
        this.id = id;
        this.type = type;
    }

    public RoleType getType() {
        return type;
    }

    public void setType(RoleType type) {
        this.type = type;
    }

    public enum RoleType {
        ROLE_USER, ROLE_ADMIN
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", type=" + type +
                '}';
    }
}
