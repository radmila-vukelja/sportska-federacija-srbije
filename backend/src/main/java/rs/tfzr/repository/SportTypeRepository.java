package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.tfzr.model.Category;
import rs.tfzr.model.SportType;

public interface SportTypeRepository extends JpaRepository<SportType, Long> {

    SportType findClubTypeBySport(String sport);

    SportType findByCategories(Category category);
}
