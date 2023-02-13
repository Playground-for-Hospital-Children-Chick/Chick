package com.ssafy.api.service.Impl;

import com.ssafy.api.domain.dto.ReportReq;
import com.ssafy.api.domain.dto.UnblockReq;
import com.ssafy.api.domain.entity.Report;
import com.ssafy.api.domain.repository.ReportRepository;
import com.ssafy.api.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReportServiceImpl implements ReportService {
    private final ReportRepository reportRepository;

    @Autowired
    public ReportServiceImpl(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

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
}
