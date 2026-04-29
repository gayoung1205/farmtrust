package com.farmtrust.service;

import com.farmtrust.dto.SensorDto;
import com.farmtrust.repository.SensorDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SensorService {

    private final SensorDataRepository sensorDataRepository;

    public List<SensorDto> getAllSensors() {
        return sensorDataRepository.findAll().stream().map(SensorDto::from).toList();
    }

    public List<SensorDto> getSensorsByFarm(Long farmId) {
        return sensorDataRepository.findByFarmId(farmId).stream().map(SensorDto::from).toList();
    }
}
