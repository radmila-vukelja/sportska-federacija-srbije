package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.Club;
import rs.tfzr.model.Player;
import rs.tfzr.repository.ClubRepository;
import rs.tfzr.repository.PlayerRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class ClubService {

    private ClubRepository clubRepository;
    private PlayerRepository playerRepository;

    @Autowired
    public ClubService(
            ClubRepository clubRepository,
            PlayerRepository playerRepository
    ) {
        this.clubRepository = clubRepository;
        this.playerRepository = playerRepository;
    }

    public Club getOne(Long id) {
        return clubRepository.getOne(id);
    }

    public List<Club> getAll() {
        return clubRepository.findAll();
    }

    public void delete(Long id) {
        Club club = clubRepository.getOne(id);

        club.setLocation(null);
        club.setPlayerList(null);
        club.setSportType(null);
        clubRepository.save(club);
        clubRepository.deleteById(id);
    }

    public Club edit(Club club) {
        System.out.println(club.toString());
        return clubRepository.save(club);
    }

    public void addContestantToAClub(Long clubId, Long contestantId) {
        Club club = this.clubRepository.getOne(clubId);
        Player player = this.playerRepository.getOne(contestantId);
        club.getPlayerList().add(player);
        clubRepository.save(club);
    }

    public void removeContenstantFromClub(Long clubId, Long contestantId) {
        Club club = this.clubRepository.getOne(clubId);
        for (int i = 0; i < club.getPlayerList().size(); i++) {
            Player player = club.getPlayerList().get(i);
            if (player.getId().equals(contestantId)) {
                club.getPlayerList().remove(i);
                break;
            }
        }
        edit(club);

    }

    public Club insert(Club club) {
        System.out.println(club.toString());
        return clubRepository.save(club);
    }
}
