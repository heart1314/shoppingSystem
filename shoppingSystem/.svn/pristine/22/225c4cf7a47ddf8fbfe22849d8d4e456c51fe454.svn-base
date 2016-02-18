package com.yg.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yg.dao.ShoppingCardDAO;
import com.yg.model.ShoppingCard;
import com.yg.service.ShoppingCardService;

@Service
public class ShoppingCardServiceImpl implements ShoppingCardService {
	
	@Autowired
	private ShoppingCardDAO shoppingCardDAO;
	
	public int addCard(ShoppingCard card) {
		return shoppingCardDAO.addCard(card);
	}

	public int findSum(int userID) {
		return shoppingCardDAO.findSum(userID);
	}

	public List<ShoppingCard> findAll(int userID) {
		return shoppingCardDAO.findAll(userID);
	}

	public int maxCardID(int userID) {
		return shoppingCardDAO.maxCardID(userID);
	}

	public int delCard(int userID, int cardID) {
		return shoppingCardDAO.delCard(userID, cardID);
	}

	public ShoppingCard findData(int userID, int cardID) {
		return shoppingCardDAO.findData(userID, cardID);
	}


}
