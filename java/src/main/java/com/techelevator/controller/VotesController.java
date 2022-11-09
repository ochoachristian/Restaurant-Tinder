package com.techelevator.controller;

import com.techelevator.dao.VotesDao;
import com.techelevator.model.Votes;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@PreAuthorize("isAuthenticated()")
public class VotesController {
    private VotesDao votesDao;
    public VotesController(VotesDao votesDao) {this.votesDao = votesDao;}

    @GetMapping(path="/votes/{id}")
    public List<Votes> getAllVotes(@PathVariable int id) {return votesDao.getVotes(id);}

    @GetMapping(path="/vote/{id}")
    public Votes getVote(@PathVariable int id) {return votesDao.getVote(id);}

    @PostMapping(path="/vote/increment/{id}")
    public boolean incrementVote(@PathVariable int id) {return votesDao.incrementVote(id);}

    @PostMapping(path="/vote/decrement/{id}")
    public boolean decrementVote(@PathVariable int id) {return votesDao.decrementVote(id);}

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path="/votes/create")
    public boolean createVote(@RequestBody Votes vote) {return votesDao.createVote(vote);}

}
