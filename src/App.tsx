import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Info, ChevronRight, History, HelpCircle, MessageSquare, X, ArrowUp, ArrowDown, 
  Search, Star, FileText, Plus, BarChart2, Monitor, Briefcase, Grid, 
  MessageCircle, Users, LayoutDashboard, Settings, Globe, MoreHorizontal 
} from 'lucide-react';
import { RankingData, MainTabType, SubTabType } from './types';
import { MOCK_DATA, COLORS } from './constants';
import { SproutIcon, LeafIcon, CrownIcon } from './components/Icons';

// --- Components ---

const DragonSmoke = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
    <svg viewBox="0 0 800 800" className="w-full h-full scale-150 sm:scale-110">
      <defs>
        <filter id="smoke" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" />
          <feGaussianBlur stdDeviation="15" />
        </filter>
        <linearGradient id="dragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.8" />
          <stop offset="50%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.path
        d="M400,100 C600,100 700,300 400,400 C100,500 200,700 400,700"
        fill="none"
        stroke="url(#dragonGrad)"
        strokeWidth="120"
        strokeLinecap="round"
        filter="url(#smoke)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <motion.circle
        cx="400" cy="100" r="40"
        fill="white"
        filter="url(#smoke)"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </svg>
  </div>
);

const Banner = ({ 
  onOpenPanel
}: { 
  onOpenPanel: () => void
}) => {
  return (
    <div className="relative w-full h-[360px] sm:h-[420px] bg-[#1E40AF] overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Dragon Smoke Effect */}
      <DragonSmoke />

      {/* Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-10 right-[15%]"
        >
          <LeafIcon className="w-12 h-12 text-blue-900/20" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-[10%]"
        >
          <LeafIcon className="w-10 h-10 text-blue-900/15" />
        </motion.div>
      </div>

      {/* Editorial Typography */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <span className="text-xs sm:text-sm font-bold tracking-[0.4em] text-white/60 uppercase">
            Billion Incentive Leaderboard
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl sm:text-9xl font-normal text-white mb-4 tracking-normal"
          style={{ fontFamily: "'Ma Shan Zheng', cursive" }}
        >
          亿元激励榜
        </motion.h1>

        <div className="mb-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-3xl font-medium text-white/80 tracking-[0.2em]"
          >
            无惧挑战，谁与争锋
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex flex-col items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white/30 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-medium hover:bg-white/50 transition-all shadow-sm">
              <History className="w-4 h-4" />
              <span>3月15日</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            
            {/* Time Progress Bar */}
            <div className="w-72 sm:w-96 flex flex-col gap-2">
              <div className="flex justify-between text-[11px] text-white/80 font-bold px-1 tracking-wider">
                <span>开始时间: 2月1日</span>
                <span>结束时间: 4月30日</span>
              </div>
              <div className="relative h-3 w-full bg-white/20 rounded-full overflow-hidden border border-white/10 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-blue-200 to-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                />
                {/* Midpoint Marker */}
                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-white/50 z-10" />
              </div>
              <div className="text-center">
                <span className="text-[11px] text-white font-bold bg-blue-600/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
                  时间进度: 50%
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-0.5 bg-white/20 mb-2" />
            <p className="text-[10px] sm:text-xs text-white/60 tracking-[0.3em] uppercase">
              Billion Incentive · Peak Performance
            </p>
          </div>
        </motion.div>
      </div>
      {/* Info Entry */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={onOpenPanel}
        className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all z-20 shadow-lg"
      >
        <HelpCircle className="w-4 h-4" />
        <span className="text-xs font-bold">榜单说明</span>
      </motion.button>

      {/* Bottom Wave (Subtle) */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-spring-bg to-transparent opacity-50" />
    </div>
  );
};

const RankChange = ({ change }: { change: number }) => {
  if (change === 0) return <span className="text-gray-400">-</span>;
  
  const isUp = change > 0;
  return (
    <div className={`flex items-center gap-0.5 ${isUp ? 'text-green-600' : 'text-red-500'}`}>
      {isUp ? (
        <>
          <ArrowUp className="w-3 h-3 stroke-[3]" />
          <span className="text-[10px] sm:text-xs font-bold">{change}</span>
        </>
      ) : (
        <>
          <ArrowDown className="w-3 h-3 stroke-[3]" />
          <span className="text-[10px] sm:text-xs font-bold">{Math.abs(change)}</span>
        </>
      )}
    </div>
  );
};

const LeaderboardTable = ({ data }: { data: RankingData[] }) => {
  // Group data by group name
  const groups = data.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, RankingData[]>);

  return (
    <div className="w-full overflow-x-auto custom-scrollbar -mx-2 sm:mx-0">
      <table className="w-full border-collapse min-w-[500px] sm:min-w-[700px] table-fixed">
        <thead>
          <tr className="bg-spring-light/20 text-spring-main text-[10px] sm:text-sm uppercase tracking-wider">
            <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[12%]">业务组</th>
            <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[18%]">地区</th>
            <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[18%]">累计同比</th>
            <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[18%]">累计达成率</th>
            <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[34%]">累计达成排名</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groups).map(([groupName, groupItems]) => (
            <React.Fragment key={groupName}>
              {groupItems.map((item, index) => {
                const isAchievementTop3 = (item.achievementRank ?? 0) <= 3;
                const achievementCrownColor = item.achievementRank === 1 ? "#FFD700" : item.achievementRank === 2 ? "#C0C0C0" : "#CD7F32";
                
                const rowBg = isAchievementTop3 ? 'bg-spring-light/5' : '';

                return (
                  <motion.tr 
                    key={`${item.group}-${item.region}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`hover:bg-spring-light/10 transition-colors ${rowBg}`}
                  >
                    {index === 0 && (
                      <td 
                        rowSpan={groupItems.length} 
                        className="py-4 px-1 sm:p-4 border-b border-spring-light/10 font-bold text-spring-main bg-spring-light/5 text-center align-middle text-xs sm:text-base"
                      >
                        {groupName}
                      </td>
                    )}
                    <td className="py-3 px-1 sm:p-3 border-b border-spring-light/10 font-medium text-xs sm:text-base text-center truncate">
                      {item.region}
                    </td>
                    
                    <td className={`py-3 px-1 sm:p-3 border-b border-spring-light/10 text-center font-mono text-xs sm:text-base ${item.yoy > 0 ? 'text-green-600' : item.yoy < 0 ? 'text-red-500' : 'text-gray-600'}`}>
                      {item.yoy > 0 ? `+${item.yoy.toFixed(1)}%` : `${item.yoy.toFixed(1)}%`}
                    </td>
                    <td className={`py-3 px-1 sm:p-3 border-b border-spring-light/10 text-center font-mono text-xs sm:text-base font-bold ${(item.achievementRate ?? 0) >= 100 ? 'text-green-600' : 'text-red-500'}`}>
                      {item.achievementRate?.toFixed(1)}%
                    </td>
                    <td className="py-3 px-1 sm:p-3 border-b border-spring-light/10 text-center">
                      <div className="flex justify-center items-center">
                        {isAchievementTop3 ? (
                          <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8">
                            <CrownIcon className="w-6 h-6 sm:w-8 sm:h-8" color={achievementCrownColor} />
                            <span className="absolute text-[8px] sm:text-[10px] font-bold text-white mt-0.5 sm:mt-1">{item.achievementRank}</span>
                          </div>
                        ) : (
                          <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-spring-main/10 flex items-center justify-center text-[10px] sm:text-sm font-bold text-spring-main">
                            {item.achievementRank}
                          </span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SidePanel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const sections = [
    {
      title: "考核产品口径",
      icon: <Info className="w-4 h-4" />,
      content: "顺丰标快/顺丰特快/顺丰空配（新）/专享即日/填舱标快/标快零担/特快包裹/陆运包裹/限时次日/顺丰半日达/顺丰卡航/顺丰微小件/生鲜专递"
    },
    {
      title: "取数逻辑",
      icon: <ChevronRight className="w-4 h-4" />,
      content: "26年实际达成及25年基准值计算取数：丰景台-小件传统时效PB客层-26汇总（当月收入在次月6日后重塑）"
    },
    {
      title: "目标逻辑",
      icon: <History className="w-4 h-4" />,
      content: "26年预算目标取数来源于丰景台-小件传统时效PB客层-分月基准及预算"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] overflow-y-auto p-6"
          >
            <div className="flex justify-between items-center mb-8 border-b border-spring-light/20 pb-4">
              <div className="flex items-center gap-2 text-spring-main">
                <HelpCircle className="w-6 h-6" />
                <h2 className="text-xl font-bold">榜单说明</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-spring-bg rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              {sections.map((section, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-spring-bg/50 p-4 rounded-xl border border-spring-light/10"
                >
                  <div className="flex items-center gap-2 text-spring-main font-bold mb-2">
                    {section.icon}
                    <h3>{section.title}</h3>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Home = ({ onEnterLeaderboard }: { onEnterLeaderboard: () => void }) => {
  const reports = [
    { title: "经营日报", dept: "企发办", tag: "重点关注" },
    { title: "业务区健康经营诊断看板", dept: "企发办", tag: "重点关注" },
    { title: "分拨区健康经营诊断看板", dept: "企发办", tag: "重点关注" },
    { title: "卡片模式demo", dept: "经营数据产品部", read: "0/1人" },
    { title: "534", dept: "经营数据产品部", read: "0/1人" },
    { title: "大件运营客诉诊断看板", dept: "零担整车运营组", read: "137/5589人" },
    { title: "大件运营损坏诊断看板", dept: "零担整车运营组", read: "137/5589人" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 pt-12 pb-20 px-4 text-center relative">
        <h1 className="text-white text-xl font-medium">数据分析</h1>
      </div>

      {/* Top Cards */}
      <div className="px-4 -mt-12 grid grid-cols-2 gap-3 relative z-10">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-orange-500">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-bold text-gray-800">我的关注</span>
          </div>
          <div className="text-xs text-gray-500">共关注指标: 39</div>
          <div className="text-xs text-gray-500">今日异常: <span className="text-red-500">0</span></div>
          <div className="absolute right-4 bottom-4 opacity-10">
             <Star className="w-12 h-12 text-orange-500 fill-current" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-500">
            <FileText className="w-5 h-5 fill-current" />
            <span className="font-bold text-gray-800">专题报告</span>
          </div>
          <div className="text-xs text-gray-500">收藏报告: 10</div>
          <div className="absolute right-4 bottom-4 opacity-10">
             <FileText className="w-12 h-12 text-blue-500 fill-current" />
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="mt-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-6">
            <span className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1">推荐报告 <span className="text-xs font-normal opacity-70">(23)</span></span>
            <span className="text-gray-400 font-medium">我的收藏 <span className="text-xs font-normal opacity-70">(0)</span></span>
          </div>
          <button className="flex items-center gap-1 text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1 rounded-full">
            <Plus className="w-4 h-4" />
            创建报告
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索报告名称..." 
            className="w-full bg-gray-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Report List */}
        <div className="space-y-3">
          {reports.map((report, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl flex items-start gap-3 shadow-sm border border-gray-50">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-800 truncate">{report.title}</h3>
                  {report.tag && (
                    <span className="text-[10px] bg-orange-50 text-orange-500 px-1.5 py-0.5 rounded border border-orange-100 whitespace-nowrap">
                      {report.tag}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span>移动端/pc</span>
                  <span>{report.dept}</span>
                  {report.read && <span>已阅读 {report.read}</span>}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Entry Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEnterLeaderboard}
        className="fixed right-0 top-1/3 z-50 bg-blue-600 text-white py-4 px-2 rounded-l-2xl shadow-xl flex flex-col items-center gap-2 border border-blue-400 border-r-0"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="text-sm font-bold tracking-[0.2em]">亿元激励榜</span>
      </motion.button>

      {/* Bottom Nav */}
      <div className="fixed bottom-16 left-0 w-full bg-white border-t border-gray-100 px-4 py-2 flex justify-around items-center z-40">
        <div className="flex flex-col items-center gap-1 text-blue-600">
          <BarChart2 className="w-5 h-5" />
          <span className="text-[10px] font-bold">数据报告</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Monitor className="w-5 h-5" />
          <span className="text-[10px]">动态监控</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px]">经营简报</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Grid className="w-5 h-5" />
          <span className="text-[10px]">常用工具</span>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-2 py-2 flex justify-around items-center z-40">
        <div className="flex flex-col items-center gap-1 text-gray-400 relative">
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px]">消息</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center">3</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Users className="w-5 h-5" />
          <span className="text-[10px]">协作</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-blue-600">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">经营数智</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Settings className="w-5 h-5" />
          <span className="text-[10px]">服务</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Globe className="w-5 h-5" />
          <span className="text-[10px]">资讯</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px]">更多</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'leaderboard'>('home');
  const [mainTab] = useState<MainTabType>('incentive');
  const [activeTab, setActiveTab] = useState<SubTabType>('incentive_overall');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const incentiveTabs = [
    { id: 'incentive_overall', label: '整体' },
    { id: 'incentive_large', label: '大件' },
    { id: 'incentive_small', label: '小件' },
  ];

  const currentTabs = incentiveTabs;

  if (view === 'home') {
    return <Home onEnterLeaderboard={() => setView('leaderboard')} />;
  }

  return (
    <div className="min-h-screen flex flex-col pb-12 bg-spring-bg">
      <div className="fixed top-4 left-4 z-50">
        <button 
          onClick={() => setView('home')}
          className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-3 h-3 rotate-180" />
          返回首页
        </button>
      </div>
      <Banner 
        onOpenPanel={() => setIsPanelOpen(true)} 
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 -mt-8 relative z-10">
        <div className="glass-panel rounded-3xl shadow-xl overflow-hidden mb-8">
          {/* Tabs */}
          <div className="flex border-b border-spring-light/20 bg-white/50">
            {currentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SubTabType)}
                className={`flex-1 py-4 px-6 text-sm font-bold transition-all relative ${
                  activeTab === tab.id ? 'text-spring-main' : 'text-gray-400 hover:text-spring-light'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-1 bg-spring-main"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-2 sm:p-6">
            <LeaderboardTable data={MOCK_DATA[activeTab]} />
          </div>
        </div>
      </main>

      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 spring-gradient opacity-50" />
    </div>
  );
}
