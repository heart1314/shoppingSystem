package com.yg.model;

public class Address {
	private Integer userID;
	private Integer addressID;
	private String name;
	private String province;
	private String city;
	private String area;
	private String address;
	private String mobile;
	private String zipCode;
	private String tolerant;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getTolerant() {
		return tolerant;
	}

	public void setTolerant(String tolerant) {
		this.tolerant = tolerant;
	}

	@Override
	public String toString() {
		return "Address [userID=" + userID + ", addressID=" + addressID + ", name=" + name + ", province=" + province
				+ ", city=" + city + ", area=" + area + ", address=" + address + ", mobile=" + mobile + ", zipCode="
				+ zipCode + ", tolerant=" + tolerant + "]";
	}

}
