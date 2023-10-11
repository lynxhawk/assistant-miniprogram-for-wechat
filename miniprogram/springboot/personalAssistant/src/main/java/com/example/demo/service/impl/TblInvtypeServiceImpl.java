package com.example.demo.service.impl;

import com.example.demo.dao.TblInvtypeMapper;
import com.example.demo.entity.TblInvtype;
import com.example.demo.service.ITblInvtypeService;
import com.example.demo.service.ITblPhotodiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TblInvtypeServiceImpl implements ITblInvtypeService {
    @Autowired
    private TblInvtypeMapper tblInvtypeMapper;

    @Override
    public List<TblInvtype> getInvtypeList(int userId) {
        return tblInvtypeMapper.queryInvtype(userId);
    }
}
