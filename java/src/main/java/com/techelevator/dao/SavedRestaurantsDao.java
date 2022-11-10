package com.techelevator.dao;

import com.techelevator.model.SavedRestaurants;

import java.util.List;

public interface SavedRestaurantsDao {

    public List<SavedRestaurants> getAllRestaurants(int id);

    public SavedRestaurants getRestaurant(int id);

    public boolean saveRestaurant(SavedRestaurants savedRestaurant);

    public boolean removeRestaurant(int id);

}
