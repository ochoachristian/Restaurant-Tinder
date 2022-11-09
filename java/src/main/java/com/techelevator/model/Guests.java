package com.techelevator.model;

public class Guests {
    private int guestId;
    private String name;
    private String email;
    private int voteId;
    private int invitationId;

    public Guests() {
    }

    public Guests(int guestId, String name, String email, int voteId, int invitationId) {
        this.guestId = guestId;
        this.name = name;
        this.email = email;
        this.voteId = voteId;
        this.invitationId = invitationId;
    }

    public int getGuestId() {
        return guestId;
    }

    public void setGuestId(int guestId) {
        this.guestId = guestId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getVoteId() {
        return voteId;
    }

    public void setVoteId(int voteId) {
        this.voteId = voteId;
    }

    public int getInvitationId() {
        return invitationId;
    }

    public void setInvitationId(int invitationId) {
        this.invitationId = invitationId;
    }
}
