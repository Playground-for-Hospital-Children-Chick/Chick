package com.ssafy.api.service;

import com.ssafy.api.domain.dto.ReportBlock;
import com.ssafy.api.domain.dto.ReportBlockRes;
import com.ssafy.api.domain.dto.ReportReq;
import com.ssafy.api.domain.dto.UnblockReq;

import java.util.ArrayList;

public interface ReportService {
    public void createReport(ReportReq reportReq);

    public boolean unblockPeople(UnblockReq unblockReq);
    public ArrayList<ReportBlock> getBlockPeople(String rpReporter);

}
