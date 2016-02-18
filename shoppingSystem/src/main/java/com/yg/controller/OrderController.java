package com.yg.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.sound.midi.MidiDevice.Info;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yg.model.Order;
import com.yg.service.OrderService;

@Controller
@RequestMapping("/order")
public class OrderController {
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private OrderService orderService;
	
	@RequestMapping("/addOrder")
	@ResponseBody
	public boolean addOrder(@RequestParam(value="userID") int userID, 
			@RequestParam(value="addressID") int addressID, @RequestParam(value="sum") double sum,
			@RequestParam(value="state") int state,@RequestParam(value="cards") String cards){
		logger.info("#######生成订单");
		Order order = new Order();
		order.setAddressID(addressID);
		order.setCards(cards);
		order.setUserID(userID);
		order.setSum(sum);
		order.setState(state);
		order.setOrderID(orderService.findMaxOrderID()+1);
		Date date = new Date();
		Timestamp time = new Timestamp(date.getTime());
		order.setDate(time);
		return orderService.addOrder(order) > 0;
	}
	
	@RequestMapping("/updateOrder")
	@ResponseBody
	public boolean updateOrder(){
		logger.info("#######更新订单状态");
		int id = orderService.findMaxOrderID();
		logger.info("#######需要更新的订单ID为："+id);
		Order order = orderService.findOrder(id);
		logger.info(order.toString());
		order.setState(1);
		return orderService.updateOrder(order) > 0;
	}
	
	@RequestMapping("/findAllByUserID")
	@ResponseBody
	public List<Order> findAllByUserID(int userID){
		logger.info("#######查找当前用户所有订单");
		return orderService.findAllByUserID(userID);
	}
}
