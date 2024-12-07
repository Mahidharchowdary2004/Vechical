package com.klef.jfsd.exam;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class App {
    public static void main(String[] args) {
        // Configure Hibernate
        Configuration cfg = new Configuration();
        cfg.configure("hibernate.cfg.xml");
        cfg.addAnnotatedClass(Vehicle.class);
        cfg.addAnnotatedClass(Car.class);
        cfg.addAnnotatedClass(Truck.class);

        SessionFactory factory = cfg.buildSessionFactory();
        Session session = factory.openSession();
        Transaction transaction = session.beginTransaction();

        // Insert Vehicle
        Vehicle vehicle = new Vehicle();
        vehicle.setName("Generic Vehicle");
        vehicle.setType("Utility");
        vehicle.setMaxSpeed(100);
        vehicle.setColor("White");
        session.save(vehicle);

        // Insert Car
        Car car = new Car();
        car.setName("Sedan");
        car.setType("Car");
        car.setMaxSpeed(180);
        car.setColor("Black");
        car.setNumberOfDoors(4);
        session.save(car);

        // Insert Truck
        Truck truck = new Truck();
        truck.setName("Cargo Truck");
        truck.setType("Truck");
        truck.setMaxSpeed(120);
        truck.setColor("Blue");
        truck.setLoadCapacity(1500);
        session.save(truck);

        transaction.commit();
        session.close();
        factory.close();

        System.out.println("Records inserted successfully!");
    }
}
