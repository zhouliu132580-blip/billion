import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, ChevronRight, History, HelpCircle, MessageSquare, X, ArrowUp, ArrowDown } from 'lucide-react';
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
  onOpenPanel, 
  activeMainTab, 
  onMainTabChange 
}: { 
  onOpenPanel: () => void, 
  activeMainTab: MainTabType,
  onMainTabChange: (tab: MainTabType) => void
}) => {
  const slogans = ["龙腾虎跃，决战巅峰", "龙腾万里争锋", "虎啸千林夺魁"];
  const [sloganIndex, setSloganIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] bg-[#B71C1C] overflow-hidden flex flex-col items-center justify-center p-4">
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
          <LeafIcon className="w-12 h-12 text-red-950/20" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-[10%]"
        >
          <LeafIcon className="w-10 h-10 text-red-950/15" />
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
            Spring Equinox & Dragon Day
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl sm:text-9xl font-normal text-white mb-4 tracking-normal"
          style={{ fontFamily: "'Ma Shan Zheng', cursive" }}
        >
          业务龙虎榜
        </motion.h1>

        <div className="h-10 overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={sloganIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl sm:text-3xl font-medium text-white/80 tracking-[0.2em]"
            >
              {slogans[sloganIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white/30 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-medium hover:bg-white/50 transition-all shadow-sm">
            <History className="w-4 h-4" />
            <span>3月15日</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </button>

          {/* Main Page Tabs */}
          <div className="flex gap-4 p-1 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10">
            {[
              { id: 'incentive', label: '小哥亿元激励' },
              { id: 'leaderboard', label: '地区龙虎榜' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onMainTabChange(tab.id as MainTabType)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative overflow-hidden ${
                  activeMainTab === tab.id 
                    ? 'text-red-900 bg-white shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
                {activeMainTab === tab.id && (
                  <motion.div 
                    layoutId="mainTabGlow"
                    className="absolute inset-0 bg-white/20 blur-xl"
                  />
                )}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-0.5 bg-white/20 mb-2" />
            <p className="text-[10px] sm:text-xs text-white/60 tracking-[0.3em] uppercase">
              Dragon Head Rising · Spring Battle
            </p>
          </div>
        </motion.div>
      </div>

      {/* Info Entry */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={onOpenPanel}
        className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-all z-20"
      >
        <HelpCircle className="w-5 h-5 text-red-950" />
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

const LeaderboardTable = ({ data, mainTab }: { data: RankingData[], mainTab: MainTabType }) => {
  // Group data by group name
  const groups = data.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, RankingData[]>);

  const isIncentive = mainTab === 'incentive';

  return (
    <div className="w-full overflow-x-auto custom-scrollbar -mx-2 sm:mx-0">
      <table className="w-full border-collapse min-w-[500px] sm:min-w-[700px] table-fixed">
        <thead>
          <tr className="bg-spring-light/20 text-spring-main text-[10px] sm:text-sm uppercase tracking-wider">
            <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[12%]">业务组</th>
            <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[18%]">地区</th>
            {isIncentive ? (
              <>
                <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[18%]">累计同比</th>
                <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[18%]">累计达成率</th>
                <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[34%]">累计达成排名</th>
              </>
            ) : (
              <>
                <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[35%]">月累计同比</th>
                <th className="py-3 px-1 sm:p-3 border-b border-spring-light/30 text-center w-[35%]">排名</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {Object.entries(groups).map(([groupName, groupItems]) => (
            <React.Fragment key={groupName}>
              {groupItems.map((item, index) => {
                const isTop3 = item.rank <= 3;
                const crownColor = item.rank === 1 ? "#FFD700" : item.rank === 2 ? "#C0C0C0" : "#CD7F32";
                
                const isAchievementTop3 = (item.achievementRank ?? 0) <= 3;
                const achievementCrownColor = item.achievementRank === 1 ? "#FFD700" : item.achievementRank === 2 ? "#C0C0C0" : "#CD7F32";
                
                const rowBg = (isIncentive ? isAchievementTop3 : isTop3) ? 'bg-spring-light/5' : '';

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
                    
                    {isIncentive ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        <td className={`py-3 px-1 sm:p-3 border-b border-spring-light/10 text-center font-mono text-xs sm:text-base ${item.yoy > 0 ? 'text-green-600' : item.yoy < 0 ? 'text-red-500' : 'text-gray-600'}`}>
                          {item.yoy > 0 ? `+${item.yoy.toFixed(1)}%` : `${item.yoy.toFixed(1)}%`}
                        </td>
                        <td className="py-3 px-1 sm:p-3 border-b border-spring-light/10 text-center">
                          <div className="flex justify-center items-center">
                            {isTop3 ? (
                              <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8">
                                <CrownIcon className="w-6 h-6 sm:w-8 sm:h-8" color={crownColor} />
                                <span className="absolute text-[8px] sm:text-[10px] font-bold text-white mt-0.5 sm:mt-1">{item.rank}</span>
                              </div>
                            ) : (
                              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] sm:text-xs text-gray-500">
                                {item.rank}
                              </span>
                            )}
                          </div>
                        </td>
                      </>
                    )}
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

const SidePanel = ({ isOpen, onClose, mainTab }: { isOpen: boolean, onClose: () => void, mainTab: MainTabType }) => {
  const incentiveSections = [
    {
      title: "1、考核数据口径",
      icon: <Info className="w-4 h-4" />,
      content: "产品包含：顺丰标快/顺丰特快/顺丰空配（新）/专享即日/填舱标快/标快零担/特快包裹/陆运包裹/限时次日/顺丰半日达/顺丰卡航/顺丰微小件/生鲜专递。2月考核只含小件且数据已固化，3月和4月含小件和大件。"
    },
    {
      title: "2、26年实际达成计算取数",
      icon: <ChevronRight className="w-4 h-4" />,
      content: "丰景台-小件传统时效PB客层-26汇总（预估值，次月6日左右会重塑）。"
    },
    {
      title: "3、25年基准及26年预算目标取数",
      icon: <History className="w-4 h-4" />,
      content: "丰景台-小件传统时效PB客层-分月基准及预算（2月基准为农历同期数据，即25年1月13日腊月十四-25年2月9日正月十二）。"
    },
    {
      title: "4、成本返还规则",
      icon: <MessageSquare className="w-4 h-4" />,
      content: "2-4月份累计达成返还累计成本，单月达成返还单月成本（二者就高）。"
    }
  ];

  const leaderboardSections = [
    {
      title: "数据口径",
      icon: <Info className="w-4 h-4" />,
      content: "统计周期：2026年1月1日至3月15日。数据来源：经营分析系统实时同步。计算规则：收入月累计同比 = (本期收入 - 上年同期收入) / 上年同期收入 * 100%。"
    },
    {
      title: "排名规则",
      icon: <ChevronRight className="w-4 h-4" />,
      content: "评分权重：收入月累计同比占比100%。更新频率：每日凌晨2:00更新T+1数据，每周一凌晨固化上周榜单。"
    },
    {
      title: "申诉机制",
      icon: <MessageSquare className="w-4 h-4" />,
      content: "如对数据有异议，请在榜单发布后24小时内通过‘经营数智-常用工具-意见反馈-数据口径问题’入口提交反馈，我们将于1个工作日内核实。"
    }
  ];

  const sections = mainTab === 'incentive' ? incentiveSections : leaderboardSections;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto p-6"
          >
            <div className="flex justify-between items-center mb-8 border-b border-spring-light/20 pb-4">
              <div className="flex items-center gap-2 text-spring-main">
                <HelpCircle className="w-6 h-6" />
                <h2 className="text-xl font-bold">
                  {mainTab === 'incentive' ? '小哥亿元激励说明' : '地区龙虎榜说明'}
                </h2>
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
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [mainTab, setMainTab] = useState<MainTabType>('leaderboard');
  const [activeTab, setActiveTab] = useState<SubTabType>('overall');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const leaderboardTabs = [
    { id: 'overall', label: '整体' },
    { id: 'small_package', label: '小件战况' },
    { id: 'large_package', label: '大件战况' },
    { id: 'individual_order', label: '散单战况' },
  ];

  const incentiveTabs = [
    { id: 'incentive_overall', label: '整体' },
    { id: 'incentive_large', label: '大件' },
    { id: 'incentive_small', label: '小件' },
  ];

  const currentTabs = mainTab === 'leaderboard' ? leaderboardTabs : incentiveTabs;

  const handleMainTabChange = (tab: MainTabType) => {
    setMainTab(tab);
    setActiveTab(tab === 'leaderboard' ? 'overall' : 'incentive_overall');
  };

  return (
    <div className="min-h-screen flex flex-col pb-12">
      <Banner 
        onOpenPanel={() => setIsPanelOpen(true)} 
        activeMainTab={mainTab}
        onMainTabChange={handleMainTabChange}
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
            <LeaderboardTable data={MOCK_DATA[activeTab]} mainTab={mainTab} />
          </div>
        </div>
      </main>

      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} mainTab={mainTab} />

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 spring-gradient opacity-50" />
    </div>
  );
}
