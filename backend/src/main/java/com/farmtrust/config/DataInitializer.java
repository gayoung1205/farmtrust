package com.farmtrust.config;

import com.farmtrust.entity.Farm;
import com.farmtrust.entity.Product;
import com.farmtrust.entity.SensorData;
import com.farmtrust.repository.FarmRepository;
import com.farmtrust.repository.ProductRepository;
import com.farmtrust.repository.SensorDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final FarmRepository farmRepository;
    private final SensorDataRepository sensorDataRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        // ── 농가 더미데이터 ──
        Farm farm1 = farmRepository.save(Farm.builder()
                .name("청정원 농장").location("전남 나주").ownerName("김농부")
                .certification("유기농 인증").status(Farm.FarmStatus.APPROVED).build());

        Farm farm2 = farmRepository.save(Farm.builder()
                .name("햇살 농장").location("충남 홍성").ownerName("이농부")
                .certification("무농약 인증").status(Farm.FarmStatus.APPROVED).build());

        Farm farm3 = farmRepository.save(Farm.builder()
                .name("초록빛 농장").location("경북 안동").ownerName("박농부")
                .certification("유기농 인증").status(Farm.FarmStatus.APPROVED).build());

        Farm farm4 = farmRepository.save(Farm.builder()
                .name("자연愛 농장").location("제주").ownerName("최농부")
                .certification("무농약 인증").status(Farm.FarmStatus.APPROVED).build());

        Farm farm5 = farmRepository.save(Farm.builder()
                .name("들판 농장").location("강원 홍천").ownerName("정농부")
                .certification("유기농 인증").status(Farm.FarmStatus.PENDING).build());

        // ── 센서 더미데이터 ──
        sensorDataRepository.save(SensorData.builder().farm(farm1).fieldName("밭 A").chemicalLevel(0.1).status(SensorData.SensorStatus.SAFE).build());
        sensorDataRepository.save(SensorData.builder().farm(farm1).fieldName("밭 B").chemicalLevel(0.2).status(SensorData.SensorStatus.SAFE).build());
        sensorDataRepository.save(SensorData.builder().farm(farm1).fieldName("밭 C").chemicalLevel(3.5).status(SensorData.SensorStatus.CAUTION).build());

        sensorDataRepository.save(SensorData.builder().farm(farm2).fieldName("밭 A").chemicalLevel(0.3).status(SensorData.SensorStatus.SAFE).build());
        sensorDataRepository.save(SensorData.builder().farm(farm2).fieldName("밭 B").chemicalLevel(8.7).status(SensorData.SensorStatus.DANGER).build());
        sensorDataRepository.save(SensorData.builder().farm(farm2).fieldName("밭 C").chemicalLevel(0.5).status(SensorData.SensorStatus.SAFE).build());

        sensorDataRepository.save(SensorData.builder().farm(farm3).fieldName("밭 A").chemicalLevel(0.1).status(SensorData.SensorStatus.SAFE).build());
        sensorDataRepository.save(SensorData.builder().farm(farm3).fieldName("밭 B").chemicalLevel(0.2).status(SensorData.SensorStatus.SAFE).build());
        sensorDataRepository.save(SensorData.builder().farm(farm3).fieldName("밭 C").chemicalLevel(0.1).status(SensorData.SensorStatus.SAFE).build());

        sensorDataRepository.save(SensorData.builder().farm(farm4).fieldName("밭 A").chemicalLevel(4.2).status(SensorData.SensorStatus.CAUTION).build());
        sensorDataRepository.save(SensorData.builder().farm(farm4).fieldName("밭 B").chemicalLevel(9.1).status(SensorData.SensorStatus.DANGER).build());

        // ── 상품 더미데이터 ──
        productRepository.save(Product.builder().farm(farm1).name("완숙 토마토 1kg").price(6900).unit("1kg").category("채소").imageUrl("/images/tomato.jpg").isNew(true).build());
        productRepository.save(Product.builder().farm(farm2).name("유기농 상추 200g").price(3500).unit("200g").category("채소").imageUrl("/images/lettuce.jpg").isNew(false).build());
        productRepository.save(Product.builder().farm(farm3).name("청양고추 500g").price(4200).unit("500g").category("채소").imageUrl("/images/pepper.jpg").isNew(false).build());
        productRepository.save(Product.builder().farm(farm4).name("제주 당근 1kg").price(5800).unit("1kg").category("채소").imageUrl("/images/carrot.jpg").isNew(true).build());
        productRepository.save(Product.builder().farm(farm1).name("양파 3kg").price(7500).unit("3kg").category("채소").imageUrl("/images/onion.jpg").isNew(false).build());
        productRepository.save(Product.builder().farm(farm2).name("브로콜리 2개입").price(4900).unit("2개입").category("채소").imageUrl("/images/broccoli.jpg").isNew(false).build());
        productRepository.save(Product.builder().farm(farm3).name("초당 옥수수 4개입").price(8900).unit("4개입").category("과일").imageUrl("/images/corn.jpg").isNew(true).build());
        productRepository.save(Product.builder().farm(farm4).name("감자 2kg").price(5200).unit("2kg").category("채소").imageUrl("/images/potato.jpg").isNew(false).build());
        productRepository.save(Product.builder().farm(farm1).name("깻잎 100g").price(2800).unit("100g").category("채소").imageUrl("/images/perilla.jpg").isNew(false).build());
        productRepository.save(Product.builder().farm(farm3).name("표고버섯 300g").price(6500).unit("300g").category("나물·버섯").imageUrl("/images/mushroom.jpg").isNew(true).build());
    }
}
