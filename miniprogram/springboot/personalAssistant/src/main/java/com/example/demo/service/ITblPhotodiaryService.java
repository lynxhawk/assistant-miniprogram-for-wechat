package com.example.demo.service;

import com.example.demo.entity.TblInvestment;
import com.example.demo.entity.TblPhotodiary;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface ITblPhotodiaryService{
    /*
     *获取日记列表
     * @return
     * */
    List<TblPhotodiary> getPhotodiaryList(int userId);
    /*
     * 添加日记项
     * @param phd
     *@return
     * */
    boolean addPhotodiary(TblPhotodiary phd);
    /*
     *删除日记项
     * @param phdId
     * @return
     * */
    boolean deletePhotodiary(int phdId);
    /*
     *修改日记项
     * @param phd
     * @return
     * */
    boolean modifyPhotodiary(TblPhotodiary phd);
}
