package com.techelevator.dao;

import com.techelevator.model.SavedRestaurants;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcSavedRestaurantsDao implements SavedRestaurantsDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcSavedRestaurantsDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<SavedRestaurants> getAllRestaurants(int id) {
        List<SavedRestaurants> savedRestaurants = new ArrayList<>();
        String sql = "SELECT * FROM saved_restaurants WHERE user_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        while (results.next()) {
            SavedRestaurants restaurant = mapRowToRestaurant(results);
            savedRestaurants.add(restaurant);
        }
        return savedRestaurants;
    }

    @Override
    public SavedRestaurants getRestaurant(int id) {
        SavedRestaurants restaurant = new SavedRestaurants();
        String sql = "SELECT * FROM saved_restaurants WHERE restaurant_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        if(results.next()) {
            restaurant = mapRowToRestaurant(results);
        }
        return restaurant;
    }

    @Override
    public boolean saveRestaurant(SavedRestaurants savedRestaurant) {
        String sql = "INSERT INTO saved_restaurants (restaurant_id, image, name, address, phone_number, user_id) "
                + "VALUES (DEFAULT, ?, ?, ?, ?, ?);";

        return jdbcTemplate.update(sql,savedRestaurant.getImage(),savedRestaurant.getName(),savedRestaurant.getAddress(), savedRestaurant.getPhoneNumber(), savedRestaurant.getUserId()) == 1;
    }

    @Override
    public boolean removeRestaurant(int id) {
        String sql = "DELETE FROM saved_restaurants WHERE restaurant_id = ?;";
        return jdbcTemplate.update(sql,id) == 1;
    }


    private SavedRestaurants mapRowToRestaurant(SqlRowSet rowSet) {
        SavedRestaurants savedRestaurant = new SavedRestaurants();
        savedRestaurant.setRestaurantId(rowSet.getInt("restaurant_id"));
        savedRestaurant.setImage(rowSet.getString("image"));
        savedRestaurant.setAddress(rowSet.getString("address"));
        savedRestaurant.setPhoneNumber(rowSet.getString("phone_number"));
        savedRestaurant.setUserId(rowSet.getInt("user_id"));

        return savedRestaurant;
    }
}
