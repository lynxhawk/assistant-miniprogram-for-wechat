package com.example.demo.service;

import com.example.demo.entity.TblSchedule;
import com.example.demo.entity.TblUser;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface ITblUserService{

    /*
     * 添加用户
     * @param sc
     *@return
     * */
    int addUser(TblUser user);
    int sumIncome(int userId);
    int sumExcepses(int userId);
    int sumInv(int userId);
    int sumInvPf(int userId);
}
