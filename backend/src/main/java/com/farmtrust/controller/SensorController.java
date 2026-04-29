package com.farmtrust.controller;

import com.farmtrust.dto.SensorDto;
import com.farmtrust.service.SensorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sensors")
@RequiredArgsConstructor
public class SensorController {

    private final SensorService sensorService;

    // 전체 센서 (메인 배너용)
    @GetMapping
    public ResponseEntity<List<SensorDto>> getAll() {
        return ResponseEntity.ok(sensorService.getAllSensors());
    }

    // 특정 농가 센서
    @GetMapping("/farm/{farmId}")
    public ResponseEntity<List<SensorDto>> getByFarm(@PathVariable Long farmId) {
        return ResponseEntity.ok(sensorService.getSensorsByFarm(farmId));
    }
}
