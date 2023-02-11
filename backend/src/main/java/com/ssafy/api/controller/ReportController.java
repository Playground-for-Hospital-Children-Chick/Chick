package com.ssafy.api.controller;

import com.ssafy.api.domain.dto.BaseResponseBody;
import com.ssafy.api.domain.dto.ReportReq;
import com.ssafy.api.service.ReportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "신고 기능 API", tags = {"Report"})
@RestController
@RequestMapping("/api/report")
public class ReportController {
    @Autowired
    private final ReportService resportService;

    public ReportController(ReportService resportService) {
        this.resportService = resportService;
    }

    @PostMapping("/declare")
    @ApiOperation(value="신고 기능", notes = "다른 유저를 신고한다.")
    public ResponseEntity<? extends BaseResponseBody> reportingPeople(@RequestBody ReportReq reportReq) throws Exception {
        resportService.createReport(reportReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
