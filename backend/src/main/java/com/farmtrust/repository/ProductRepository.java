package com.farmtrust.repository;

import com.farmtrust.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByFarmId(Long farmId);
    List<Product> findByCategory(String category);
    List<Product> findByIsNewTrue();
}
