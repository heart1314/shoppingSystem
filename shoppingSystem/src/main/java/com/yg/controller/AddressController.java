package com.yg.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yg.model.Address;
import com.yg.service.AddressService;

@Controller
@RequestMapping("/address")
public class AddressController {
	
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private AddressService addressService;
	
	@RequestMapping("/findAllByUserID")
	@ResponseBody
	public List<Address> findAllByUserID(@RequestParam(value = "id") String id){
		Integer ID = Integer.parseInt(id);
		return addressService.findAllByUserID(ID);
	}
	
	@RequestMapping("/setAddress")
	@ResponseBody
	public Address setAddress(@RequestParam(value = "userID") String id1,
			@RequestParam(value = "addressID") String id2){
		logger.info("#######设置默认地址");
		Integer userID = Integer.parseInt(id1);
		Integer addressID = Integer.parseInt(id2);
		Address tolerantAdd = addressService.findTolerantAddress(userID, "1");//找到原来的默认地址
		if(tolerantAdd == null){//若没有默认地址，就将当前地址设为默认
			Address add = addressService.findAddress(userID, addressID);
			add.setTolerant("1");
			addressService.updateAddress(add);
			return add;
		}
		tolerantAdd.setTolerant("0");
		addressService.updateAddress(tolerantAdd);//将原来的默认地址改为非默认
		
		Address currentAdd = addressService.findAddress(userID, addressID);//找到当前地址
		currentAdd.setTolerant("1");
		addressService.updateAddress(currentAdd);//将当前地址改为默认地址
		return currentAdd;
	}
	
	@RequestMapping("/modifyAddress")
	@ResponseBody
	public boolean modifyAddress(@RequestParam(value = "userID") String id1,@RequestParam(value = "addressID") String id2,
			@RequestParam(value = "name") String name,@RequestParam(value = "province") String province,
			@RequestParam(value = "city") String city,@RequestParam(value = "area") String area,
			@RequestParam(value = "mobile") String mobile,@RequestParam(value = "zipCode") String zipCode,
			@RequestParam(value = "address") String address,@RequestParam(value = "tolerant") String tolerant){
		Integer userID = Integer.parseInt(id1);
		Integer addressID = Integer.parseInt(id2);
		Address add = addressService.findAddress(userID, addressID);
		add.setName(name);
		add.setAddress(address);
		add.setMobile(mobile);
		add.setProvince(province);
		add.setCity(city);
		add.setArea(area);
		add.setZipCode(zipCode);
		return addressService.updateAddress(add) > 0;
	}
	
	@RequestMapping("/deleteAddress")
	@ResponseBody
	public boolean deleteAddress(@RequestParam(value = "userID") String id1,@RequestParam(value = "addressID") String id2){
		Integer userID = Integer.parseInt(id1);
		Integer addressID = Integer.parseInt(id2);
		return addressService.deleteAddress(userID, addressID) > 0;
	}
	
	@RequestMapping("/insertAddress")
	@ResponseBody
	public boolean insertAddress(@RequestParam(value = "id") String id1,@RequestParam(value = "addressID") String id2,
			@RequestParam(value = "name") String name,@RequestParam(value = "province") String province,
			@RequestParam(value = "city") String city,@RequestParam(value = "area") String area,
			@RequestParam(value = "mobile") String mobile,@RequestParam(value = "zipCode") String zipCode,
			@RequestParam(value = "address") String address,@RequestParam(value = "tolerant") String tolerant){
		Integer userID = Integer.parseInt(id1);
		Integer addressID = Integer.parseInt(id2);
		Address add = new Address();
		add.setUserID(userID);
		add.setAddressID(addressID);
		add.setName(name);
		add.setProvince(province);
		add.setCity(city);
		add.setArea(area);
		add.setMobile(mobile);
		add.setZipCode(zipCode);
		add.setTolerant(tolerant);
		add.setAddress(address);
		return addressService.insertAddress(add) > 0;
	}
	
	@RequestMapping("/sumAddress")
	@ResponseBody
	public int sumAddress(@RequestParam(value = "id")String id){
		logger.info("#######查找当前用户的收货地址总数");
		Integer userID = Integer.parseInt(id);
		return addressService.sumAddress(userID); 
	}
	
	@RequestMapping("/maxAddressID")
	@ResponseBody
	public int maxAddressID(@RequestParam(value = "id")int id){
		logger.info("#######查找当前用户最大的addressID");
		return addressService.maxAddressID(id);
	}
	
	@RequestMapping("/findTolerantAddress")
	@ResponseBody
	public Address findTolerantAddress(@RequestParam(value = "userID") int userID){
		logger.info("#######查找默认收货地址");
		Address address = addressService.findTolerantAddress(userID, "1");
		if(address != null){
			return address;
		}else{
			return null;
		}
	}
	
	@RequestMapping("/findAddress")
	@ResponseBody
	public Address findAddress(@RequestParam(value = "userID") int userID, 
			@RequestParam(value = "addressID") int addressID){
		logger.info("#######查找指定的收货地址");
		return addressService.findAddress(userID, addressID);
	}
}
