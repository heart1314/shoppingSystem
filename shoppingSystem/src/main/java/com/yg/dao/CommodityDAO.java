package com.yg.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.yg.model.Commodity;

public interface CommodityDAO {
	public List<Commodity> findAll();
	
	public int findSum();
	
	public List<Commodity> paginationSearch(@Param(value="m")Integer m,@Param(value="n")Integer n);
	
	public int addCommodity(Commodity commodity);
	
	public int deleteCommodity(Integer id);
	
	public int editCommodity(Commodity commodity);
	
	public List<Commodity> searchBySaleSum(@Param(value="m")Integer m,@Param(value="n")Integer n);
	
	public List<Commodity> searchByPrice(@Param(value="m")Integer m,@Param(value="n")Integer n); 
	
	public List<Commodity> searchByPri(@Param(value="m")Integer m,@Param(value="n")Integer n); 
	
	public int searchSumByBrand(String brand);
	
	public List<Commodity> searchByBrand(@Param(value="m")Integer m,@Param(value="n")Integer n,@Param(value="brand")String brand);

	public int searchSumBetPrice(@Param(value="p1")double p1,@Param(value="p2")double p2);
	
	public List<Commodity> searchBetPrice(@Param(value="p1")double p1,@Param(value="p2")double p2, 
			@Param(value="m")Integer m,@Param(value="n")Integer n);
	
	public Commodity searchCommodity(int id);
}
