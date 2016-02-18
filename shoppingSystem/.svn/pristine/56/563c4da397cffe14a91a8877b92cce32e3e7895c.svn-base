package com.yg.service;

import java.util.List;

import org.omg.CosNaming.NamingContextExtPackage.StringNameHelper;

import com.yg.model.User;

public interface UserService {
	public List<User> findAll();
	
	public List<User> findUserByRole(String role);
	
	public User findUserById(Integer id);
	
	public int updateUser(User user);
	
	public int insertUser(User user);
	
	public int deleteUser(Integer id);
	
	public User findUserByUsername(String username);
	
	public int registerUser(User user);
	
	public User loginUser(String username, String password);
}
