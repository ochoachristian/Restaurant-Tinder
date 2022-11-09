package com.techelevator.dao;

import com.techelevator.model.Votes;

import java.util.List;

public interface VotesDao {

    public boolean createVote(Votes vote);

    public List<Votes> getVotes(int id);

    public Votes getVote(int id);

    public boolean incrementVote(int id);

    public boolean decrementVote(int id);
}
