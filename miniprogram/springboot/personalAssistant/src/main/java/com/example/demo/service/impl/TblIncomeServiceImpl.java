package com.example.demo.service.impl;

import com.example.demo.dao.TblExpensesMapper;
import com.example.demo.dao.TblIncomeMapper;
import com.example.demo.entity.TblExpenses;
import com.example.demo.entity.TblIncome;
import com.example.demo.service.ITblExpensesService;
import com.example.demo.service.ITblIncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
public class TblIncomeServiceImpl implements ITblIncomeService {

        @Autowired
        private TblIncomeMapper tblIncomeMapper;

        @Override
        public List<TblIncome> getIncomeList(int userId) {
            return tblIncomeMapper.queryIncome(userId);
        }

        @Transactional
        @Override
        public boolean addIncome(TblIncome inc){
            try{
                int effectedNum = tblIncomeMapper.insertIncome(inc);
                if(effectedNum>0){
                    return true;
                }else{
                    throw new RuntimeException("插入收入信息失败");
                }
            }catch(Exception e){
                throw new RuntimeException("插入收入信息失败:"+e.getMessage());
            }
//    }else {
//        throw new RuntimeException("收入信息不能为空");
//    }
        }

        @Override
        public boolean deleteIncome(int incId){
            if(incId>0){
                try{
                    int effectedNum = tblIncomeMapper.deleteIncome(incId);
                    if(effectedNum>0){
                        return true;
                    }else {
                        throw new RuntimeException("删除收入失败！");
                    }
                }catch (Exception e){
                    throw new RuntimeException("删除收入失败:"+e.toString());
                }
            }else {
                throw new RuntimeException("收入id不能为空！");
            }
        }
    }

