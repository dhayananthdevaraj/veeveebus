package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Bus;


@Repository
public interface BusRepo extends JpaRepository<Bus,Integer> {
    
}