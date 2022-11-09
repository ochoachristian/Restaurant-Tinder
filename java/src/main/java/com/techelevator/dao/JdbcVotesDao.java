package com.techelevator.dao;

import com.techelevator.model.Votes;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcVotesDao implements VotesDao {
    private JdbcTemplate jdbcTemplate;

    public JdbcVotesDao(DataSource dataSource) {this.jdbcTemplate = new JdbcTemplate(dataSource);}
    @Override
    public boolean createVote(Votes vote) {
        String sql = "INSERT INTO votes (vote_id, restaurant, thumbs_up, thumbs_down, invitation_id) "
                + "VALUES (?, ?, ?, ?, ?);";
        return jdbcTemplate.update(sql, vote.getVoteId(),vote.getRestaurant(),vote.getThumbsUp(), vote.getThumbsDown(), vote.getInvitationId()) == 1;
    }

    @Override
    public List<Votes> getVotes(int id) {
        List<Votes> votes = new ArrayList<>();
        String sql = "SELECT * FROM votes WHERE invitation_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        while(results.next()) {
            Votes vote = mapRowToVotes(results);
            votes.add(vote);
        }
        return votes;
    }

    @Override
    public Votes getVote(int id) {
        Votes vote = new Votes();
        String sql = "SELECT * FROM votes WHERE vote_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        if(results.next()) {
            vote = mapRowToVotes(results);
        }
        return vote;
    }

    @Override
    public boolean incrementVote(int id) {
        String sql = "UPDATE votes SET thumbs_up = thumbs_up + 1 "
                + "WHERE vote_id = ?;";

        return jdbcTemplate.update(sql,id) == 1;
    }

    @Override
    public boolean decrementVote(int id) {
        String sql = "UPDATE votes SET thumbs_down = thumbs_down + 1 "
                + "WHERE vote_id = ?;";

        return jdbcTemplate.update(sql,id) == 1;
    }


    private Votes mapRowToVotes(SqlRowSet rowSet) {
        Votes vote = new Votes();
        vote.setVoteId(rowSet.getInt("vote_id"));
        vote.setRestaurant(rowSet.getString("restaurant"));
        vote.setThumbsUp(rowSet.getInt("thumbs_up"));
        vote.setThumbsDown(rowSet.getInt("thumbs_down"));
        vote.setInvitationId(rowSet.getInt("invitation_id"));

        return vote;
    }
}
