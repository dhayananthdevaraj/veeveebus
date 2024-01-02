package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Bus;
import com.examly.springapp.repository.BusRepo;

@Service
public class BusService {

    @Autowired
    private BusRepo busRepo;

    public boolean addBus(Bus bus) {
        return busRepo.save(bus) != null ? true : false;
    }
        
    
    public List <Bus> getAllBus()
    {
        return busRepo.findAll();
    }

   
}
