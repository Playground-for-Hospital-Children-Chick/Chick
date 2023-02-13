package com.ssafy.api.service;

import com.ssafy.api.domain.dto.ReportReq;
import com.ssafy.api.domain.dto.UnblockReq;

public interface ReportService {
    public void createReport(ReportReq reportReq);

    public boolean unblockPeople(UnblockReq unblockReq);

}
