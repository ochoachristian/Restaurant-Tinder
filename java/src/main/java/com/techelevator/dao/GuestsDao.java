package com.techelevator.dao;

import com.techelevator.model.Guests;

import java.util.List;

public interface GuestsDao {

    public List<Guests> getAllGuests(int id);

    public Guests getGuest(int id);

    public boolean createGuest(Guests guest);

    public boolean removeGuest(int id);
}
