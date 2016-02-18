package com.yg.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.yg.model.Commodity;

public interface CommodityService {
	public List<Commodity> findAll();

	public int findSum();
	
	public List<Commodity> paginationSearch(Integer m, Integer n);
	
	public JSONObject savePic(MultipartFile picFileMpf);
	
	public int addCommodity(Commodity commodity);
	
	public int deleteCommodity(Integer id);
	
	public int editCommodity(Commodity commodity);
	
	public List<Commodity> searchBySaleSum(Integer m, Integer n);
	
	public List<Commodity> searchByPrice(Integer m, Integer n);
	
	public List<Commodity> searchByPri(Integer m, Integer n);
	
	public int searchSumByBrand(String brand);
	
	public List<Commodity> searchByBrand(Integer m, Integer n, String brand);
	
	public int searchSumBetPrice(double p1, double p2);
	
	public List<Commodity> searchBetPrice(double p1, double p2, Integer m, Integer n);
	
	public Commodity searchCommodity(int id);
	
}
