package com.yg.model;

import java.util.Date;

public class Commodity {
	private Integer id;
	private String name;
	private String norms;
	private double price;
	private String state;
	private String type;
	private String tip;
	private String des;
	private String brand;
	private Date date;
	private String note;
	private String picture;
	private String casePic;
	private Integer sum;
	private Integer saleSum;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public String getDes() {
		return des;
	}

	public void setDes(String des) {
		this.des = des;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getCasePic() {
		return casePic;
	}

	public void setCasePic(String casePic) {
		this.casePic = casePic;
	}

	public Integer getSum() {
		return sum;
	}

	public void setSum(Integer sum) {
		this.sum = sum;
	}

	public Integer getSaleSum() {
		return saleSum;
	}

	public void setSaleSum(Integer saleSum) {
		this.saleSum = saleSum;
	}

	@Override
	public String toString() {
		return "Commodity [id=" + id + ", name=" + name + ", norms=" + norms + ", price=" + price + ", state=" + state
				+ ", type=" + type + ", tip=" + tip + ", des=" + des + ", brand=" + brand + ", date=" + date + ", note="
				+ note + ", picture=" + picture + ", casePic=" + casePic + ", sum=" + sum + ", saleSum=" + saleSum
				+ "]";
	}

	
}
