package com.example.demo.service;

import com.example.demo.entity.TblInvestment;
import com.example.demo.entity.TblInvtype;

import java.util.List;

public interface ITblInvtypeService {
    List<TblInvtype> getInvtypeList(int userId);
}
