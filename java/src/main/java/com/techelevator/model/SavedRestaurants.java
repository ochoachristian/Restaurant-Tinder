package com.techelevator.model;

public class SavedRestaurants {

    private int restaurantId;
    private String image;
    private String name;
    private String address;
    private String phoneNumber;
    private int userId;

    public SavedRestaurants() {
    }

    public SavedRestaurants(int restaurantId, String image, String name, String address, String phoneNumber, int userId) {
        this.restaurantId = restaurantId;
        this.image = image;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.userId = userId;
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
