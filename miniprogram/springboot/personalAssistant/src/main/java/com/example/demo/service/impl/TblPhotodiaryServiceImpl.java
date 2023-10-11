package com.example.demo.service.impl;


import com.example.demo.dao.TblIncomeMapper;
import com.example.demo.dao.TblPhotodiaryMapper;
import com.example.demo.entity.TblIncome;
import com.example.demo.entity.TblPhotodiary;
import com.example.demo.service.ITblPhotodiaryService;
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
public class TblPhotodiaryServiceImpl implements ITblPhotodiaryService {

    @Autowired
    private TblPhotodiaryMapper tblPhotodiaryMapper;

    @Override
    public List<TblPhotodiary> getPhotodiaryList(int userId) {

        return tblPhotodiaryMapper.queryPhotodiary(userId);
    }

    @Transactional
    @Override
    public boolean addPhotodiary(TblPhotodiary phd){
        try{
            int effectedNum = tblPhotodiaryMapper.insertPhotodiary(phd);
            if(effectedNum>0){
                return true;
            }else{
                throw new RuntimeException("插入日记信息失败");
            }
        }catch(Exception e){
            throw new RuntimeException("插入日记信息失败:"+e.getMessage());
        }
//    }else {
//        throw new RuntimeException("日记信息不能为空");
//    }
    }

    @Override
    public boolean deletePhotodiary(int phdId){
        if(phdId>0){
            try{
                int effectedNum = tblPhotodiaryMapper.deletePhotodiary(phdId);
                if(effectedNum>0){
                    return true;
                }else {
                    throw new RuntimeException("删除日记失败！");
                }
            }catch (Exception e){
                throw new RuntimeException("删除日记失败:"+e.toString());
            }
        }else {
            throw new RuntimeException("日记id不能为空！");
        }
    }

    @Override
    public boolean modifyPhotodiary(TblPhotodiary phd){
        if(phd.getPhdId()!=null && phd.getPhdId()>0){
            try{
                int effectedNum = tblPhotodiaryMapper.updatePhotodiary(phd);
                if(effectedNum>0){
                    return true;
                }else {
                    throw new RuntimeException("更新日记信息失败！");
                }
            }catch (Exception e){
                throw new RuntimeException("更新日记信息失败:"+e.toString());
            }
        }else {
            throw new RuntimeException("日记信息不能为空！");
        }
    }
}
