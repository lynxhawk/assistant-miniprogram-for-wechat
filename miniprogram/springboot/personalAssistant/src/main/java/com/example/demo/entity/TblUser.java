package com.example.demo.entity;

import lombok.Data;

/**
 * <p>
 * 
 * </p>
 *
 * @author cjw
 * @since 2019-07-11
 */
@Data
public class TblUser{

    /**
     *
     */
    private Integer userId;

    private String userName;

    private Integer expCount;

    private Integer incCount;

    private Double invCount;

    private Double invPfcount;

    public void setUserId(int userId){
        this.userId = userId;
    }

    public int getUserId(){
        return this.userId;
    }

    public String getUserName() {
    }
}
