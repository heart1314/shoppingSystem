package com.yg.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.yg.model.Commodity;
import com.yg.service.CommodityService;

@Controller
@RequestMapping("/commodity")
public class CommodityController {
	
	protected final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private CommodityService commodityService;

	@RequestMapping("/findAll")
	@ResponseBody
	public List<Commodity> findAll() {
		return commodityService.findAll();
	}

	@RequestMapping("/findSum")
	@ResponseBody
	public int findSum() {
		return commodityService.findSum();
	}

	@RequestMapping("/paginationSearch")
	@ResponseBody
	public List<Commodity> paginationSearch(@RequestParam(value = "m") String index,
			@RequestParam(value = "n") String pageSize) {
		Integer m = Integer.parseInt(index);
		Integer n = Integer.parseInt(pageSize);
		return commodityService.paginationSearch(m, n);
	}

	@RequestMapping("/savePic")
	@ResponseBody
	public JSONObject savePic(@RequestParam("picture") MultipartFile picFileMpf) {
		return commodityService.savePic(picFileMpf);
	}
	
	@RequestMapping("/saveShow")
	@ResponseBody
	public JSONObject saveShow(@RequestParam("show") MultipartFile show) {
		return commodityService.savePic(show);
	}
	
	@RequestMapping("/addCommodity")
	@ResponseBody
	public boolean addCommodity(@RequestParam(value = "name") String name, @RequestParam(value = "norms") String norms,
			@RequestParam(value = "price") String price, @RequestParam(value = "state") String state, 
			@RequestParam(value = "type") String type, @RequestParam(value = "tip") String tip,
			@RequestParam(value = "des") String des, @RequestParam(value = "brand") String brand, 
			@RequestParam(value = "listingDate") String listingDate, @RequestParam(value = "note") String note,
			@RequestParam(value = "picture") String picture, @RequestParam(value = "casePic") String casePic, 
			@RequestParam(value = "sum") String sum, @RequestParam(value = "saleSum") String saleSum) throws ParseException{
		double p = Double.parseDouble(price);
		Integer s1 = Integer.parseInt(sum);
		Integer s2 = Integer.parseInt(saleSum);
		Commodity commodity = new Commodity();
		if(listingDate != null){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
			Date date = sdf.parse(listingDate);
			commodity.setDate(date);
		}else{
			commodity.setDate(null);
		}
		commodity.setBrand(brand);
		commodity.setDes(des);
		commodity.setName(name);
		commodity.setNorms(norms);
		commodity.setNote(note);
		commodity.setPicture(picture);
		commodity.setPrice(p);
		commodity.setSaleSum(s2);
		commodity.setCasePic(casePic);
		commodity.setState(state);
		commodity.setSum(s1);
		commodity.setTip(tip);
		commodity.setType(type);
		System.out.println(commodity);
		return commodityService.addCommodity(commodity) > 0;
	}
	
	@RequestMapping("/deleteCommodity")
	@ResponseBody
	public boolean deleteCommodity(@RequestParam(value = "id") String id){
		Integer c_id = Integer.parseInt(id);
		return commodityService.deleteCommodity(c_id) > 0 ;
	}
	
	@RequestMapping("/editCommodity")
	@ResponseBody
	public boolean editCommodity(@RequestParam(value = "name") String name, @RequestParam(value = "norms") String norms,
			@RequestParam(value = "price") String price, @RequestParam(value = "state") String state, 
			@RequestParam(value = "type") String type, @RequestParam(value = "tip") String tip,
			@RequestParam(value = "des") String des, @RequestParam(value = "brand") String brand, 
			@RequestParam(value = "listingDate") String listingDate, @RequestParam(value = "note") String note,
			@RequestParam(value = "picture") String picture, @RequestParam(value = "casePic") String casePic, 
			@RequestParam(value = "sum") String sum, @RequestParam(value = "saleSum") String saleSum,
			@RequestParam(value = "id") String id) throws ParseException{
		Integer c_id = Integer.parseInt(id);
		double p = Double.parseDouble(price);
		Integer s1 = Integer.parseInt(sum);
		Integer s2 = Integer.parseInt(saleSum);
		Commodity commodity = new Commodity();
		if(listingDate != null){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
			Date date = sdf.parse(listingDate);
			commodity.setDate(date);
		}else{
			commodity.setDate(null);
		}
		commodity.setBrand(brand);
		commodity.setDes(des);
		commodity.setName(name);
		commodity.setNorms(norms);
		commodity.setNote(note);
		commodity.setPicture(picture);
		commodity.setPrice(p);
		commodity.setSaleSum(s2);
		commodity.setCasePic(casePic);
		commodity.setState(state);
		commodity.setSum(s1);
		commodity.setTip(tip);
		commodity.setType(type);
		commodity.setId(c_id);
		return commodityService.editCommodity(commodity) > 0;
	}
	
