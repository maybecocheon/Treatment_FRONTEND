export default function JoinFormSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* 사원 정보 섹션 */}
            <div className="space-y-3">
                <div className="h-3.5 w-16 bg-slate-200 rounded ml-1" /> {/* 섹션 타이틀 */}
                <div className="h-12 w-full bg-slate-100 rounded-xl" /> {/* 성함 */}
                <div className="h-12 w-full bg-slate-100 rounded-xl" /> {/* 부서 선택 */}
            </div>

            {/* 로그인 정보 섹션 */}
            <div className="space-y-3">
                <div className="h-3.5 w-20 bg-slate-200 rounded ml-1" /> {/* 섹션 타이틀 */}

                {/* 아이디 + 중복확인 버튼 */}
                <div className="flex items-center gap-2">
                    <div className="h-12 flex-1 bg-slate-100 rounded-xl" />
                    <div className="h-12 w-20 bg-slate-200 rounded-xl" />
                </div>

                {/* 비밀번호 & 확인 */}
                <div className="h-12 w-full bg-slate-100 rounded-xl" />
                <div className="h-12 w-full bg-slate-100 rounded-xl" />

                {/* 하단 메시지 영역 (비밀번호 일치 확인용 공백) */}
                <div className="h-4 w-32 bg-slate-50 rounded ml-2" />
            </div>

            {/* 회원가입 버튼 */}
            <div className="h-12 w-full bg-sky-100 rounded-xl mt-2" />

            {/* 하단 구분선 및 로그인 이동 구역 */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
                <div className="h-4 w-32 bg-slate-100 rounded" />
                <div className="h-10 w-40 bg-slate-100 rounded-xl" />
            </div>
        </div>
    )
}
