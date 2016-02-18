package com.yg.model;

import java.sql.Timestamp;

public class Order {

	private Integer userID;
	private Integer addressID;
	private Integer orderID;
	private String cards;
	private Timestamp date;
	private double sum;
	private Integer state;

	public Integer getUserID() {
		return userID;
	}

	public void setUserID(Integer userID) {
		this.userID = userID;
	}

	public Integer getAddressID() {
		return addressID;
	}

	public void setAddressID(Integer addressID) {
		this.addressID = addressID;
	}

	public Integer getOrderID() {
		return orderID;
	}

	public void setOrderID(Integer orderID) {
		this.orderID = orderID;
	}

	public String getCards() {
		return cards;
	}

	public void setCards(String cards) {
		this.cards = cards;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public double getSum() {
		return sum;
	}

	public void setSum(double sum) {
		this.sum = sum;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "Order [userID=" + userID + ", addressID=" + addressID + ", orderID=" + orderID + ", cards=" + cards
				+ ", date=" + date + ", sum=" + sum + ", state=" + state + "]";
	}

}
