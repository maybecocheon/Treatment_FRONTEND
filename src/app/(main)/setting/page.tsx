'use client'

import React, { useState } from 'react';
import Title from '@/components/main/Title';
import { User, Mail, Shield, ArrowLeft, Trash2, Save, Key, Lock, Globe, Clock, CheckCircle2 } from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '운영자님',
    email: 'admin@skyglass.com',
    department: '수운영 관리팀'
  });

  return (
    <div className="flex flex-col flex-1 h-full gap-8 md:p-6 bg-slate-50/30">

      {/* 2. 메인 컨텐츠 영역 (너비 확장 및 높이 균형) */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-2 flex flex-col gap-6">
        {/* 1. 상단 타이틀 영역 */}
        <div className="flex items-center gap-4 w-full px-2">
          <button
            onClick={onBack}
            className="p-3 glass rounded-2xl hover:bg-white transition-all text-blue-900 shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <Title title="회원 정보 관리" subtitle="계정 설정 및 시스템 보안 권한을 구성합니다." />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* 좌측: 확장된 프로필 카드 (높이 100% 유지) */}
          <div className="lg:col-span-3 h-full">
            <div className="glass h-full p-8 rounded-[3rem] flex flex-col items-center border border-white/60 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600/20 to-transparent -z-0"></div>

              <div className="relative z-10 flex flex-col items-center flex-1 w-full">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl mb-6 border-4 border-white mt-4">
                  <User size={64} />
                </div>
                <h3 className="text-2xl font-black text-blue-950">{formData.name}</h3>
                <p className="text-sm font-bold text-blue-900/40 uppercase tracking-widest mt-1">{formData.department}</p>

                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50/80 rounded-xl text-blue-900 border border-blue-100/50 mt-6">
                  <Shield size={14} className="text-blue-500" />
                  <span className="text-[10px] font-black uppercase tracking-wider">최고 관리자 권한</span>
                </div>

                <div className="flex-1"></div>
                <div className="w-full h-[1px] bg-blue-900/5 my-8"></div>

                {/* 프로필 하단 여백을 채우는 추가 정보 */}
                <div className="w-full space-y-6">
                  <div className="space-y-3">
                    <h5 className="text-[11px] font-black text-blue-900/30 uppercase tracking-widest flex items-center gap-2">
                      <Clock size={12} /> 최근 활동
                    </h5>
                    <div className="bg-white/40 p-4 rounded-2xl border border-white/40">
                      <p className="text-xs font-bold text-blue-950">마지막 로그인</p>
                      <p className="text-[10px] text-blue-900/50 font-medium mt-1">2026.01.30 15:58:43 (Busan)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 우측: 메인 설정 영역 (높이 100% 및 2열 배치) */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

            {/* 기본 정보 수정 섹션 */}
            <div className="glass p-10 rounded-[3rem] border border-white/60 shadow-2xl flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shadow-sm">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-blue-950">기본 정보 설정</h4>
                  <p className="text-xs font-bold text-blue-900/30 uppercase tracking-tighter">Profile Information</p>
                </div>
              </div>

              <div className="space-y-6 flex-1">
                {[
                  { label: '사용자 이름', icon: User, value: formData.name },
                  { label: '아이디 (이메일 주소)', icon: Mail, value: formData.email },
                  { label: '소속 부서', icon: Key, value: formData.department }
                ].map((field, idx) => (
                  <div key={idx} className="space-y-2">
                    <label className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest flex items-center gap-2 ml-1">
                      <field.icon size={12} /> {field.label}
                    </label>
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full px-6 py-4 glass-dark border border-white/20 rounded-[1.25rem] text-blue-950 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-all shadow-inner"
                    />
                  </div>
                ))}
              </div>

              <button className="w-full mt-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20 active:scale-[0.98]">
                <Save size={18} />
                기본 정보 업데이트
              </button>
            </div>

            {/* 비밀번호 변경 섹션 (input 추가됨) */}
            <div className="glass p-10 rounded-[3rem] border border-white/60 shadow-2xl flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 shadow-sm">
                  <Lock size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-blue-950">비밀번호 변경</h4>
                  <p className="text-xs font-bold text-blue-900/30 uppercase tracking-tighter">Security Credentials</p>
                </div>
              </div>

              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest flex items-center gap-2 ml-1">
                    현재 비밀번호
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-6 py-4 glass-dark border border-white/20 rounded-[1.25rem] text-blue-950 font-bold focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest flex items-center gap-2 ml-1">
                    새 비밀번호
                  </label>
                  <input
                    type="password"
                    placeholder="새로운 비밀번호 입력"
                    className="w-full px-6 py-4 glass-dark border border-white/20 rounded-[1.25rem] text-blue-950 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest flex items-center gap-2 ml-1">
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    placeholder="새로운 비밀번호 다시 입력"
                    className="w-full px-6 py-4 glass-dark border border-white/20 rounded-[1.25rem] text-blue-950 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-all shadow-inner"
                  />
                </div>
                <p className="text-[10px] font-bold text-blue-900/40 px-1 leading-relaxed">
                  ※ 비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.
                </p>
              </div>

              <button className="w-full mt-10 py-5 glass border-amber-200 hover:bg-amber-500 hover:text-white text-amber-700 rounded-2xl font-black transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                <Key size={18} />
                비밀번호 변경하기
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone (전체 너비로 하단 배치) */}
        <div className="mt-8 px-4">
          <button className="flex items-center gap-4 group transition-all opacity-40 hover:opacity-100">
            <div className="p-2 bg-red-100 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all">
              <Trash2 size={16} />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-black text-red-950">시스템 탈퇴</h4>
              <p className="text-[9px] font-bold text-red-900/40 uppercase">Account Deletion</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;