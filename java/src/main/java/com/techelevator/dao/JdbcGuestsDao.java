package com.techelevator.dao;

import com.techelevator.model.Guests;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcGuestsDao implements GuestsDao{

    private JdbcTemplate jdbcTemplate;
    public JdbcGuestsDao(DataSource dataSource) {this.jdbcTemplate = new JdbcTemplate(dataSource);}
    @Override
    public List<Guests> getAllGuests(int id) {
        List<Guests> guests = new ArrayList<>();
        String sql = "SELECT * FROM guests WHERE invitation_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        while(results.next()) {
            Guests guest = mapRowToGuest(results);
            guests.add(guest);
        }

        return guests;
    }

    @Override
    public Guests getGuest(int id) {
        Guests guest = new Guests();
        String sql = "SELECT * FROM guests WHERE guest_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        if(results.next()) {
            guest = mapRowToGuest(results);
        }

        return guest;
    }

    @Override
    public boolean createGuest(Guests guest) {
        String sql = "INSERT INTO guests (guest_id, name, email, invitation_id) "
                + "VALUES (DEFAULT, ?, ?, ?);";

        return jdbcTemplate.update(sql,guest.getName(), guest.getEmail(), guest.getInvitationId()) == 1;
    }

    @Override
    public boolean removeGuest(int id) {
        String sql = "DELETE FROM guests WHERE guest_id = ?;";

        return jdbcTemplate.update(sql,id) == 1;
    }

    private Guests mapRowToGuest(SqlRowSet rowSet) {
        Guests guest = new Guests();
        guest.setGuestId(rowSet.getInt("guest_id"));
        guest.setName(rowSet.getString("name"));
        guest.setEmail(rowSet.getString("email"));
        guest.setInvitationId(rowSet.getInt("invitation_id"));

        return guest;
    }
    @Override
    public int getGuestId(String name) {
        Guests guest = new Guests();
        String sql = "SELECT * FROM guests "
        +"WHERE name = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, name);
        if(results.next()) {
            guest = mapRowToGuest(results);
        }

        return guest.getGuestId();
    }
}
