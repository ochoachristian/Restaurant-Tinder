package com.techelevator.controller;

import com.techelevator.dao.SavedRestaurantsDao;
import com.techelevator.model.SavedRestaurants;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
//@PreAuthorize("isAuthenticated")
public class SavedRestaurantController {

    private SavedRestaurantsDao savedRestaurantsDao;

    public SavedRestaurantController(SavedRestaurantsDao savedRestaurantsDao) {this.savedRestaurantsDao = savedRestaurantsDao;}

    @GetMapping(path="/restaurants/invitation/guest/{id}")
    public List<SavedRestaurants> getRestaurants(@PathVariable int id) {return savedRestaurantsDao.getRestaurants(id);}

    @GetMapping(path="/restaurants/{id}")
    public List<SavedRestaurants> getAllRestaurants(@PathVariable int id) {return savedRestaurantsDao.getAllRestaurants(id);}

    @GetMapping(path="/restaurant/{id}")
    public SavedRestaurants getSavedRestaurant(@PathVariable int id) {return savedRestaurantsDao.getRestaurant(id);}

    @GetMapping(path="/restaurants")
    public int getSavedRestaurantId(@RequestParam(value="name") String name) {return savedRestaurantsDao.getRestaurantId(name);}

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path="/restaurants/save")
    public boolean saveRestaurant(@RequestBody SavedRestaurants savedRestaurant) {
        return savedRestaurantsDao.saveRestaurant(savedRestaurant);
    }

    @DeleteMapping(path="/restaurants/delete/{id}")
    public boolean removeRestaurant(@PathVariable int id) {return savedRestaurantsDao.removeRestaurant(id);}
}
