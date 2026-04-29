package com.farmtrust.repository;

import com.farmtrust.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FarmRepository extends JpaRepository<Farm, Long> {
    List<Farm> findByStatus(Farm.FarmStatus status);
}
