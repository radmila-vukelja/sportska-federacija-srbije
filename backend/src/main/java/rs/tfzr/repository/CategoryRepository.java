package rs.tfzr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import rs.tfzr.model.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
