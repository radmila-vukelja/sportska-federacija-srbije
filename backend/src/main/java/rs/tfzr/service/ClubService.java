package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.Club;
import rs.tfzr.repository.ClubRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class ClubService {

    private ClubRepository clubRepository;

    @Autowired
    public ClubService(
            ClubRepository clubRepository
    ) {
        this.clubRepository = clubRepository;
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
        club.setSportType(null);
        clubRepository.save(club);
        clubRepository.deleteById(id);
    }

    public Club edit(Club club) {
        System.out.println(club.toString());
        return clubRepository.save(club);
    }

    public Club insert(Club club) {
        System.out.println(club.toString());
        return clubRepository.save(club);
    }
}
