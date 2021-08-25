package rs.tfzr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.tfzr.model.Category;
import rs.tfzr.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/{id}")
    public ResponseEntity getOne(@PathVariable("id") Long id) {
        return new ResponseEntity(this.categoryService.getOne(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity getAll() {
        return new ResponseEntity(this.categoryService.getAll(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity edit(@RequestBody Category category) {
        return new ResponseEntity(categoryService.edit(category), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Category category) {
        return new ResponseEntity(this.categoryService.insert(category), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        this.categoryService.delete(id);
        return new ResponseEntity(this.categoryService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/get-categories")
    public ResponseEntity getDistinctCategories(){
        return new ResponseEntity(this.categoryService.getAll(), HttpStatus.OK);
    }
}