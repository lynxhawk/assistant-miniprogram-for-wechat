package com.example.demo.dao;

import com.example.demo.entity.TblInvtype;
import com.example.demo.entity.TblPhotodiary;

import java.util.List;

public interface TblInvtypeMapper {
    List<TblInvtype> queryInvtype(int userId);
    int insertInvtype(TblInvtype invt);
    int deletInvtype(int invNameId);
    int updateInvtype(TblInvtype invt);
}
