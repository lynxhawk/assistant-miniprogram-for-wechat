package com.example.demo.service.impl;

import com.example.demo.dao.TblExpensesMapper;
import com.example.demo.entity.TblExpenses;
import com.example.demo.service.ITblExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
public class TblExpensesServiceImpl implements ITblExpensesService {
    @Autowired
    private TblExpensesMapper tblExpensesMapper;

    @Override
    public List<TblExpenses> getExpensesList(int userId) {
        return tblExpensesMapper.queryExpenses(userId);
    }

    @Transactional
    @Override
    public boolean addExpenses(TblExpenses exp){
        try{
//            DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
//            Date date = format1.parse(exp.getExpDate());

            int effectedNum = tblExpensesMapper.insertExpenses(exp);
            if(effectedNum>0){
                return true;
            }else{
                throw new RuntimeException("插入支出信息失败");
            }
        }catch(Exception e){
            throw new RuntimeException("插入支出信息失败:"+e.getMessage());
        }
//    }else {
//        throw new RuntimeException("产品信息不能为空");
//    }
    }

    @Override
    public boolean deleteExpenses(int expId){
        if(expId>0){
            try{
                int effectedNum = tblExpensesMapper.deleteExpenses(expId);
                if(effectedNum>0){
                    return true;
                }else {
                    throw new RuntimeException("删除支出失败！");
                }
            }catch (Exception e){
                throw new RuntimeException("删除支出失败:"+e.toString());
            }
        }else {
            throw new RuntimeException("支出id不能为空！");
        }
    }
}


