/**
 * EventTimeline — 事件时间线组件
 * 設計：書卷氣 — 文保温暖的卡片边框
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
  <div className="bg-white/80 backdrop-blur-sm border border-border-light rounded-2xl p-6 shadow-warm-sm">
    <h3 className="font-serif font-semibold text-text-main mb-6">{title}</h3>

    <div className="flex flex-col gap-6">
      {events.map((item, idx) => (
        <div key={idx} className="flex gap-4">
          {/* 左侧图标 + 连接线 */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-xl ${item.color.replace('text', 'bg')}/10 flex items-center justify-center`}>
              <span className={item.color}>
                {item.icon}
              </span>
            </div>
            {idx !== events.length - 1 && <div className="w-px h-full bg-border-light mt-2" />}
          </div>

          {/* 右侧文字 */}
          <div className="flex flex-col gap-0.5 pb-2">
            <p className="text-sm font-medium text-text-main">{item.event}</p>
            <p className="text-xs text-text-muted">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EventTimeline;
