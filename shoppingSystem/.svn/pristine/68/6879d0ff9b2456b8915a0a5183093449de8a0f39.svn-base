package com.yg.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yg.dao.AddressDAO;
import com.yg.model.Address;
import com.yg.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressDAO addressDAO;

	public List<Address> findAllByUserID(Integer id) {
		return addressDAO.findAllByUserID(id);
	}

	public Address findAddress(Integer userID, Integer addressID) {
		return addressDAO.findAddress(userID, addressID);
	}

	public Address findTolerantAddress(Integer userID, String tolerant) {
		return addressDAO.findTolerantAddress(userID, tolerant);
	}

	public int updateAddress(Address add) {
		return addressDAO.updateAddress(add);
	}

	public int deleteAddress(Integer userID, Integer addressID) {
		return addressDAO.deleteAddress(userID, addressID);
	}

	public int insertAddress(Address add) {
		return addressDAO.insertAddress(add);
	}

	public int sumAddress(Integer id) {
		return addressDAO.sumAddress(id);
	}

	public int maxAddressID(Integer id) {
		return addressDAO.maxAddressID(id);
	}

}
