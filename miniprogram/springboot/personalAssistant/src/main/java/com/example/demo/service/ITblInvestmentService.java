package com.example.demo.service;

import com.example.demo.entity.TblIncome;
import com.example.demo.entity.TblInvestment;
import com.example.demo.entity.TblInvtype;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface ITblInvestmentService{
    /*
     *获取投资列表
     * @return
     * */
    List<TblInvestment> getInvestmentList(int userId);
    /*
     * 添加投资项
     * @param inv
     *@return
     * */
    boolean addInvestment(TblInvestment inv);
    /*
     *删除投资项
     * @param invId
     * @return
     * */
    boolean deleteInvestment(int invId, int userId);
    /*
    * 更新项目总投资数，项目总收益，结束日期
    * @param
    * */
    boolean updateInvestment(int userId);

    /*
     *
     * @param
     * */
    List<TblInvtype> queryCount(int userId);
}
