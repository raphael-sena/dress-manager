package com.DressManager.dressmanager.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_roles")
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;

    @Getter
    private String name;

    public enum Values {
        ADMIN(1L),
        BASIC(2L);

        long roleId;

        Values(long roleId){
            this.roleId = roleId;
        }

        public long getRoleId(){
            return  roleId;
        }
    }

}
