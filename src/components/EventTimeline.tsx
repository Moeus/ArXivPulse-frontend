/**
 * EventTimeline — 事件时间线组件
 * 纵向展示最近的平台事件，每个事件带图标、描述和时间
 * 用于 Dashboard 页面
 *
 * Props:
 *   title  — 区块标题
 *   events — 事件数组 [{ time, event, icon, color }]
 */

import React from 'react';

interface TimelineEvent {
  time: string;
  event: string;
  icon: React.ReactNode;
  color: string;
}

interface EventTimelineProps {
  title: string;
  events: TimelineEvent[];
}

const EventTimeline: React.FC<EventTimelineProps> = ({ title, events }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
    <h3 className="font-bold text-text-main mb-6">{title}</h3>

    <div className="flex flex-col gap-6">
      {events.map((item, idx) => (
        <div key={idx} className="flex gap-4">
          {/* 左侧图标 + 连接线 */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full ${item.color.replace('text', 'bg')}/10 flex items-center justify-center`}>
              <span className={item.color}>
                {item.icon}
              </span>
            </div>
            {idx !== events.length - 1 && <div className="w-px h-full bg-gray-100 mt-2" />}
          </div>

          {/* 右侧文字 */}
          <div className="flex flex-col gap-0.5 pb-2">
            <p className="text-sm font-medium text-text-main">{item.event}</p>
            <p className="text-xs text-text-secondary">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EventTimeline;
