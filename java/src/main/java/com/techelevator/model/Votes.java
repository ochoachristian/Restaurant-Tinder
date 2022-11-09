package com.techelevator.model;

public class Votes {
    private int voteId;
    private String restaurant;
    private int thumbsUp;
    private int thumbsDown;
    private int invitationId;

    public Votes() {
    }

    public Votes(int voteId, String restaurant, int thumbsUp, int thumbsDown, int invitationId) {
        this.voteId = voteId;
        this.restaurant = restaurant;
        this.thumbsUp = thumbsUp;
        this.thumbsDown = thumbsDown;
        this.invitationId = invitationId;
    }

    public int getVoteId() {
        return voteId;
    }

    public void setVoteId(int voteId) {
        this.voteId = voteId;
    }

    public String getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(String restaurant) {
        this.restaurant = restaurant;
    }

    public int getThumbsUp() {
        return thumbsUp;
    }

    public void setThumbsUp(int thumbsUp) {
        this.thumbsUp = thumbsUp;
    }

    public int getThumbsDown() {
        return thumbsDown;
    }

    public void setThumbsDown(int thumbsDown) {
        this.thumbsDown = thumbsDown;
    }

    public int getInvitationId() {
        return invitationId;
    }

    public void setInvitationId(int invitationId) {
        this.invitationId = invitationId;
    }
}
