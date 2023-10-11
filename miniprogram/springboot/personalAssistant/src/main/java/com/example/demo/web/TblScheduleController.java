package com.example.demo.web;


import com.example.demo.entity.TblPhotodiary;
import com.example.demo.entity.TblSchedule;
import com.example.demo.entity.TblUser;
import com.example.demo.service.ITblPhotodiaryService;
import com.example.demo.service.ITblScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
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
@RequestMapping("/schedule")
public class TblScheduleController{
    @Autowired
    private ITblScheduleService iTblScheduleService;

    @RequestMapping(value = "/getTodayScheduleList", method = RequestMethod.GET)
    private Map<String ,Object> getTodayScheduleList(@RequestParam(value = "userId") Integer userId,@RequestParam(value = "date") String date) throws ParseException {
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        List<TblSchedule> list = iTblScheduleService.getTodayScheduleList(userId,date);
        modelMap.put("list",list);
        return modelMap;
    }

    @RequestMapping(value = "/addSchedule", method = RequestMethod.POST)
    private Map<String, Object> addSchedule(@RequestBody TblSchedule sc){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblScheduleService.addSchedule(sc));
        return modelMap;
    }

    @RequestMapping(value = "/deleteSchedule", method = RequestMethod.GET, consumes = "application/json")
    private Map<String, Object> deleteSchedule(Integer scId){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblScheduleService.deleteSchedule(scId));
        return modelMap;
    }

    @RequestMapping(value = "/modifySchedule", method = RequestMethod.POST)
    private Map<String, Object> modifySchedule(@RequestBody TblSchedule sc){
        Map<String, Object> modelMap = new HashMap<String, Object>();
        modelMap.put("success", iTblScheduleService.modifySchedule(sc));
        return modelMap;
    }

    @RequestMapping(value = "/getRemindScheduleList", method = RequestMethod.GET)
    private Map<String ,Object> getRemindScheduleList(Integer userId){
        Map<String ,Object> modelMap = new HashMap<String, Object>();
        List<TblSchedule> list = iTblScheduleService.getRemindScheduleList(userId);
        modelMap.put("list",list);
        return modelMap;
    }

}
