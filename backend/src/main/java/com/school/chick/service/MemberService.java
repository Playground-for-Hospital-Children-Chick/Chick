package com.school.chick.service;

import com.school.chick.domain.Member;
import com.school.chick.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
    
    /**
     *  회원 가입
     * */
    public String join(Member member) {
//        validateDuplicateMember(member);//중복 회원검증
        memberRepository.save(member);
        return member.getMemId();
    }

    /**
     * 전체 화면 조회
     */
    public List<Member> findMemberes(){
        return memberRepository.findAll();
    }
    public Optional<Member> findOne(Long memberId){
        return memberRepository.findByMemId(memberId);
    }

//    private void validateDuplicateMember(Member member) {
//        memberRepository.save(member);
//        memberRepository.findByChildName(member.getId()).ifPresent(member1 -> {
//            throw  new IllegalStateException("존재");
//        });
//    }

}
