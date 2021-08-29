package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.Player;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {

}
