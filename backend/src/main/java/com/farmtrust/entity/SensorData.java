package com.farmtrust.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sensor_data")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SensorData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id")
    private Farm farm;

    private String fieldName;  // 밭 A, 밭 B, 밭 C

    private Double chemicalLevel;  // 화학물질 수치

    @Enumerated(EnumType.STRING)
    private SensorStatus status;

    public enum SensorStatus {
        SAFE, CAUTION, DANGER
    }
}
