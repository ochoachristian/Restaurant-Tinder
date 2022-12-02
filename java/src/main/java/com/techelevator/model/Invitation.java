package com.techelevator.model;

import java.util.Date;

public class Invitation {
    private int invitationId;
    private int hostId;
    private String city;
    private int restaurantId;
    private Date meetingDate;
    private Date decisionDate;

    public Invitation() {
    }

    public Invitation(int invitationId, int hostId, String city, int restaurantId, Date meetingDate, Date decisionDate) {
        this.invitationId = invitationId;
        this.hostId = hostId;
        this.city = city;
        this.restaurantId = restaurantId;
        this.meetingDate = meetingDate;
        this.decisionDate = decisionDate;
    }

    public int getInvitationId() {
        return invitationId;
    }

    public void setInvitationId(int invitationId) {
        this.invitationId = invitationId;
    }

    public int getHostId() {
        return hostId;
    }

    public void setHostId(int hostId) {
        this.hostId = hostId;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Date getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(Date meetingDate) {
        this.meetingDate = meetingDate;
    }

    public Date getDecisionDate() {
        return decisionDate;
    }

    public void setDecisionDate(Date decisionDate) {
        this.decisionDate = decisionDate;
    }
}
