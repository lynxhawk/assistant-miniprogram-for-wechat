package com.example.demo.dao;

import com.example.demo.entity.TblPhotodiary;
import com.example.demo.entity.TblSchedule;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface TblScheduleMapper{
    List<TblSchedule> querySchedule(int userId);
    TblSchedule queryScheduleById(int scId);
    int insertSchedule(TblSchedule sc);
    int updateSchedule(TblSchedule sc);
    int deleteSchedule(int scId);
}
