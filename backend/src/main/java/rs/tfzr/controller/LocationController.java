package rs.tfzr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.tfzr.model.Location;
import rs.tfzr.service.LocationService;

@RestController
@RequestMapping("/location")
@CrossOrigin
public class LocationController {

    private LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity getOne(@PathVariable("id") Long id) {
        return new ResponseEntity(this.locationService.getOne(id), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity getAll() {
        return new ResponseEntity(this.locationService.getAll(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity edit(@RequestBody Location location) {
        return new ResponseEntity(locationService.edit(location), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Location location) {
        return new ResponseEntity(this.locationService.insert(location), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        this.locationService.delete(id);
        return new ResponseEntity(this.locationService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/find-by-name/{name}")
    public ResponseEntity findByName(@PathVariable("name") String name) {
        return new ResponseEntity(this.locationService.findByName(name), HttpStatus.OK);
    }
}