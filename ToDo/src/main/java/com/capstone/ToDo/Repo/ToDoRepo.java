package com.capstone.ToDo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.ToDo.Model.ToDo;

@Repository
public interface ToDoRepo extends JpaRepository<ToDo, Long>{

}
