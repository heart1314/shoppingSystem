package com.yg.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yg.dao.OrderDAO;
import com.yg.model.Order;
import com.yg.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	private OrderDAO orderDAO;

	public int addOrder(Order order) {
		return orderDAO.addOrder(order);
	}

	public int findMaxOrderID() {
		return orderDAO.findMaxOrderID();
	}

	public Order findOrder(int orderID) {
		return orderDAO.findOrder(orderID);
	}

	public int updateOrder(Order order) {
		return orderDAO.updateOrder(order);
	}

	public List<Order> findAllByUserID(int userID) {
		return orderDAO.findAllByUserID(userID);
	}
	
	
}
