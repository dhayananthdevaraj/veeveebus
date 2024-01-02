package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Bus;
import com.examly.springapp.service.BusService;

@RestController
public class ApiController {

    @Autowired
    private BusService busService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addBus")
    public boolean addBus(@RequestBody Bus bus)
    {
        return busService.addBus(bus);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllBus")
    public List <Bus> getAllBus()
    {
        return busService.getAllBus();
    }

   
    
}
