package com.example.demo.dao;

import com.example.demo.entity.TblExpenses;
import com.example.demo.entity.TblIncome;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface TblIncomeMapper{
    List<TblIncome> queryIncome(int userId);
    TblIncome queryIncomeById(int incId);
    int insertIncome(TblIncome inc);
    int updateIncome(TblIncome inc);
    int deleteIncome(int incId);
}