	@RequestMapping("/searchBySaleSum")
	@ResponseBody
	public List<Commodity> searchBySaleSum(@RequestParam(value = "m") String index,
			@RequestParam(value = "n") String pageSize){
		Integer m = Integer.parseInt(index);
		Integer n = Integer.parseInt(pageSize);
		return commodityService.searchBySaleSum(m, n);
	}
	
	@RequestMapping("/searchByPrice")
	@ResponseBody
	public List<Commodity> searchByPrice(@RequestParam(value = "m") String index,
			@RequestParam(value = "n") String pageSize){
		Integer m = Integer.parseInt(index);
		Integer n = Integer.parseInt(pageSize);
		return commodityService.searchByPrice(m, n);
	}
	
	@RequestMapping("/searchByPri")
	@ResponseBody
	public List<Commodity> searchByPri(@RequestParam(value = "m") String index,
			@RequestParam(value = "n") String pageSize){
		Integer m = Integer.parseInt(index);
		Integer n = Integer.parseInt(pageSize);
		return commodityService.searchByPri(m, n);
	}
	
	@RequestMapping("/searchSumByBrand")
	@ResponseBody
	public int searchSumByBrand(@RequestParam(value = "brand") String brand){
		return commodityService.searchSumByBrand(brand);
	}
	
	@RequestMapping("/searchByBrand")
	@ResponseBody
	public List<Commodity> searchByBrand(@RequestParam(value = "m") String index,
			@RequestParam(value = "n") String pageSize,@RequestParam(value = "brand") String brand){
		Integer m = Integer.parseInt(index);
		Integer n = Integer.parseInt(pageSize);
		return commodityService.searchByBrand(m, n, brand);
	}
	
	@RequestMapping("/searchSumBetPrice")
	@ResponseBody
	public int searchSumBetPrice(@RequestParam(value = "startPrice") String startPrice,
			@RequestParam(value = "endPrice") String endPrice){
		double p1 = Double.parseDouble(startPrice);
		double p2 = Double.parseDouble(endPrice);
		return commodityService.searchSumBetPrice(p1, p2);
	}
	
	@RequestMapping("/searchBetPrice")
	@ResponseBody
	public List<Commodity> searchBetPrice(@RequestParam(value = "startPrice") String startPrice,
			@RequestParam(value = "endPrice") String endPrice,@RequestParam(value = "m") String index,
			@RequestParam(value = "n") String pageSize){
		double p1 = Double.parseDouble(startPrice);
		double p2 = Double.parseDouble(endPrice);
		Integer m = Integer.parseInt(index);
		Integer n = Integer.parseInt(pageSize);
		return commodityService.searchBetPrice(p1, p2, m ,n);
	}
	
	@RequestMapping("/findCommodityList")
	@ResponseBody
	public List<Commodity> findCommodityList(String cards){
		List<Commodity> lists = new ArrayList<Commodity>();
		String[] commodityIDs = cards.split(",");
		for (int i = 0; i < commodityIDs.length; i++) {
			Commodity commodity = commodityService.searchCommodity(Integer.parseInt(commodityIDs[i]));
			lists.add(commodity);
		}
		return lists;
	}
	
}
