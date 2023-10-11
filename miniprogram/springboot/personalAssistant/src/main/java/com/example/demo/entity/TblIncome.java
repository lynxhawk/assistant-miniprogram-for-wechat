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
public class TblIncome {

    private Integer incId;

    private Integer incMoney;

    private String incType;

    private String incName;

    private String incNote;

    private Date incDate;

    private Integer userId;


}
