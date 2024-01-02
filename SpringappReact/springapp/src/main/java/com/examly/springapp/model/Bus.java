package com.examly.springapp.model;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Bus {
    @Id
    public int id;
    public String name;
    public int capacity;
    public String servicedate;
    public int Kilometer;
    public String BusType;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getServicedate() {
        return servicedate;
    }

    public void setServicedate(String servicedate) {
        this.servicedate = servicedate;
    }

    public int getKilometer() {
        return Kilometer;
    }

    public void setKilometer(int kilometer) {
        Kilometer = kilometer;
    }

    public String getBusType() {
        return BusType;
    }

    public void setBusType(String busType) {
        BusType = busType;
    }

    public Bus() {
    }

    public Bus(int id, String name, int capacity, String servicedate, int Kilometer, String BusType) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.servicedate = servicedate;
        this.Kilometer = Kilometer;
        this.BusType = BusType;
    }

    
    
}
