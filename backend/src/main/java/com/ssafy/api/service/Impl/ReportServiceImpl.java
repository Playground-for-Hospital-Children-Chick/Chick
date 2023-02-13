package com.ssafy.api.service.Impl;

import com.ssafy.api.domain.dto.ReportBlock;
import com.ssafy.api.domain.dto.ReportBlockRes;
import com.ssafy.api.domain.dto.ReportReq;
import com.ssafy.api.domain.dto.UnblockReq;
import com.ssafy.api.domain.entity.Report;
import com.ssafy.api.domain.repository.ReportRepository;
import com.ssafy.api.domain.repository.UserRepository;
import com.ssafy.api.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@AllArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    @Override
    public void createReport(ReportReq reportReq) {
        reportRepository.save(
                Report.builder().rpCategory(reportReq.getCategory()).
                        rpContent(reportReq.getContent())
                        .rpCreateBy(reportReq.getReporter())
                        .rpCreateDate(LocalDateTime.now()).rpHandling(0)
                        .rpReporter(reportReq.getReporter())
                        .rpReportedPeople(reportReq.getReportedPeople())
                        .rpUpdateBy(reportReq.getReporter()).rpUpdateDate(LocalDateTime.now())
                .build());
    }
    @Override
    public boolean unblockPeople(UnblockReq unblockReq){
        if(reportRepository.findByRpReporterAndRpReportedPeople(unblockReq.getReporter(), unblockReq.getReportedPeople())!=null){
            System.out.println("삭제 합시다");
            reportRepository.unblockPeople(unblockReq.getReporter(), unblockReq.getReportedPeople());
        return true;
        }
        return false;
    }

    @Override
    public ArrayList<ReportBlock> getBlockPeople(String rpReporter) {
        ArrayList<Report> reports = reportRepository.findByRpReporter(rpReporter); // rpReporter가 신고한 목록을 가져온다
        ArrayList<ReportBlock> reportBlocks = new ArrayList<ReportBlock>(); // Response에 보낼 객체 리스트
        for (Report report: reports) {
            ReportBlock reportBlock = new ReportBlock(); // 차단한 사람
            String email = report.getRpReportedPeople(); // 차단한 사람의 이메일
            reportBlock.setEmail(email); // 차단한 사람의 이메일
            reportBlock.setName(userRepository.findByUserEmail(email).getUserChName()); // 차단한 사람의 이름
            reportBlock.setReportDate(report.getRpCreateDate().toString().substring(0, 10)); // 년도-월-일
            reportBlocks.add(reportBlock);
        }
        return reportBlocks;
    }
}
