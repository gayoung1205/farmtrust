package com.farmtrust.service;

import com.farmtrust.dto.FarmDto;
import com.farmtrust.entity.Farm;
import com.farmtrust.entity.SensorData;
import com.farmtrust.repository.FarmRepository;
import com.farmtrust.repository.SensorDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FarmService {

    private final FarmRepository farmRepository;
    private final SensorDataRepository sensorDataRepository;

    public List<FarmDto.Response> getApprovedFarms() {
        return farmRepository.findByStatus(Farm.FarmStatus.APPROVED).stream()
                .map(farm -> {
                    List<SensorData> sensors = sensorDataRepository.findByFarmId(farm.getId());
                    return FarmDto.Response.from(farm, sensors);
                }).toList();
    }

    public FarmDto.Response getFarm(Long id) {
        Farm farm = farmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("농가를 찾을 수 없습니다."));
        List<SensorData> sensors = sensorDataRepository.findByFarmId(id);
        return FarmDto.Response.from(farm, sensors);
    }

    @Transactional
    public FarmDto.Response apply(FarmDto.ApplyRequest req) {
        Farm farm = Farm.builder()
                .name(req.getName())
                .location(req.getLocation())
                .certification(req.getCertification())
                .ownerName(req.getOwnerName())
                .status(Farm.FarmStatus.PENDING)
                .build();
        Farm saved = farmRepository.save(farm);
        return FarmDto.Response.from(saved, List.of());
    }

    @Transactional
    public FarmDto.Response approve(Long id) {
        Farm farm = farmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("농가를 찾을 수 없습니다."));
        farm.setStatus(Farm.FarmStatus.APPROVED);
        return FarmDto.Response.from(farm, sensorDataRepository.findByFarmId(id));
    }

    @Transactional
    public FarmDto.Response reject(Long id) {
        Farm farm = farmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("농가를 찾을 수 없습니다."));
        farm.setStatus(Farm.FarmStatus.REJECTED);
        return FarmDto.Response.from(farm, List.of());
    }

    public List<FarmDto.Response> getPendingFarms() {
        return farmRepository.findByStatus(Farm.FarmStatus.PENDING).stream()
                .map(farm -> FarmDto.Response.from(farm, List.of())).toList();
    }
}
