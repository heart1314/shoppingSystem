package com.yg.service;

import java.util.List;

import com.yg.model.Order;

public interface OrderService {
	
	public int addOrder(Order order);
	
	public int findMaxOrderID();
	
	public Order findOrder(int orderID);
	
	public int updateOrder(Order order);
	
	public List<Order> findAllByUserID(int userID);
}
