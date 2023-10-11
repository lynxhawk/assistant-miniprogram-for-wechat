package com.example.demo.service;

import com.example.demo.entity.TblExpenses;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface ITblExpensesService{
    /*
    *获取支出列表
    * @return
    * */
    List<TblExpenses> getExpensesList(int userId);
    /*
    * 添加支出项
    * @param exp
    *@return
    * */
    boolean addExpenses(TblExpenses exp);
    /*
    *删除支出项
    * @param expId
    * @return
    * */
    boolean deleteExpenses(int expId);
}
