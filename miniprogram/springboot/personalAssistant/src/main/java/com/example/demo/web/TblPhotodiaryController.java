package com.example.demo.web;


import com.example.demo.entity.TblExpenses;
import com.example.demo.entity.TblPhotodiary;
import com.example.demo.service.ITblExpensesService;
import com.example.demo.service.ITblPhotodiaryService;
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
@RequestMapping("/photodiary")
public class TblPhotodiaryController{
    @Autowired
    private ITblPhotodiaryService iTblPhotodiaryService;

    @RequestMapping(value = "/getPhotodiaryList", method = RequestMethod.GET)
    private Map<String ,Object> getPhotodiaryList(Integer userId){
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        List<TblPhotodiary> list = iTblPhotodiaryService.getPhotodiaryList(userId);
        modelMap.put("list",list);
        return modelMap;
    }

    @RequestMapping(value = "/addPhotodiary", method = RequestMethod.POST)
    private Map<String, Object> addPhotodiary(@RequestBody TblPhotodiary phd){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblPhotodiaryService.addPhotodiary(phd));
        return modelMap;
    }

    @RequestMapping(value = "/deletePhotodiary", method = RequestMethod.GET, consumes = "application/json")
    private Map<String, Object> deletePhotodiary(Integer phdId){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblPhotodiaryService.deletePhotodiary(phdId));
        return modelMap;
    }

    @RequestMapping(value = "/modifyPhotodiary", method = RequestMethod.POST)
    private Map<String, Object> modifyPhotodiary(@RequestBody TblPhotodiary phd){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblPhotodiaryService.modifyPhotodiary(phd));
        return modelMap;
    }

}
