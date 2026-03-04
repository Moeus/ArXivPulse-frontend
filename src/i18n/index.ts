import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export type Locale = 'en' | 'zh';

const translations: Record<string, [string, string]> = {
  // Common
  'appName': ['ArXivPulse', 'ArXivPulse'],
  'back': ['返回', 'Back'],
  'reset': ['重置', 'Reset'],
  'cancel': ['取消', 'Cancel'],
  'save': ['保存', 'Save'],
  'logout': ['退出登录', 'Logout'],
  'signIn': ['登录', 'Sign In'],
  'user': ['用户', 'User'],

  // Landing
  'landingBadge': ['AI驱动的科研情报平台', 'AI-Powered Research Intelligence'],
  'landingTitle': ['探索人类知识的', 'Decode the frontiers of '],
  'landingTitleHighlight': ['最前沿。', 'human knowledge.'],
  'landingDescription': [
    'ArXivPulse 将海量预印本论文流转化为个性化、AI智能摘要的信息流，专为现代研究者打造。',
    'ArXivPulse transforms the overwhelming flow of pre-prints into a personalized, AI-synthesized feed designed for the modern researcher.'
  ],
  'landingCta': ['开始探索', 'Start Your Pulse'],

  // Sidebar Nav
  'navHome': ['首页', 'Home'],
  'navExplore': ['探索', 'Explore'],
  'navLibrary': ['收藏库', 'Library'],
  'navAccount': ['账户', 'Account'],
  'navSaved': ['收藏', 'Saved'],
  'navProfile': ['个人资料', 'Profile'],
  'trending': ['趋势', 'Trending'],

  // Dashboard
  'systemStatus': ['系统状态', 'System Status'],
  'systemStatusDesc': ['ArXivPulse 正在监控和索引全球科研动态。', 'ArXivPulse is monitoring and indexing the global research pulse.'],
  'weeklyIndexingPulse': ['每周索引趋势', 'Weekly Indexing Pulse'],
  'dailyAverage': ['日均索引量：512篇论文', 'Daily average: 512 papers'],
  'categoryDistribution': ['分类分布', 'Category Distribution'],
  'topActiveFields': ['最活跃领域', 'Top active fields'],
  'recentPlatformEvents': ['近期平台事件', 'Recent Platform Events'],
  'event1Time': ['2分钟前', '2m ago'],
  'event1Text': ['cs.LG 新索引 24 篇论文', '24 new papers indexed in cs.LG'],
  'event2Time': ['1小时前', '1h ago'],
  'event2Text': ['Gemini AI 生成了 45 篇研究摘要', 'Gemini AI generated 45 research summaries'],
  'event3Time': ['3小时前', '3h ago'],
  'event3Text': ['物理学每周趋势分析已完成', 'Weekly trend analysis completed for Physics'],

  // Explore
  'featuredResearch': ['精选论文', 'Featured Research'],
  'readAbstract': ['阅读摘要', 'Read Abstract'],
  'saved': ['已收藏', 'Saved'],
  'exploreByDomain': ['按领域探索', 'Explore by Domain'],
  'clearSelection': ['清除选择', 'Clear Selection'],
  'discoveryFeed': ['发现动态', 'Discovery Feed'],
  'browsingGlobal': ['浏览全球研究论文', 'Browsing global research papers'],
  'browsingFiltered': ['浏览 {filter} 类研究论文', 'Browsing {filter} research papers'],
  'filterPlaceholder': ['搜索论文...', 'Filter these papers...'],
  'noResearchMatch': ['没有匹配您查询的研究论文。', 'No research matches your specific query.'],
  'categoryAiCs': ['AI 与计算机', 'AI & CS'],
  'categoryPhysics': ['物理学', 'Physics'],
  'categoryMath': ['数学', 'Math'],
  'categoryBiology': ['生物学', 'Biology'],

  // PaperCard
  'geminiAiInsights': ['Gemini AI 洞见', 'Gemini AI Insights'],
  'analyzingResearch': ['正在分析论文...', 'Analyzing research...'],
  'hide': ['隐藏', 'Hide'],
  'explain': ['解读', 'Explain'],

  // PaperDetail
  'publishedOn': ['发表于', 'Published on'],
  'abstract': ['摘要', 'Abstract'],
  'aiAssistant': ['AI 助手', 'AI Assistant'],
  'askQuestion': ['向我提问...', 'Ask a question...'],
  'openAiChat': ['打开 AI 助手', 'Open AI Assistant'],
  'viewOnArxiv': ['在 arXiv 查看', 'View on arXiv'],

  // Library (in App.tsx)
  'savedResearch': ['收藏的研究', 'Saved Research'],
  'savedResearchDesc': ['您的科研知识精选收藏。', 'Your personal collection of groundbreaking knowledge.'],
  'libraryEmpty': ['您的收藏库目前为空。', 'Your library is currently empty.'],
  'goDiscover': ['去发现', 'Go Discover'],

  // Account
  'yourResearchPulse': ['您的科研脉搏', 'Your Research Pulse'],
  'yourResearchPulseDesc': [
    '定制您的个性化科研信息流。选择您关注的领域，我们会将最新预印本直接送达您的邮箱。',
    'Curate your personalized research feed. Select the domains that matter to you and we\'ll deliver the latest pre-prints directly to your inbox.'
  ],
  'configurePulse': ['配置您的脉搏', 'Configure Your Pulse'],
  'accountPreferences': ['账户偏好设置', 'Account Preferences'],
  'signedInAs': ['已登录为', 'Signed in as'],
  'activeDomains': ['活跃领域', 'Active Domains'],
  'frequency': ['频率', 'Frequency'],
  'activeSubscription': ['订阅中', 'Active'],
  'since': ['订阅于', 'Since'],
  'manageSubscription': ['管理订阅', 'Manage Subscription'],
  'researcher': ['研究者', 'Researcher'],
  'updatePreferences': ['更新偏好设置', 'Update Preferences'],
  'researchDomains': ['研究领域', 'Research Domains'],
  'selectTopics': ['选择您想关注的主题', 'Select the topics you want to follow'],
  'topicsAvailable': ['个可选主题', 'topics available'],
  'selected': ['已选', 'selected'],
  'deliverySchedule': ['推送计划', 'Delivery Schedule'],
  'chooseFrequency': ['选择接收更新的频率', 'Choose how often you receive updates'],
  'daily': ['每天', 'Daily'],
  'weekly': ['每周', 'Weekly'],
  'everyMorning8': ['每天早上8点', 'Every morning at 8 AM'],
  'everyMondayMorning': ['每周一早上', 'Every Monday morning'],
  'academicIntegrity': ['学术诚信', 'Academic Integrity'],
  'reviewProtocol': ['请阅读并接受我们的协议', 'Please review and accept our protocol'],
  'warningMisconduct': ['不当行为警告：', 'Warning on Misconduct:'],
  'warningMisconductText': [
    '本平台仅供研究发现和辅助使用。明确禁止用户利用AI生成的洞见或摘要进行抄袭、数据造假或任何其他形式的学术不端行为。',
    'This platform is designed strictly for research discovery and assistance. Users are explicitly warned against utilizing AI-generated insights or summaries for plagiarism, data fabrication, or any other form of academic dishonesty.'
  ],
  'disclaimer': ['免责声明：', 'Disclaimer:'],
  'disclaimerText': [
    'ArXivPulse 及其运营方不对因将本平台用于不道德学术用途而产生的任何后果承担责任。',
    'ArXivPulse and its operators disclaim all liability for any consequences arising from the misuse of this platform for unethical academic purposes.'
  ],
  'agreeProtocol': ['我已阅读并同意学术诚信协议', 'I have read and agree to the Academic Integrity Protocol'],
  'subscriptionSummary': ['订阅摘要', 'Subscription Summary'],
  'selectedTopics': ['已选主题', 'Selected Topics'],
  'more': ['更多', 'more'],
  'noTopicsSelected': ['未选择主题', 'No topics selected'],
  'delivery': ['推送方式', 'Delivery'],
  'readyToSubscribe': ['可以订阅了！', 'Ready to subscribe!'],
  'agreeToProtocol': ['请先同意协议以继续', 'Agree to protocol to continue'],
  'selectAtLeastOneTopic': ['请至少选择一个主题', 'Select at least one topic'],
  'saveSubscription': ['保存订阅', 'Save Subscription'],
  'cancelSubscription': ['取消订阅', 'Cancel Subscription'],
  'cancelSubscriptionConfirm': ['确定要取消订阅吗？此操作无法撤销。', 'Are you sure you want to cancel? This cannot be undone.'],
  'confirmCancel': ['确认取消', 'Confirm Cancel'],
  'keepSubscription': ['保留订阅', 'Keep Subscription'],
  'editSubscription': ['编辑订阅', 'Edit Subscription'],

  // Domain groups
  'computerScience': ['计算机科学', 'Computer Science'],
  'physics': ['物理学', 'Physics'],
  'statistics': ['统计学', 'Statistics'],
  'quantitativeBiology': ['定量生物学', 'Quantitative Biology'],

  'artificialIntelligence': ['人工智能', 'Artificial Intelligence'],
  'computerVision': ['计算机视觉', 'Computer Vision'],
  'machineLearning': ['机器学习', 'Machine Learning'],
  'computationAndLanguage': ['计算与语言学', 'Computation and Language'],

  'quantumPhysics': ['量子物理学', 'Quantum Physics'],
  'atomicPhysics': ['原子物理学', 'Atomic Physics'],
  'optics': ['光学', 'Optics'],

  'applications': ['应用统计学', 'Applications Statistics'],
  'methodology': ['统计方法论', 'Methodology'],

  'genomics': ['基因组学', 'Genomics'],
  'neuronsAndCognition': ['神经元与认知', 'Neurons and Cognition'],

  // Language
  'switchLang': ['中', 'EN'],
};

export const resources = {
  zh: { translation: {} as Record<string, string> },
  en: { translation: {} as Record<string, string> },
};

Object.entries(translations).forEach(([key, [zh, en]]) => {
  resources.zh.translation[key] = zh;
  resources.en.translation[key] = en;
});

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Set English as default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
