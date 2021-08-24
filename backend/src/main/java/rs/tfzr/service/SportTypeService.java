package rs.tfzr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.tfzr.model.Category;
import rs.tfzr.model.SportType;
import rs.tfzr.repository.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class SportTypeService {


    private SportTypeRepository sportTypeRepository;
    private LocationRepository locationRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public SportTypeService(LocationRepository locationRepository, CategoryRepository categoryRepository, SportTypeRepository sportTypeRepository) {
        this.locationRepository = locationRepository;
        this.categoryRepository = categoryRepository;
        this.sportTypeRepository = sportTypeRepository;
    }

    public SportType getOne(Long id) {
        return sportTypeRepository.getOne(id);
    }

    public List<SportType> getAll() {
        return sportTypeRepository.findAll();
    }

    public void delete(Long id) {
        SportType sportType = sportTypeRepository.getOne(id);
        sportType.setCategories(null);
        sportTypeRepository.save(sportType);
        sportTypeRepository.deleteById(id);
    }

    public SportType edit(SportType sportType) {
        System.out.println(sportType.toString());
        return sportTypeRepository.save(sportType);
    }

    public SportType insert(SportType sportType) {
        List<Category> savedCategories = new ArrayList<>();
        for(int i = 0; i < sportType.getCategories().size(); i++){
            System.out.println("\n\n\n");
            System.out.println(sportType.getCategories().get(i).toString());
          Category category = this.categoryRepository.save(sportType.getCategories().get(i));
            savedCategories.add(category);
        }
        sportType.setCategories(savedCategories);
        return sportTypeRepository.save(sportType);
    }

    public SportType findByCategories(Long id){
        Category category = categoryRepository.getOne(id);
        return this.sportTypeRepository.findByCategories(category);
    }

}
