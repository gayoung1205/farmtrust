package com.farmtrust.dto;

import com.farmtrust.entity.Farm;
import com.farmtrust.entity.SensorData;
import lombok.*;
import java.util.List;

public class FarmDto {

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class Response {
        private Long id;
        private String name;
        private String location;
        private String certification;
        private String ownerName;
        private String status;
        private List<SensorDto> sensors;

        public static Response from(Farm farm, List<SensorData> sensors) {
            return Response.builder()
                    .id(farm.getId())
                    .name(farm.getName())
                    .location(farm.getLocation())
                    .certification(farm.getCertification())
                    .ownerName(farm.getOwnerName())
                    .status(farm.getStatus().name())
                    .sensors(sensors.stream().map(SensorDto::from).toList())
                    .build();
        }
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class ApplyRequest {
        private String name;
        private String location;
        private String certification;
        private String ownerName;
    }
}
