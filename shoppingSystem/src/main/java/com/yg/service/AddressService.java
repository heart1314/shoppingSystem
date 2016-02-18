package com.yg.service;

import java.util.List;

import com.yg.model.Address;

public interface AddressService {
	
	public List<Address> findAllByUserID(Integer id);
	
	public Address findAddress(Integer userID, Integer addressID);
	
	public Address findTolerantAddress(Integer userID, String tolerant);
	
	public int updateAddress(Address add);
	
	public int deleteAddress(Integer userID, Integer addressID);
	
	public int insertAddress(Address add);
	
	public int sumAddress(Integer id);
	
	public int maxAddressID(Integer id);
}
