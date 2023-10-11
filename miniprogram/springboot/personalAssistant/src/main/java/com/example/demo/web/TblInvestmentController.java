package com.example.demo.web;


import com.example.demo.entity.TblInvestment;
import com.example.demo.entity.TblInvtype;
import com.example.demo.entity.TblSchedule;
import com.example.demo.service.ITblInvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
@RequestMapping("/investment")
public class TblInvestmentController{
    @Autowired
    private ITblInvestmentService iTblInvestmentService;

    @RequestMapping(value = "/getInvestmentList", method = RequestMethod.GET)
    private Map<String ,Object> getInvestmentList(Integer userId){
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        List<TblInvestment> list = iTblInvestmentService.getInvestmentList(userId);
        modelMap.put("list",list);
        return modelMap;
    }

    @RequestMapping(value = "/addInvestment", method = RequestMethod.POST)
    private Map<String, Object> addInvestment(@RequestBody TblInvestment inv){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblInvestmentService.addInvestment(inv));
        return modelMap;
    }

    @RequestMapping(value = "/deleteInvestment", method = RequestMethod.GET, consumes = "application/json")
    private Map<String, Object> deleteInvestment(@RequestParam(value = "invId") Integer invId,@RequestParam(value = "userId") Integer userId){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblInvestmentService.deleteInvestment(invId,userId));
        return modelMap;
    }

    @RequestMapping(value = "/updateInvestment", method = RequestMethod.GET)
    private Map<String, Object> updateInvestment(Integer userId){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblInvestmentService.updateInvestment(userId));
        return modelMap;
    }
    @RequestMapping(value = "/getCount", method = RequestMethod.GET)
    private Map<String ,Object> getInvtypeList(Integer userId){
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        List<TblInvtype> list = iTblInvestmentService.queryCount(userId);
        modelMap.put("list",list);
        return modelMap;
    }
}
