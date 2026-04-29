package com.farmtrust.service;

import com.farmtrust.dto.ProductDto;
import com.farmtrust.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream().map(ProductDto::from).toList();
    }

    public List<ProductDto> getNewProducts() {
        return productRepository.findByIsNewTrue().stream().map(ProductDto::from).toList();
    }

    public List<ProductDto> getProductsByCategory(String category) {
        return productRepository.findByCategory(category).stream().map(ProductDto::from).toList();
    }

    public ProductDto getProduct(Long id) {
        return productRepository.findById(id)
                .map(ProductDto::from)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
    }
}
