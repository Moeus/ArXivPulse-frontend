import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export type Locale = 'en' | 'zh';

interface TranslationPair {
  zh: string;
  en: string;
}

const translations: Record<string, TranslationPair> = {
  // App
  'appName': { zh: 'Daily Cup Paper', en: 'Daily Cup Paper' },
  'switchLang': { zh: '中', en: 'EN' },

  // Landing
  'landingBadge': { zh: '', en: '' },
  'landingTitle': { zh: '一杯咖啡的时间，掌握', en: 'A cup of coffee to master' },
  'landingTitleHighlight': { zh: '全球科研前沿。', en: 'global research frontiers.' },
  'landingDescription': {
    zh: '让科研阅读像晨间咖啡一样轻松、提神。Daily Cup Paper 致力于做您的"数字咖啡师"，每天精准研磨并冲泡最对味的学术精华，让您只需利用碎片化时间即可保持前沿嗅觉。',
    en: 'Making research reading as effortless and refreshing as morning coffee. Daily Cup Paper precisely grinds and brews the essence of academic research, helping you stay ahead during your fragmented time.'
  },
  'landingCta': { zh: '获取每日浓缩', en: 'Get Your Daily Espresso' },

  // Academic Integrity
  'academicIntegrity': { zh: '学术诚信', en: 'Academic Integrity' },
  'reviewProtocol': { zh: '请阅读并接受我们的协议', en: 'Please review and accept our protocol' },
  'warningMisconduct': { zh: '不当行为警告：', en: 'Warning on Misconduct:' },
  'warningMisconductText': {
    zh: '本平台仅供研究发现和辅助使用。明确禁止用户利用AI生成的洞见或摘要进行抄袭、数据造假或任何其他形式的学术不端行为。',
    en: 'This platform is designed strictly for research discovery and assistance. Users are explicitly warned against utilizing AI-generated insights or summaries for plagiarism, data fabrication, or any other form of academic dishonesty.'
  },
  'disclaimer': { zh: '免责声明：', en: 'Disclaimer:' },
  'disclaimerText': {
    zh: 'Daily Cup Paper 及其运营方不对因将本平台用于不道德学术用途而产生的任何后果承担责任。',
    en: 'Daily Cup Paper and its operators disclaim all liability for any consequences arising from the misuse of this platform for unethical academic purposes.'
  },
  'agreeProtocol': { zh: '我已阅读并同意学术诚信协议', en: 'I have read and agree to the Academic Integrity Protocol' },

  // Domain groups
  'computerScience': { zh: '计算机科学', en: 'Computer Science' },
  'physics': { zh: '物理学', en: 'Physics' },
  'statistics': { zh: '统计学', en: 'Statistics' },
  'quantitativeBiology': { zh: '定量生物学', en: 'Quantitative Biology' },

  'artificialIntelligence': { zh: '人工智能', en: 'Artificial Intelligence' },
  'computerVision': { zh: '计算机视觉', en: 'Computer Vision' },
  'machineLearning': { zh: '机器学习', en: 'Machine Learning' },
  'computationAndLanguage': { zh: '计算与语言学', en: 'Computation and Language' },

  'quantumPhysics': { zh: '量子物理学', en: 'Quantum Physics' },
  'atomicPhysics': { zh: '原子物理学', en: 'Atomic Physics' },
  'optics': { zh: '光学', en: 'Optics' },

  'applications': { zh: '应用统计学', en: 'Applications Statistics' },
  'methodology': { zh: '统计方法论', en: 'Methodology' },

  'genomics': { zh: '基因组学', en: 'Genomics' },
  'neuronsAndCognition': { zh: '神经元与认知', en: 'Neurons and Cognition' },

  // Navigation
  'navHome': { zh: '首页', en: 'Home' },
  'navExplore': { zh: '发现', en: 'Explore' },
  'navLibrary': { zh: '文库', en: 'Library' },
  'navAccount': { zh: '账户', en: 'Account' },
  'navSaved': { zh: '已收藏', en: 'Saved' },
  'navProfile': { zh: '我的', en: 'Profile' },
  'logout': { zh: '退出登录', en: 'Logout' },
  'user': { zh: '用户', en: 'User' },

  // Auth
  'back': { zh: '返回', en: 'Back' },
  'loginTitle': { zh: '登录账号', en: 'Sign In' },
  'loginSubtitle': { zh: '欢迎回来！请登录您的账号', en: 'Welcome back! Sign in to continue' },
  'authAccountPlaceholder': { zh: '邮箱或用户名', en: 'Email or username' },
  'authPasswordPlaceholder': { zh: '密码', en: 'Password' },
  'authForgotPassword': { zh: '忘记密码？', en: 'Forgot Password?' },
  'loginBtn': { zh: '登录', en: 'Sign In' },
  'authNoAccount': { zh: '还没有账号？', en: "Don't have an account?" },
  'authGoRegister': { zh: '立即注册', en: 'Register Now' },
  'authRegisterTitle': { zh: '创建账号', en: 'Create Account' },
  'authRegisterSubtitle': { zh: '加入 Daily Cup Paper', en: 'Join Daily Cup Paper' },
  'authEmailPlaceholder': { zh: '邮箱地址', en: 'Email address' },
  'authUsernamePlaceholder': { zh: '设置用户名', en: 'Username' },
  'authCodePlaceholder': { zh: '验证码', en: 'Verification code' },
  'authSendCode': { zh: '发送验证码', en: 'Send Code' },
  'authSetPassword': { zh: '设置密码', en: 'Set password' },
  'authConfirmPassword': { zh: '确认密码', en: 'Confirm password' },
  'authRegisterBtn': { zh: '注册', en: 'Register' },
  'authHasAccount': { zh: '已有账号？', en: 'Already have an account?' },
  'authGoLogin': { zh: '立即登录', en: 'Sign In' },
  'authForgotTitle': { zh: '重置密码', en: 'Reset Password' },
  'authForgotSubtitle': { zh: '输入邮箱获取验证码', en: 'Enter your email to receive a code' },
  'authNewPassword': { zh: '新密码', en: 'New password' },
  'authResetBtn': { zh: '重置密码', en: 'Reset Password' },
  'authBackToLogin': { zh: '返回登录', en: 'Back to Login' },
  'authFillAllFields': { zh: '请填写所有字段', en: 'Please fill in all fields' },
  'authEnterEmail': { zh: '请输入邮箱地址', en: 'Please enter your email' },
  'authCodeSent': { zh: '验证码已发送！', en: 'Verification code sent!' },
  'authCodeFailed': { zh: '验证码发送失败', en: 'Failed to send code' },
  'authPasswordMismatch': { zh: '两次密码输入不一致', en: 'Passwords do not match' },
  'authPasswordTooShort': { zh: '密码至少6位', en: 'Password must be at least 6 characters' },
  'authRegisterFailed': { zh: '注册失败，请重试', en: 'Registration failed, please try again' },
  'authResetFailed': { zh: '重置失败，请重试', en: 'Reset failed, please try again' },

  // Dashboard
  'systemStatus': { zh: '系统状态', en: 'System Status' },
  'systemStatusDesc': { zh: '平台运营数据总览', en: 'Platform operations overview' },
  'weeklyIndexingPulse': { zh: '周索引脉冲', en: 'Weekly Indexing Pulse' },
  'dailyAverage': { zh: '日均索引量', en: 'Daily Average' },
  'categoryDistribution': { zh: '分类分布', en: 'Category Distribution' },
  'topActiveFields': { zh: '最活跃领域', en: 'Top Active Fields' },
  'daysOfService': { zh: '服务天数', en: 'Days of Service' },
  'papersSent': { zh: '已推送论文', en: 'Papers Sent' },
  'crawledIndex': { zh: '爬取索引量', en: 'Crawled Index' },
  'aiSummaries': { zh: 'AI摘要数', en: 'AI Summaries' },

  // Library
  'savedResearch': { zh: '已收藏论文', en: 'Saved Research' },
  'savedResearchDesc': { zh: '您收藏的论文都在这里', en: 'Your bookmarked papers' },
  'libraryEmpty': { zh: '暂无收藏', en: 'No saved papers yet' },
  'goDiscover': { zh: '去发现', en: 'Explore Papers' },

  // Explore
  'discoveryFeed': { zh: '发现推送', en: 'Discovery Feed' },
  'browsingGlobal': { zh: '浏览全部论文', en: 'Browsing all papers' },
  'browsingFiltered': { zh: '浏览 {filter}', en: 'Browsing {filter}' },
  'filterPlaceholder': { zh: '搜索论文...', en: 'Search papers...' },
  'noResearchMatch': { zh: '没有匹配的论文', en: 'No papers match your search' },
  'reset': { zh: '重置', en: 'Reset' },

  // PaperCard & FeaturedPaper
  'geminiAiInsights': { zh: 'AI 解读', en: 'AI Insights' },
  'analyzingResearch': { zh: '正在分析论文...', en: 'Analyzing research...' },
  'hide': { zh: '收起', en: 'Hide' },
  'explain': { zh: '让 AI 解读', en: 'Explain with AI' },
  'featuredResearch': { zh: '精选论文', en: 'Featured Research' },
  'readAbstract': { zh: '阅读摘要', en: 'Read Abstract' },
  'save': { zh: '收藏', en: 'Save' },
  'saved': { zh: '已收藏', en: 'Saved' },

  // PaperDetail
  'viewOnArxiv': { zh: '在 ArXiv 查看', en: 'View on ArXiv' },
  'publishedOn': { zh: '发布于', en: 'Published on' },
  'abstract': { zh: '摘要', en: 'Abstract' },
  'openAiChat': { zh: '打开 AI 助手', en: 'Open AI Chat' },
  'aiAssistant': { zh: 'AI 助手', en: 'AI Assistant' },
  'askQuestion': { zh: '问我任何关于这篇论文的问题...', en: 'Ask me anything about this paper...' },

  // Account
  'Configure': { zh: '配置您的Daily Cup Paper', en: 'Configure your daily cup paper' },
  'ConfigureDesc': { zh: '订阅您感兴趣的领域，每天获取个性化论文推荐', en: 'Subscribe to topics you care about and get daily personalized paper recommendations' },
  'StartConfiguration': { zh: '开始配置', en: 'Start configuration' },
  'researcher': { zh: '研究者', en: 'Researcher' },
  'activeSubscription': { zh: '活跃订阅', en: 'Active Subscription' },
  'frequency': { zh: '推送频率', en: 'Frequency' },
  'since': { zh: '订阅时间', en: 'Since' },
  'activeDomains': { zh: '活跃领域', en: 'Active Domains' },
  'manageSubscription': { zh: '管理订阅', en: 'Manage Subscription' },
  'updatePreferences': { zh: '更新偏好', en: 'Update Preferences' },
  'cancelSubscription': { zh: '取消订阅', en: 'Cancel Subscription' },
  'cancelSubscriptionConfirm': { zh: '确定要取消订阅吗？', en: 'Are you sure you want to cancel?' },
  'confirmCancel': { zh: '确认取消', en: 'Confirm Cancel' },
  'keepSubscription': { zh: '保留订阅', en: 'Keep Subscription' },
  'editSubscription': { zh: '编辑订阅', en: 'Edit Subscription' },
  'cancel': { zh: '取消', en: 'Cancel' },
  'researchDomains': { zh: '研究领域', en: 'Research Domains' },
  'selectTopics': { zh: '选择您感兴趣的主题', en: "Select topics you're interested in" },
  'topicsAvailable': { zh: '个可用主题', en: 'topics available' },
  'selected': { zh: '已选择', en: 'Selected' },
  'deliverySchedule': { zh: '推送计划', en: 'Delivery Schedule' },
  'chooseFrequency': { zh: '选择推送频率', en: 'Choose delivery frequency' },
  'daily': { zh: '每日', en: 'Daily' },
  'everyMorning8': { zh: '每天早上8点', en: 'Every morning at 8' },
  'weekly': { zh: '每周', en: 'Weekly' },
  'everyMondayMorning': { zh: '每周一早上', en: 'Every Monday morning' },
  'saveSubscription': { zh: '保存订阅', en: 'Save Subscription' },

  // CategoryGrid
  'exploreByDomain': { zh: '按领域探索', en: 'Explore by Domain' },
  'clearSelection': { zh: '清除选择', en: 'Clear Selection' },
  'categoryAiCs': { zh: 'AI/计算机', en: 'AI/CS' },
  'categoryPhysics': { zh: '物理学', en: 'Physics' },
  'categoryMath': { zh: '数学', en: 'Math' },
  'categoryBiology': { zh: '生物学', en: 'Biology' },
};

export const resources = {
  zh: { translation: {} as Record<string, string> },
  en: { translation: {} as Record<string, string> },
};

Object.entries(translations).forEach(([key, { zh, en }]) => {
  resources.zh.translation[key] = zh;
  resources.en.translation[key] = en;
});

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;