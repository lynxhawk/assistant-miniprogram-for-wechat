package com.example.demo.web;

import com.example.demo.entity.TblIncome;
import com.example.demo.entity.TblInvtype;
import com.example.demo.service.ITblInvtypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/invtype")
public class TblInvtypeController {
    @Autowired
    private ITblInvtypeService iTblInvtypeService;

    @RequestMapping(value = "/getInvtypeList", method = RequestMethod.GET)
    private Map<String ,Object> getInvtypeList(Integer userId){
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        List<TblInvtype> list = iTblInvtypeService.getInvtypeList(userId);
        modelMap.put("list",list);
        return modelMap;
    }
}
