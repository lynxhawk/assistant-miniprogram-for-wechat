package com.example.demo.web;


import com.example.demo.entity.TblIncome;
import com.example.demo.entity.TblUser;
import com.example.demo.service.ITblExpensesService;
import com.example.demo.service.ITblIncomeService;
import com.example.demo.service.ITblInvtypeService;
import com.example.demo.service.ITblUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
@RestController
@RequestMapping("/user")
public class TblUserController{

    @Autowired
    private ITblUserService iTblUserService;

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    private Map<String, Object> addUser(@RequestBody TblUser user){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        Integer userId = iTblUserService.addUser(user);
        modelMap.put("userId",userId);
        return modelMap;
    }

    @RequestMapping(value = "/sumExcepses", method = RequestMethod.GET)
    private Map<String ,Object> sumExcepses(Integer userId){
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        Integer sumExcepses = iTblUserService.sumExcepses(userId);
        modelMap.put("sumExcepses", sumExcepses);
        return modelMap;
    }

    @RequestMapping(value = "/sumInv", method = RequestMethod.GET)
    private Map<String ,Object> sumInv(Integer userId){
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        Integer sumInv = iTblUserService.sumInv(userId);
        modelMap.put("sumInv", sumInv);
        return modelMap;
    }
    @RequestMapping(value = "/sumInvPf", method = RequestMethod.GET)
    private Map<String ,Object> sumInvPf(Integer userId){
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        Integer sumInvPf = iTblUserService.sumInvPf(userId);
        modelMap.put("sumInvPf", sumInvPf);
        return modelMap;
    }
    @RequestMapping(value = "/sumIncome", method = RequestMethod.GET)
    private Map<String ,Object> sumIncome(Integer userId){
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        Integer sumIncome = iTblUserService.sumIncome(userId);
        modelMap.put("sumIncome", sumIncome);
        return modelMap;
    }
}
