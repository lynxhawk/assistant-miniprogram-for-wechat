package com.example.demo.dao;


import com.example.demo.entity.TblSchedule;
import com.example.demo.entity.TblUser;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
public interface TblUserMapper{
    TblUser queryUserById(int userId);
    TblUser queryUserByName(String userName);
    int insertUser(TblUser user);
    int updateUser(TblUser user);
    int deleteUser(int userId);

}
