package com.example.demo.entity;

import lombok.Data;

import java.time.LocalDate;
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
public class TblExpenses {
    private Integer expId;

    private Integer expMoney;

    private String expType;

    private String expName;

    private String expNote;

    private Date expDate;

    private Integer userId;


}
