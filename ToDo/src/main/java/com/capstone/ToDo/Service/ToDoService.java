package com.capstone.ToDo.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.capstone.ToDo.Model.ToDo;
import com.capstone.ToDo.Repo.ToDoRepo;

@Service
public class ToDoService {

	@Autowired
	private ToDoRepo repo;

	public ToDo addOrUpdate(ToDo todo) {
		return repo.save(todo);
	}

	public void delete(ToDo todo) {
		repo.delete(todo);
	}

	public List<ToDo> showAll() {
		return repo.findAll();
	}

	public ToDo getById(Long id) {
		Optional<ToDo> opt = repo.findById(id);
		if (opt.get() != null) {
			return opt.get();
		} else {
			return null;
		}
	}

}
