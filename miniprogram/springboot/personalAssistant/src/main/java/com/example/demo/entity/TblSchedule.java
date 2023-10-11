package com.example.demo.entity;

import lombok.Data;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

/**
 * <p>
 * 
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
@Data
public class TblSchedule{

    private Integer scId;

    private String scName;

    private Time scStartTime;

    private Time scEndTime;

    private Date scStartDate;

    private Date scEndDate;

    private String scRepeatType;

    private Integer scRepeatTimes;

    private Integer userId;

    private String scRemindDays;

}
