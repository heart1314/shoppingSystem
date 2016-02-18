package com.yg.service.impl;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.yg.dao.CommodityDAO;
import com.yg.model.Commodity;
import com.yg.service.CommodityService;

@Service
public class CommodityServiceImpl implements CommodityService {
	
	@Autowired
	private CommodityDAO commodityDAO;
	
	 @Value("#{config['image-location']}")
	 private String fileUploadDirectory;

	public List<Commodity> findAll() {
		return commodityDAO.findAll();
	}

	public int findSum() {
		return commodityDAO.findSum();
	}

	public List<Commodity> paginationSearch(Integer m, Integer n) {
		return commodityDAO.paginationSearch(m, n);
	}
	
	//将图片存到指定目录下
	public JSONObject savePic(MultipartFile picFileMpf) {
		JSONObject jobj = new JSONObject();
		String storageDirectory = fileUploadDirectory;
		File imagesDirectory = new File(storageDirectory);
		try {
			if (!imagesDirectory.exists()) {
				imagesDirectory.mkdirs();
			}
			File newFile = new File(storageDirectory + "/" + picFileMpf.getOriginalFilename());
			picFileMpf.transferTo(newFile);
			jobj.put("fileName", picFileMpf.getOriginalFilename());
			jobj.put("status", "success");
		} catch (IOException e) {
			jobj.put("status", "error");
			jobj.put("errMsg", e.getMessage());
			e.printStackTrace();
		}
		return jobj;
	}

	public int addCommodity(Commodity commodity) {
		return commodityDAO.addCommodity(commodity);
	}

	public int deleteCommodity(Integer id) {
		return commodityDAO.deleteCommodity(id);
	}

	public int editCommodity(Commodity commodity) {
		return commodityDAO.editCommodity(commodity);
	}

	public List<Commodity> searchBySaleSum(Integer m, Integer n) {
		return commodityDAO.searchBySaleSum(m, n);
	}

	public List<Commodity> searchByPrice(Integer m, Integer n) {
		return commodityDAO.searchByPrice(m, n);
	}
	
	public List<Commodity> searchByPri(Integer m, Integer n) {
		return commodityDAO.searchByPri(m, n);
	}

	public int searchSumByBrand(String brand) {
		return commodityDAO.searchSumByBrand(brand);
	}

	public List<Commodity> searchByBrand(Integer m, Integer n, String brand) {
		return commodityDAO.searchByBrand(m, n, brand);
	}

	public int searchSumBetPrice(double p1, double p2) {
		return commodityDAO.searchSumBetPrice(p1, p2);
	}

	public List<Commodity> searchBetPrice(double p1, double p2, Integer m, Integer n) {
		return commodityDAO.searchBetPrice(p1, p2, m, n);
	}

	public Commodity searchCommodity(int id) {
		return commodityDAO.searchCommodity(id);
	}
}
