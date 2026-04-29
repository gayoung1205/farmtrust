package com.farmtrust.controller;

import com.farmtrust.dto.FarmDto;
import com.farmtrust.service.FarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/farms")
@RequiredArgsConstructor
public class FarmController {

    private final FarmService farmService;

    // 승인된 농가 목록 (소비자용)
    @GetMapping
    public ResponseEntity<List<FarmDto.Response>> getApprovedFarms() {
        return ResponseEntity.ok(farmService.getApprovedFarms());
    }

    // 농가 상세
    @GetMapping("/{id}")
    public ResponseEntity<FarmDto.Response> getFarm(@PathVariable Long id) {
        return ResponseEntity.ok(farmService.getFarm(id));
    }

    // 입점 신청 (판매자)
    @PostMapping("/apply")
    public ResponseEntity<FarmDto.Response> apply(@RequestBody FarmDto.ApplyRequest req) {
        return ResponseEntity.ok(farmService.apply(req));
    }

    // 승인 대기 목록 (관리자)
    @GetMapping("/admin/pending")
    public ResponseEntity<List<FarmDto.Response>> getPending() {
        return ResponseEntity.ok(farmService.getPendingFarms());
    }

    // 승인 (관리자)
    @PatchMapping("/admin/{id}/approve")
    public ResponseEntity<FarmDto.Response> approve(@PathVariable Long id) {
        return ResponseEntity.ok(farmService.approve(id));
    }

    // 반려 (관리자)
    @PatchMapping("/admin/{id}/reject")
    public ResponseEntity<FarmDto.Response> reject(@PathVariable Long id) {
        return ResponseEntity.ok(farmService.reject(id));
    }
}
