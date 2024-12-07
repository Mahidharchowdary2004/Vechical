package com.klef.jfsd.exam;


@jakarta.persistence.Entity
public class Car extends Vehicle {
    private int numberOfDoors;

    // Getters and Setters
    public int getNumberOfDoors() {
        return numberOfDoors;
    }
    public void setNumberOfDoors(int numberOfDoors) {
        this.numberOfDoors = numberOfDoors;
    }
}
