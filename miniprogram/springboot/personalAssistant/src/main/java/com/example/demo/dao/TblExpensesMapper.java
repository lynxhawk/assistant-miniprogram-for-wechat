package com.example.demo.dao;


import com.example.demo.entity.TblExpenses;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface TblExpensesMapper{
    List<TblExpenses> queryExpenses(int userId);
    TblExpenses queryExpensesById(int expId);
    int insertExpenses(TblExpenses exp);
    int updateExpenses(TblExpenses exp);
    int deleteExpenses(int expId);
}
