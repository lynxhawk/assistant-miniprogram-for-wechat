package com.example.demo.dao;

import com.example.demo.entity.TblIncome;
import com.example.demo.entity.TblInvestment;
import com.example.demo.entity.TblInvtype;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface TblInvestmentMapper {
    List<TblInvestment> queryInvestment(int userId);
    List<TblInvtype> queryInvestmentGroupByName(int userId);
    TblInvestment queryInvestmentById(int invId);
    int insertInvestment(TblInvestment inv);
    int updateInvestment(TblInvestment inv);
    int deleteInvestment(int invId);
}
