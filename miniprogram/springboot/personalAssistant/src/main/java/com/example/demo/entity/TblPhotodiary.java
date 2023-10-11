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
public class TblPhotodiary{

    private Integer phdId;

    private String phdDiary;

    private String phdPhoto;

    private String phdPosition;

    private Date phdDate;

    private Integer userId;


}
