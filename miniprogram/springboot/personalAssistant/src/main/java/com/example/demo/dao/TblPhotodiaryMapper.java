package com.example.demo.dao;

import com.example.demo.entity.TblInvestment;
import com.example.demo.entity.TblPhotodiary;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface TblPhotodiaryMapper{
    List<TblPhotodiary> queryPhotodiary(int userId);
    TblPhotodiary queryPhotodiaryById(int phdId);
    int insertPhotodiary(TblPhotodiary phd);
    int updatePhotodiary(TblPhotodiary phd);
    int deletePhotodiary(int phdId);
}
