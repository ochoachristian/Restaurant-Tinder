package com.techelevator.model;

import java.util.Date;

public class Invitation {
    private int invitationId;
    private int hostId;
    private String city;
    private String restaurant;
    private Date meetingDate;
    private Date decisionDate;

    public Invitation() {
    }

    public Invitation(int invitationId, int hostId, String city, String restaurant, Date meetingDate, Date decisionDate) {
        this.invitationId = invitationId;
        this.hostId = hostId;
        this.city = city;
        this.restaurant = restaurant;
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

    public String getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(String restaurant) {
        this.restaurant = restaurant;
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
