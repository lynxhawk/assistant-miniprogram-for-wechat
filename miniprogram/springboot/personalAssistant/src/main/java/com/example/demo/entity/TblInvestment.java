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

public class TblInvestment{

    private Integer invId;

    private String invName;

    private Double invMoney;

    private Double invProfitMoney;

    private Double invRate;

    private Date invStartDate;

    private Date invEndDate;

    private Integer userId;


}
