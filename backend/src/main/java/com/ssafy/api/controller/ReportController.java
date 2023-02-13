package com.ssafy.api.controller;

import com.ssafy.api.domain.dto.*;
import com.ssafy.api.service.ReportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Api(value = "신고 기능 API", tags = {"Report"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/report")
public class ReportController {
    @Autowired
    private final ReportService resportService;

    @PostMapping("/block")
    @ApiResponses({
            @ApiResponse(code = 200, message = "차단 성공"),
    })
    @ApiOperation(value="차단 기능", notes = "다른 유저를 차단한다.")
    public ResponseEntity<? extends BaseResponseBody> reportingPeople(@RequestBody ReportReq reportReq) throws Exception {
        resportService.createReport(reportReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
    @DeleteMapping("/unblock")
    @ApiResponses({
            @ApiResponse(code = 200, message = "차단 해제 성공"),
            @ApiResponse(code = 404, message = "차단해제 실패"),
    })
    @ApiOperation(value="차단 해제 기능", notes = "다른 유저를 차단을 해제한다.")
    public ResponseEntity<? extends BaseResponseBody> unblockPeople(@RequestBody UnblockReq unblockReq) throws Exception {
        if(resportService.unblockPeople(unblockReq)){
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Failure"));
    }
    @PostMapping("/block")
    @ApiResponses({
            @ApiResponse(code = 200, message = "차단한 유저 전송"),
    })
    @ApiOperation(value="차단한 유저 가져오기", notes = "차단한 유저의 정보를 보내준다.")
    public ResponseEntity<ArrayList<ReportBlock>> findBlock(@RequestBody String userEmail) throws Exception {
        System.out.println("차단한 유저 가져오기: " + userEmail);
        ArrayList<ReportBlock> reportBlocks = resportService.getBlockPeople(userEmail);
        return ResponseEntity.status(200).body(ReportBlockRes.of(200 , "Success", reportBlocks));
    }
}
