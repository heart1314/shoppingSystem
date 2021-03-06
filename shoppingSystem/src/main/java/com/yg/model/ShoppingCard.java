package com.yg.model;

public class ShoppingCard {
	private Integer userID;
	private Integer cardID;
	private String name;
	private String norms;
	private String tip;
	private double price;
	private Integer amount;
	private double sum;
	private Integer commodityID;

	public Integer getUserID() {
		return userID;
	}

	public void setUserID(Integer userID) {
		this.userID = userID;
	}

	public Integer getCardID() {
		return cardID;
	}

	public void setCardID(Integer cardID) {
		this.cardID = cardID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNorms() {
		return norms;
	}

	public void setNorms(String norms) {
		this.norms = norms;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public double getSum() {
		return sum;
	}

	public void setSum(double sum) {
		this.sum = sum;
	}

	public Integer getCommodityID() {
		return commodityID;
	}

	public void setCommodityID(Integer commodityID) {
		this.commodityID = commodityID;
	}

	@Override
	public String toString() {
		return "ShoppingCard [userID=" + userID + ", cardID=" + cardID + ", name=" + name + ", norms=" + norms
				+ ", tip=" + tip + ", price=" + price + ", amount=" + amount + ", sum=" + sum + ", commodityID="
				+ commodityID + "]";
	}

}
