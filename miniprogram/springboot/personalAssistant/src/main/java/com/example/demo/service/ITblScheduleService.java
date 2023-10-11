package com.example.demo.service;

import com.example.demo.entity.TblPhotodiary;
import com.example.demo.entity.TblSchedule;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface ITblScheduleService{
    /*
     * 根据日期获取当日计划
     *
     * @return
     * */
    List<TblSchedule> getTodayScheduleList(int userId,String date) throws ParseException;
    /*
     * 添加计划项
     * @param sc
     *@return
     * */
    boolean addSchedule(TblSchedule sc);
    /*
     *删除计划项
     * @param scId
     * @return
     * */
    boolean deleteSchedule(int scId);
    /*
     *修改计划项
     * @param sc
     * @return
     * */
    boolean modifySchedule(TblSchedule sc);
    /*
    * 返回提醒列表
    * @param userId
    * */
    List<TblSchedule> getRemindScheduleList(int userId);
}
