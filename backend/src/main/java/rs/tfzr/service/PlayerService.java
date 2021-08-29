package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.Club;
import rs.tfzr.model.Player;
import rs.tfzr.repository.CategoryRepository;
import rs.tfzr.repository.ClubRepository;
import rs.tfzr.repository.PlayerRepository;
import rs.tfzr.repository.LocationRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class PlayerService {

    private PlayerRepository playerRepository;
    private ClubRepository clubRepository;
    private LocationRepository locationRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public PlayerService(ClubRepository clubRepository, PlayerRepository playerRepository, LocationRepository locationRepository, CategoryRepository categoryRepository) {
        this.playerRepository = playerRepository;
        this.locationRepository = locationRepository;
        this.categoryRepository = categoryRepository;
        this.clubRepository = clubRepository;
    }

    public Player getOne(Long id) {
        return playerRepository.getOne(id);
    }

    public List<Player> getAll() {
        return playerRepository.findAll();
    }

    public void delete(Long id) {
        Player player = this.playerRepository.getOne(id);
        player.setLocation(null);
        playerRepository.save(player);
    }

    public Player edit(Player player) {
        return playerRepository.save(player);
    }

    public Player insert(Player player) {
        player.setLocation(
                this.locationRepository.findByName(player.getLocation().getName())
        );

        System.out.println(player.toString());
        return playerRepository.save(player);
    }

}
