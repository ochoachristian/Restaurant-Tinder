package com.techelevator.dao;

import com.techelevator.model.Invitation;

import java.util.List;

public interface InvitationDao {
    public List<Invitation> getInvitations(int id);

    public Invitation getInvitation(int id);

    public boolean createInvitation(Invitation invite);//restaurant will be null until decision has been made

    public boolean updateInvitation(Invitation invite); //once decision made, insert restaurant to table

    public int getInvitationId(int id);
}
