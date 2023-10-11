package com.example.demo.web;


import com.example.demo.entity.TblExpenses;
import com.example.demo.service.ITblExpensesService;
import com.example.demo.service.impl.TblExpensesServiceImpl;
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
@RequestMapping("/expenses")
public class TblExpensesController{
    @Autowired
    private ITblExpensesService iTblExpensesService;

    @RequestMapping(value = "/getExpensesList", method = RequestMethod.GET)
    private Map<String ,Object> getExpensesList(Integer userId){
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        List<TblExpenses> list = iTblExpensesService.getExpensesList(userId);
        modelMap.put("list",list);
        return modelMap;
    }

    @RequestMapping(value = "/addExpenses", method = RequestMethod.POST)
    private Map<String, Object> addExpenses(@RequestBody TblExpenses exp){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblExpensesService.addExpenses(exp));
        return modelMap;
    }

    @RequestMapping(value = "/deleteExpenses", method = RequestMethod.GET, consumes = "application/json")
    private Map<String, Object> deleteExpenses(Integer expId){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblExpensesService.deleteExpenses(expId));
        return modelMap;
    }

}
