package com.farmtrust.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "farms")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private String certification;
    private String ownerName;

    @Enumerated(EnumType.STRING)
    private FarmStatus status;

    public enum FarmStatus {
        PENDING, APPROVED, REJECTED
    }
}
