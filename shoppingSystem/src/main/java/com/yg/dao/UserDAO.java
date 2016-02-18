package com.yg.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.yg.model.User;

public interface UserDAO {
	public List<User> findAll();

	public List<User> findUserByRole(String role);
	
	public User findUserById(Integer id);
	
	public int updateUser(User user);
	
	public int insertUser(User user);
	
	public int deleteUser(Integer id);
	
	public User findUserByUsername(String username);
	
	public int registerUser(User user);
	
	public User loginUser(@Param(value="username")String username, @Param(value="password")String password);
	
}
