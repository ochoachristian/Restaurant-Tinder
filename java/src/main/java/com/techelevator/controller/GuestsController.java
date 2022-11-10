package com.techelevator.controller;

import com.techelevator.dao.GuestsDao;
import com.techelevator.model.Guests;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
//@PreAuthorize("isAuthenticated()")
public class GuestsController {
    private GuestsDao guestsDao;
    public GuestsController(GuestsDao guestsDao) {this.guestsDao = guestsDao;}

    @GetMapping(path="/guests/{id}")
    public List<Guests> getAllGuests(@PathVariable int id) {return guestsDao.getAllGuests(id);}

    @GetMapping(path="/guest/{id}")
    public Guests getGuest(@PathVariable int id) {return guestsDao.getGuest(id);}

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path="/guests/create")
    public boolean createGuest(@RequestBody Guests guest) {return guestsDao.createGuest(guest);}

    @DeleteMapping(path="/guests/delete/{id}")
    public boolean removeGuest(@PathVariable int id) {return guestsDao.removeGuest(id);}
}
