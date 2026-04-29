package com.farmtrust.repository;

import com.farmtrust.entity.SensorData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SensorDataRepository extends JpaRepository<SensorData, Long> {
    List<SensorData> findByFarmId(Long farmId);
}
