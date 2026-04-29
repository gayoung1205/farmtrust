package com.farmtrust.dto;

import com.farmtrust.entity.SensorData;
import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class SensorDto {
    private Long id;
    private String fieldName;
    private Double chemicalLevel;
    private String status;
    private Long farmId;

    public static SensorDto from(SensorData s) {
        return SensorDto.builder()
                .id(s.getId())
                .fieldName(s.getFieldName())
                .chemicalLevel(s.getChemicalLevel())
                .status(s.getStatus().name())
                .farmId(s.getFarm().getId())
                .build();
    }
}
