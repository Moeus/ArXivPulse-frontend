/**
 * 常量文件
 * 包含 Dashboard 统计和图表数据（模拟数据，用于系统状态展示）
 * 注意：MOCK_PAPERS 已删除，论文数据现在来自后端 API
 */

import { DailyData } from "../types/index.ts";

export const ACTIVITY_CHART: DailyData[] = [
    { day: 'Mon', value: 450 },
    { day: 'Tue', value: 580 },
    { day: 'Wed', value: 490 },
    { day: 'Thu', value: 710 },
    { day: 'Fri', value: 640 },
    { day: 'Sat', value: 320 },
    { day: 'Sun', value: 280 },
];

export const CATEGORY_CHART: DailyData[] = [
    { day: 'AI/ML', value: 85 },
    { day: 'Quant-Ph', value: 65 },
    { day: 'Math', value: 45 },
    { day: 'Bio', value: 30 },
    { day: 'Stat', value: 20 },
];
