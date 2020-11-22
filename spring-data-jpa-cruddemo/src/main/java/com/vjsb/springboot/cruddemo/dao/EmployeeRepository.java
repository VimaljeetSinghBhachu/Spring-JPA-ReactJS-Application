package com.vjsb.springboot.cruddemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vjsb.springboot.cruddemo.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	// that's it ... no need to write any code LoL!
}
