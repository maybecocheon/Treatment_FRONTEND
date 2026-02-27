'use client'

export default function ProfileSkeleton() {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 p-1.5 md:pl-2 md:pr-4 rounded-2xl animate-pulse">
        {/* 아바타 아이콘 영역 */}
        <div className="w-9 h-9 rounded-xl bg-card-border shadow-sm" />

        {/* 텍스트 정보 영역 (부서 & 이름) */}
        <div className="text-left hidden sm:flex flex-col gap-1.5">
          {/* 부서 (Department) */}
          <div className="h-2 w-12 bg-card-border rounded" />
          {/* 별칭 (Alias) */}
          <div className="h-3 w-16 bg-muted/20 rounded" />
        </div>

        {/* 우측 화살표 아이콘 */}
        <div className="w-3.5 h-3.5 bg-card-border rounded-full ml-1" />
      </div>
    </div>
  )
}