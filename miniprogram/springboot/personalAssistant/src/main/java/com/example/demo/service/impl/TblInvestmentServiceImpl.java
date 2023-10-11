package com.example.demo.service.impl;

import com.example.demo.dao.TblInvestmentMapper;
import com.example.demo.dao.TblInvtypeMapper;
import com.example.demo.entity.TblInvestment;
import com.example.demo.entity.TblInvtype;
import com.example.demo.service.ITblInvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
public class TblInvestmentServiceImpl implements ITblInvestmentService {

    @Autowired
    private TblInvestmentMapper tblInvestmentMapper;
    @Autowired
    private TblInvtypeMapper tblInvtypeMapper;

    @Override
    public List<TblInvestment> getInvestmentList(int userId) {
        return tblInvestmentMapper.queryInvestment(userId);
    }

    @Transactional
    @Override
    public boolean addInvestment(TblInvestment inv) {
        try{
            int effectedNum = tblInvestmentMapper.insertInvestment(inv);
            if(effectedNum>0){
                return true;
            }else{
                throw new RuntimeException("插入投资信息失败");
            }
            
        }catch(Exception e){
            throw new RuntimeException("插入投资信息失败:"+e.getMessage());
        }
    }

    @Override
    public boolean deleteInvestment(int invId, int userId) {
        if(invId>0){
            try{
                int effectedNum = tblInvestmentMapper.deleteInvestment(invId);
                if(effectedNum>0){
                    return true;
                }else {
                    throw new RuntimeException("删除投资失败！");
                }
            }catch (Exception e){
                throw new RuntimeException("删除投资失败:"+e.toString());
            }
        }else {
            throw new RuntimeException("投资id不能为空！");
        }
    }
    @Transactional
    @Override
    public boolean updateInvestment(int userId) {
        List<TblInvestment> inv = tblInvestmentMapper.queryInvestment(userId);
        Date date = new Date();
        for (TblInvestment in : inv) {
            Calendar calst = Calendar.getInstance();
            Calendar caled = Calendar.getInstance();
            if(date.after(in.getInvStartDate()) && in.getInvEndDate() == null){
                calst.setTime(in.getInvStartDate());
                caled.setTime(date);
                calst.set(Calendar.HOUR_OF_DAY, 0);
                calst.set(Calendar.MINUTE, 0);
                calst.set(Calendar.SECOND, 0);
                caled.set(Calendar.HOUR_OF_DAY, 0);
                caled.set(Calendar.MINUTE, 0);
                caled.set(Calendar.SECOND, 0);
                //得到两个日期相差的天数
                int days = ((int)(caled.getTime().getTime()/1000)-(int)(calst.getTime().getTime()/1000))/3600/24;

                in.setInvProfitMoney(in.getInvMoney()*Math.pow((1+in.getInvRate()), days) - in.getInvMoney());
                int a = tblInvestmentMapper.updateInvestment(in);
                if(a==0)return false;
            } else if(in.getInvEndDate() != null){
                calst.setTime(in.getInvStartDate());
                caled.setTime(in.getInvEndDate());
                calst.set(Calendar.HOUR_OF_DAY, 0);
                calst.set(Calendar.MINUTE, 0);
                calst.set(Calendar.SECOND, 0);
                caled.set(Calendar.HOUR_OF_DAY, 0);
                caled.set(Calendar.MINUTE, 0);
                caled.set(Calendar.SECOND, 0);
                int days = ((int)(caled.getTime().getTime()/1000)-(int)(calst.getTime().getTime()/1000))/3600/24;
                in.setInvProfitMoney(in.getInvMoney()*Math.pow((1+in.getInvRate()), days) - in.getInvMoney());
                int b = tblInvestmentMapper.updateInvestment(in);
                if(b==0)return false;
            }
        }
        return true;
    }

    @Override
    public List<TblInvtype> queryCount(int userId) {
        List<TblInvtype> invtypes = tblInvestmentMapper.queryInvestmentGroupByName(userId);
        return invtypes;
    }


}
