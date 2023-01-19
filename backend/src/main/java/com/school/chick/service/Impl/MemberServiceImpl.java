package com.school.chick.service.Impl;

import com.school.chick.domain.dto.MemberDto;
import com.school.chick.domain.repository.MemberRepository;
import com.school.chick.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     *  회원 가입
     * */
    public String join(MemberDto member) {
//        validateDuplicateMember(member);//중복 회원검증
        memberRepository.save(member);
        return member.getMemId();
    }

    /**
     * 전체 화면 조회
     */
    public List<MemberDto> findMemberes(){
        return memberRepository.findAll();
    }

    public Optional<MemberDto> findOne(Long memberId){
        return memberRepository.findByMemId(memberId);
    }

//    private void validateDuplicateMember(Member member) {
//        memberRepository.save(member);
//        memberRepository.findByChildName(member.getId()).ifPresent(member1 -> {
//            throw  new IllegalStateException("존재");
//        });
//    }
}
