package com.klef.jfsd.exam;

import jakarta.persistence.Entity;

@Entity
public class Truck extends Vehicle {
    private int loadCapacity;

    // Getters and Setters
    public int getLoadCapacity() {
        return loadCapacity;
    }
    public void setLoadCapacity(int loadCapacity) {
        this.loadCapacity = loadCapacity;
    }
}
