package com.techelevator.dao;

import com.techelevator.model.Invitation;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcInvitationDao implements InvitationDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcInvitationDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<Invitation> getInvitations(int id) {
        List<Invitation> invitations = new ArrayList<>();
        String sql = "SELECT * FROM invitation "
                + "WHERE host_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        while(results.next()) {
            Invitation invitation = mapRowToInvitation(results);
            invitations.add(invitation);
        }
        return invitations;
    }

    @Override
    public Invitation getInvitation(int id) {
        Invitation invitation = new Invitation();
        String sql = "SELECT * FROM invitation "
                + "WHERE invitation_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
        if(results.next()) {
            invitation = mapRowToInvitation(results);
        }

        return invitation;
    }

    public int getInvitationId(int hostId) {
        Invitation invitation = new Invitation();
        String sql = "SELECT * FROM invitation "
        +"WHERE host_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, hostId);
        if(results.next()) {
            invitation = mapRowToInvitation(results);
        }

        return invitation.getInvitationId();
    }

    @Override
    public boolean createInvitation(Invitation invite) {
        String sql = "INSERT INTO invitation (invitation_id, host_id, city, restaurant_id, meeting_date, decision_date) "
                + "VALUES (DEFAULT, ?, ?, DEFAULT, ?, ?);";

        return jdbcTemplate.update(sql, invite.getHostId(),invite.getCity(),invite.getMeetingDate(),invite.getDecisionDate()) == 1;
    }

    @Override
    public boolean updateInvitation(Invitation invite) {
        String sql = "UPDATE invitation SET restaurant = ? WHERE invitation_id = ?;";
        return jdbcTemplate.update(sql,invite.getRestaurantId(),invite.getInvitationId()) == 1;
    }

    private Invitation mapRowToInvitation(SqlRowSet rowSet) {
        Invitation invite = new Invitation();
        invite.setInvitationId(rowSet.getInt("invitation_id"));
        invite.setHostId(rowSet.getInt("host_id"));
        invite.setCity(rowSet.getString("city"));
        invite.setRestaurantId(rowSet.getInt("restaurant_id"));
        invite.setMeetingDate(rowSet.getDate("meeting_date"));
        invite.setDecisionDate(rowSet.getDate("decision_date"));

        return invite;
    }
}
