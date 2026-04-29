package com.farmtrust.dto;

import com.farmtrust.entity.Product;
import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private Integer price;
    private String unit;
    private String category;
    private String imageUrl;
    private Boolean isNew;
    private Long farmId;
    private String farmName;
    private String farmLocation;

    public static ProductDto from(Product p) {
        return ProductDto.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .unit(p.getUnit())
                .category(p.getCategory())
                .imageUrl(p.getImageUrl())
                .isNew(p.getIsNew())
                .farmId(p.getFarm().getId())
                .farmName(p.getFarm().getName())
                .farmLocation(p.getFarm().getLocation())
                .build();
    }
}
