export default function Background() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* 메인 하늘색 그라데이션 광원 */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-200/40 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-100/50 blur-[140px] rounded-full animate-pulse delay-1000" />
            
            {/* 디테일 버블 */}
            <div className="absolute top-[20%] right-[15%] w-32 h-32 bg-indigo-100/40 blur-[60px] rounded-full" />
        </div>
    );
}