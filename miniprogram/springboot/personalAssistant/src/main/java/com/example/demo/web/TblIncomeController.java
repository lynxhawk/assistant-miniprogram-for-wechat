package com.example.demo.web;


import com.example.demo.entity.TblExpenses;
import com.example.demo.entity.TblIncome;
import com.example.demo.service.ITblExpensesService;
import com.example.demo.service.ITblIncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
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
@RequestMapping("/income")
public class TblIncomeController{

    @Autowired
    private ITblIncomeService iTblIncomeService;

    @RequestMapping(value = "/getIncomeList", method = RequestMethod.GET)
    private Map<String ,Object> getIncomeList(Integer userId){
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        List<TblIncome> list = iTblIncomeService.getIncomeList(userId);
        modelMap.put("list",list);
        return modelMap;
    }

    @RequestMapping(value = "/addIncome", method = RequestMethod.POST)
    private Map<String, Object> addIncome(@RequestBody TblIncome inc){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblIncomeService.addIncome(inc));
        return modelMap;
    }

    @RequestMapping(value = "/deleteIncome", method = RequestMethod.GET, consumes = "application/json")
    private Map<String, Object> deleteIncome(Integer incId){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblIncomeService.deleteIncome(incId));
        return modelMap;
    }
}
