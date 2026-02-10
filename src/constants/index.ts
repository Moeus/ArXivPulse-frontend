/**
 * 常量与模拟数据
 * 包含论文 Mock 数据、热门话题、Dashboard 统计和图表数据
 * 后续接入后端 API 后，MOCK_PAPERS 将被替换为真实数据
 */

import { Paper, TrendingTopic, StatItem, DailyData } from "../types/index.ts";

export const MOCK_PAPERS: Paper[] = [
    {
        id: '1',
        title: 'Attention Is All You Need',
        abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer...',
        authors: ['Ashish Vaswani', 'Noam Shazeer'],
        mainCategory: 'cs.AI',
        subCategory: 'Machine Learning',
        publishedDate: '12 Jun 2017',
        isBookmarked: false
    },
    {
        id: '2',
        title: 'Quantum Supremacy Using a Programmable Superconducting Processor',
        abstract: 'The promise of quantum computers is that certain computational tasks might be executed exponentially faster on a quantum processor than on a classical processor. A fundamental challenge is to build a high-fidelity processor capable of running quantum algorithms in an exponentially large computational space.',
        authors: ['Frank Arute', 'Kunal Arya'],
        mainCategory: 'physics.quant-ph',
        subCategory: 'Quantum Computing',
        publishedDate: '23 Oct 2019',
        isBookmarked: false
    },
    {
        id: '3',
        title: 'Mapping the connectome of the human brain',
        abstract: 'Understanding the structural connectivity of the human brain is crucial for unraveling its functional organization. Here, we present a comprehensive map of the human connectome derived from high-resolution diffusion imaging data, revealing new insights into brain network topology.',
        authors: ['Sarah Jenkins', 'David Chen'],
        mainCategory: 'q-bio.NC',
        subCategory: 'Neuroscience',
        publishedDate: '05 Nov 2023',
        isBookmarked: true
    },
    {
        id: '4',
        title: 'Geometric structures on 3-manifolds',
        abstract: 'We explore the classification of geometric structures on 3-manifolds, focusing on the interplay between hyperbolic geometry and topological invariants. This work extends the foundational results of Thurston\'s geometrization conjecture.',
        authors: ['Elena Rodriguez'],
        mainCategory: 'math.GT',
        subCategory: 'Topology',
        publishedDate: '15 Jan 2024',
        isBookmarked: false
    }
];

export const TRENDING_TOPICS: TrendingTopic[] = [
    { name: 'Computer Science', count: '2.4k' },
    { name: 'Physics', count: '1.8k' },
    { name: 'Mathematics', count: '1.2k' },
    { name: 'Quant. Biology', count: '850' }
];

export const DASHBOARD_STATS: StatItem[] = [
    { label: 'Days of Service', value: '1,248', trend: '+1', icon: 'calendar_today', color: 'text-blue-600 bg-blue-50' },
    { label: 'Papers Sent', value: '84.2k', trend: '+12%', icon: 'send', color: 'text-purple-600 bg-purple-50' },
    { label: 'Crawled Index', value: '2.4M', trend: '+5.4k', icon: 'travel_explore', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'AI Summaries', value: '12.8k', trend: '+8%', icon: 'auto_awesome', color: 'text-amber-600 bg-amber-50' },
];

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
