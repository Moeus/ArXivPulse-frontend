/**
 * Dashboard — 系统状态仪表盘页面
 * 展示平台运营统计数据、周活动趋势图、分类分布图和近期事件时间线
 * 所有子区块已拆分为独立可复用组件
 */

import React from 'react';
import { ACTIVITY_CHART, CATEGORY_CHART } from '../constants';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Sparkles, TrendingUp, Send, Globe } from 'lucide-react';

// 可复用组件
import StatCard from '../components/StatCard';
import ActivityChart from '../components/ActivityChart';
import CategoryChart from '../components/CategoryChart';
import EventTimeline from '../components/EventTimeline';
import { Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  /** 近期平台事件数据 */
  const events = [
    { time: t('event1Time'), event: t('event1Text'), icon: <RefreshCw size={18} />, color: 'text-primary' },
    { time: t('event2Time'), event: t('event2Text'), icon: <Sparkles size={18} />, color: 'text-amber-500' },
    { time: t('event3Time'), event: t('event3Text'), icon: <TrendingUp size={18} />, color: 'text-blue-500' },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* 页面标题 */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">{t('systemStatus')}</h1>
        <p className="text-text-secondary">{t('systemStatusDesc')}</p>
      </div>

      {/* 统计卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label='Days of Service' value='1,248' trend='+1' icon={<Calendar size={20} />} color='text-blue-600 bg-blue-50' />
          <StatCard label='Papers Sent' value='84.2k' trend='+12%' icon={<Send size={20} />} color='text-purple-600 bg-purple-50' />
          <StatCard label='Crawled Index' value='2.4M' trend='+5.4k' icon={<Globe size={20} />} color='text-emerald-600 bg-emerald-50' />
          <StatCard label='AI Summaries' value='12.8k' trend='+8%' icon={<Sparkles size={20} />} color='text-amber-600 bg-amber-50' />

      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart
          data={ACTIVITY_CHART}
          title={t('weeklyIndexingPulse')}
          subtitle={t('dailyAverage')}
        />
        <CategoryChart
          data={CATEGORY_CHART}
          title={t('categoryDistribution')}
          subtitle={t('topActiveFields')}
        />
      </div>

      {/* 事件时间线 */}
      {/* <EventTimeline title={t('recentPlatformEvents')} events={events} /> */}
    </div>
  );
};

export default Dashboard;
