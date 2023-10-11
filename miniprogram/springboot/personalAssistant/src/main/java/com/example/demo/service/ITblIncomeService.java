package com.example.demo.service;

import com.example.demo.entity.TblExpenses;
import com.example.demo.entity.TblIncome;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface ITblIncomeService{
    /*
     *获取收入列表
     * @return
     * */
    List<TblIncome> getIncomeList(int userId);
    /*
     * 添加收入项
     * @param inc
     *@return
     * */
    boolean addIncome(TblIncome inc);
    /*
     *删除收入项
     * @param incId
     * @return
     * */
    boolean deleteIncome(int incId);
}
