package com.example.demo.service.impl;

import com.example.demo.dao.TblScheduleMapper;
import com.example.demo.entity.TblSchedule;
import com.example.demo.service.ITblScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.crypto.Data;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
@Service
public class TblScheduleServiceImpl implements ITblScheduleService {
    @Autowired
    private TblScheduleMapper tblScheduleMapper;

    @Transactional
    @Override
    public List<TblSchedule> getTodayScheduleList(int userId,String d) throws ParseException {

        List<TblSchedule> lsc = new ArrayList<>();
        lsc = tblScheduleMapper.querySchedule(userId);
        List<TblSchedule> newLsc = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Calendar date = Calendar.getInstance();
        Calendar begin = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        for (TblSchedule sc : lsc) {
            Date scStartDate = sc.getScStartDate();
            Date scEndDate = sc.getScEndDate();

            System.out.println(scStartDate);
            System.out.println(scEndDate);

            date.setTime(sdf.parse(d));
            begin.setTime(scStartDate);
            end.setTime(scEndDate);

            if (date.after(begin) && date.before(end)) {
                newLsc.add(sc);
            } else if (sdf.parse(d).compareTo(scStartDate) == 0 || sdf.parse(d).compareTo(scEndDate) == 0) {
                newLsc.add(sc);
            }
        }
        return newLsc;
    }

    @Transactional
    @Override
    public List<TblSchedule> getRemindScheduleList(int userId){
        List<TblSchedule> lsc = new ArrayList<>();
        lsc = tblScheduleMapper.querySchedule(userId);
        List<TblSchedule> newLsc = new ArrayList<>();

        for (TblSchedule sc : lsc) {
            Date scStartDate = sc.getScStartDate();
            Date scEndDate = sc.getScEndDate();

            Calendar date = Calendar.getInstance();
            Date d = new Date();
            date.setTime(d);

            Calendar begin = Calendar.getInstance();
            begin.setTime(scStartDate);

            Calendar end = Calendar.getInstance();
            end.setTime(scEndDate);

            if (date.after(begin) && date.before(end)) {
                newLsc.add(sc);
            } else if (d.compareTo(scStartDate) == 0 || d.compareTo(scEndDate) == 0) {
                newLsc.add(sc);
            }
        }
        return newLsc;
    }

    @Transactional
    @Override
    public boolean addSchedule(TblSchedule sc){
        try{
            Date sstartd = sc.getScStartDate();
            String srtype = sc.getScRepeatType();
            int srtimes = sc.getScRepeatTimes();
            int days;
            Calendar cal = Calendar.getInstance();
            System.out.println(srtype);
            if(srtype.equals("每天重复")){
                days=srtimes-1;
                cal.setTime(sstartd);
                cal.add(Calendar.DATE, days);
                Date scenddate=cal.getTime();
                sc.setScEndDate(scenddate);

            }else if(srtype.equals("每周重复")){
                days=(srtimes-1)*7;
                cal.setTime(sstartd);
                cal.add(Calendar.DATE, days);
                Date scenddate=cal.getTime();
                sc.setScEndDate(scenddate);

            }else if(srtype.equals("每月重复")){
                cal.setTime(sstartd);
                cal.add(Calendar.MONTH, srtimes-1);
                Date scenddate=cal.getTime();
                System.out.println(scenddate);
                sc.setScEndDate(scenddate);
            }
            int effectedNum = tblScheduleMapper.insertSchedule(sc);
            if(effectedNum>0){
                return true;
            }else{
                throw new RuntimeException("插入日程信息失败");
            }
        }catch(Exception e){
            throw new RuntimeException("插入日程信息失败:"+e.getMessage());
        }
    }

    @Override
    public boolean deleteSchedule(int scId){
        if(scId>0){
            try{
                int effectedNum = tblScheduleMapper.deleteSchedule(scId);
                if(effectedNum>0){
                    return true;
                }else {
                    throw new RuntimeException("删除日程失败！");
                }
            }catch (Exception e){
                throw new RuntimeException("删除日程失败:"+e.toString());
            }
        }else {
            throw new RuntimeException("日程id不能为空！");
        }

    }

    @Override
    public boolean modifySchedule(TblSchedule sc){
        if(sc.getScId()!=null && sc.getScId()>0){
            try{
                int effectedNum = tblScheduleMapper.updateSchedule(sc);
                if(effectedNum>0){
                    return true;
                }else {
                    throw new RuntimeException("更新产品信息失败！");
                }
            }catch (Exception e){
                throw new RuntimeException("更新产品信息失败:"+e.toString());
            }
        }else {
            throw new RuntimeException("产品信息不能为空！");
        }

    }


}
