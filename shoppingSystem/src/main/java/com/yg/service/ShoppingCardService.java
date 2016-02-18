package com.yg.service;

import java.util.List;

import com.sun.org.apache.xml.internal.resolver.helpers.PublicId;
import com.yg.model.ShoppingCard;

public interface ShoppingCardService {
	
	public int addCard(ShoppingCard card);
	
	public int findSum(int userID);
	
	public List<ShoppingCard> findAll(int userID);
	
	public int maxCardID(int userID);
	
	public int delCard(int userID,int cardID);
	
	public ShoppingCard findData(int userID, int cardID);
	
}
