package rs.tfzr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.tfzr.model.SportType;
import rs.tfzr.service.SportTypeService;

@RestController
@RequestMapping("/sport-type")
@CrossOrigin
public class SportTypeController {

    private SportTypeService sportTypeService;

    @Autowired
    public SportTypeController(SportTypeService sportTypeService) {
        this.sportTypeService = sportTypeService;
    }

    @GetMapping("/{id}")
    public ResponseEntity getOne(@PathVariable("id") Long id) {
        return new ResponseEntity(this.sportTypeService.getOne(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity getAll() {
        return new ResponseEntity(this.sportTypeService.getAll(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity edit(@RequestBody SportType sportType) {
        return new ResponseEntity(sportTypeService.edit(sportType), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity save(@RequestBody SportType sportType) {
        return new ResponseEntity(this.sportTypeService.insert(sportType), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        this.sportTypeService.delete(id);
        return new ResponseEntity(null, HttpStatus.OK);
    }

    @GetMapping("/find-by-category-id/{id}")
    public ResponseEntity findByCategoryId(@PathVariable("id") Long id) {
        return new ResponseEntity(this.sportTypeService.findByCategories(id), HttpStatus.OK);
    }

}
