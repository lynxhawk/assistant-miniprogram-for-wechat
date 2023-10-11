package com.example.demo.service.impl;

import com.example.demo.dao.TblExpensesMapper;
import com.example.demo.dao.TblIncomeMapper;
import com.example.demo.dao.TblInvtypeMapper;
import com.example.demo.dao.TblUserMapper;
import com.example.demo.entity.TblExpenses;
import com.example.demo.entity.TblIncome;
import com.example.demo.entity.TblInvtype;
import com.example.demo.entity.TblUser;
import com.example.demo.service.ITblUserService;
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
public class TblUserServiceImpl implements ITblUserService {

    @Autowired
    private TblUserMapper tblUserMapper;
    @Autowired
    private TblIncomeMapper tblIncomeMapper;
    @Autowired
    private TblExpensesMapper tblExpensesMapper;
    @Autowired
    private TblInvtypeMapper tblInvtypeMapper;

    @Transactional
    @Override
    public int addUser(TblUser user) {
        TblUser user1 = tblUserMapper.queryUserByName(user.getUserName());
        if(user1==null){
            try{
                int effectedNum = tblUserMapper.insertUser(user);

                if(effectedNum>0){
                    TblUser u = tblUserMapper.queryUserByName(user.getUserName());
                    return u.getUserId();
                }else{
                    throw new RuntimeException("插入用户信息失败");
                }
            }catch(Exception e){
                throw new RuntimeException("插入用户信息失败:"+e.getMessage());
            }
        }

        return user1.getUserId();
    }

    @Transactional
    @Override
    public int sumIncome(int userId) {
        List<TblIncome> inc = tblIncomeMapper.queryIncome(userId);
        int count = 0;
        if(inc.size()!=0){
            for (TblIncome in: inc) {
                count += in.getIncMoney();
            }
        }


        return count;
    }

    @Transactional
    @Override
    public int sumExcepses(int userId) {
        int count = 0;
        List<TblExpenses> tblExpenses = tblExpensesMapper.queryExpenses(userId);
        if(tblExpenses.size()!=0){
            for(TblExpenses ex: tblExpenses){
                count += ex.getExpMoney();
            }
        }


        return count;
    }

    @Transactional
    @Override
    public int sumInv(int userId) {
        int count = 0;
        List<TblInvtype> invtypes = tblInvtypeMapper.queryInvtype(userId);
        if(invtypes.size()!=0){
            for(TblInvtype it: invtypes){
                count += it.getInvMoneyCount();
            }
        }
        return count;
    }

    @Transactional
    @Override
    public int sumInvPf(int userId) {
        int count = 0;
        List<TblInvtype> invtypes = tblInvtypeMapper.queryInvtype(userId);
        if(invtypes.size()!=0){
            for(TblInvtype it: invtypes){
                count += it.getInvPfmoneyCount();
            }
        }
        return count;
    }
}
