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
  'signIn': { zh: '登录', en: 'Sign In' },
  'landingBadge': { zh: '每日学术精磨', en: 'Daily Academic Brew' },
  'landingTitle': { zh: '一杯咖啡的时间，掌握', en: 'A cup of coffee to master' },
  'landingTitleHighlight': { zh: '全球科研前沿。', en: 'global research frontiers.' },
  'landingDescription': {
    zh: '让科研阅读像晨间咖啡一样轻松、提神。Daily Cup Paper 致力于做您的"数字咖啡师"，每天精准研磨并冲泡最对味的学术精华，让您只需利用碎片化时间即可保持前沿嗅觉。',
    en: 'Making research reading as effortless and refreshing as morning coffee. Daily Cup Paper is your digital barista — precisely grinding and brewing the finest academic essence, keeping you at the frontier during fragmented moments.'
  },
  'landingCta': { zh: '☕ 冲泡今日文献', en: '☕ Brew Today\'s Papers' },
  'landingBrewDesc': {
    zh: '像品鉴咖啡一样，轻松滑动浏览今日精选学术论文',
    en: 'Swipe through today\'s curated research — like tasting notes for academia'
  },
  'landingFeaturesTitle': { zh: '为什么选择 Daily Cup Paper？', en: 'Why Daily Cup Paper?' },
  'landingFeaturesDesc': {
    zh: '我们精心打磨每一个细节，让学术阅读成为一种享受',
    en: 'Every detail is carefully crafted to make academic reading a delightful ritual'
  },
  'featureBrewTitle': { zh: '今日特调', en: 'Daily Brew' },
  'featureBrewDesc': {
    zh: '每天从海量 arXiv 论文中精选最具价值的文献，像一杯精心特调的手冲咖啡',
    en: 'Hand-picked from thousands of arXiv papers daily — like a carefully crafted pour-over'
  },
  'featureAiTitle': { zh: 'AI 滴漏萃取', en: 'AI Drip Extraction' },
  'featureAiDesc': {
    zh: 'Gemini AI 为每篇论文提供深度解读，让复杂研究的精华在三分钟内被你吸收',
    en: 'Gemini AI distills complex research into digestible essence — absorbed in minutes'
  },
  'featureDeliveryTitle': { zh: '晨间推送', en: 'Morning Delivery' },
  'featureDeliveryDesc': {
    zh: '个性化订阅您关注的领域，每天清晨准时送达，像一份温热的学术早报',
    en: 'Subscribe to your domains — delivered fresh every morning like a warm academic gazette'
  },
  'landingBottomBadge': { zh: '开始您的学术咖啡之旅', en: 'Start Your Academic Coffee Journey' },
  'landingBottomTitle': { zh: '让科研阅读，成为每天的仪式感', en: 'Make research reading your daily ritual' },
  'landingBottomDesc': {
    zh: '加入 Daily Cup Paper，每天只需一杯咖啡的时间，便能掌握最前沿的学术动态',
    en: 'Join Daily Cup Paper — stay at the frontier of knowledge with just a cup of coffee\'s time'
  },
  'landingFooterSlogan': { zh: '書卷氣與咖啡香', en: 'Where scholars meet coffee' },
  'landingFooterRights': { zh: '保留所有权利', en: 'All rights reserved.' },

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
  'loginTitle': { zh: '欢迎回来', en: 'Welcome Back' },
  'loginSubtitle': { zh: '登录您的账号，继续您的学术咖啡之旅', en: 'Sign in to continue your academic coffee journey' },
  'authAccountPlaceholder': { zh: '邮箱或用户名', en: 'Email or username' },
  'authPasswordPlaceholder': { zh: '密码', en: 'Password' },
  'authForgotPassword': { zh: '忘记密码？', en: 'Forgot Password?' },
  'loginBtn': { zh: '登录', en: 'Sign In' },
  'loginFailed': { zh: '登录失败', en: 'Login failed' },
  'authNoAccount': { zh: '还没有账号？', en: "Don't have an account?" },
  'authGoRegister': { zh: '立即注册', en: 'Register Now' },
  'authRegisterTitle': { zh: '加入我们', en: 'Join Us' },
  'authRegisterSubtitle': { zh: '创建账号，开启 Daily Cup Paper 之旅', en: 'Create an account to start your Daily Cup Paper journey' },
  'authEmailPlaceholder': { zh: '邮箱地址', en: 'Email address' },
  'authUsernamePlaceholder': { zh: '设置用户名', en: 'Username' },
  'authCodePlaceholder': { zh: '验证码', en: 'Verification code' },
  'authSendCode': { zh: '发送', en: 'Send' },
  'authSetPassword': { zh: '设置密码', en: 'Set password' },
  'authConfirmPassword': { zh: '确认密码', en: 'Confirm password' },
  'authRegisterBtn': { zh: '注册', en: 'Register' },
  'authHasAccount': { zh: '已有账号？', en: 'Already have an account?' },
  'authGoLogin': { zh: '立即登录', en: 'Sign In' },
  'authForgotTitle': { zh: '重置密码', en: 'Reset Password' },
  'authForgotSubtitle': { zh: '输入邮箱获取验证码', en: 'Enter your email to receive a reset code' },
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
  'systemStatus': { zh: '研磨数据', en: 'Brewing Stats' },
  'systemStatusDesc': { zh: '平台运营数据总览', en: 'Platform brewing overview' },
  'weeklyIndexingPulse': { zh: '周活跃脉冲', en: 'Weekly Brewing Pulse' },
  'dailyAverage': { zh: '日均研磨量', en: 'Daily Grind Average' },
  'categoryDistribution': { zh: '风味分布', en: 'Flavor Distribution' },
  'topActiveFields': { zh: '热门风味', en: 'Top Flavors' },
  'daysOfService': { zh: '研磨天数', en: 'Days Brewing' },
  'papersSent': { zh: '已推送论文', en: 'Papers Served' },
  'crawledIndex': { zh: '爬取索引量', en: 'Beans Sourced' },
  'aiSummaries': { zh: 'AI萃取数', en: 'AI Extractions' },

  // Library
  'savedResearch': { zh: '我的书架', en: 'My Bookshelf' },
  'savedResearchDesc': { zh: '您收藏的论文都在这里，随时品读', en: 'Your bookmarked papers, ready to revisit anytime' },
  'libraryEmpty': { zh: '书架空空如也', en: 'Your bookshelf is empty' },
  'goDiscover': { zh: '去发现好文', en: 'Discover Papers' },

  // Explore
  'discoveryFeed': { zh: '今日特调', en: 'Today\'s Brew' },
  'browsingGlobal': { zh: '浏览全部论文', en: 'Browsing all papers' },
  'browsingFiltered': { zh: '浏览 {filter}', en: 'Browsing {filter}' },
  'filterPlaceholder': { zh: '搜索论文…', en: 'Search papers…' },
  'noResearchMatch': { zh: '没有匹配的论文', en: 'No papers match your search' },
  'reset': { zh: '重置', en: 'Reset' },

  // PaperCard & FeaturedPaper
  'geminiAiInsights': { zh: 'AI 萃取解读', en: 'AI Insights' },
  'analyzingResearch': { zh: '正在滴漏萃取洞见…', en: 'Drip-extracting insights…' },
  'hide': { zh: '收起', en: 'Hide' },
  'explain': { zh: 'AI 解读', en: 'AI Explain' },
  'featuredResearch': { zh: '☕ 今日精选', en: '☕ Featured Pick' },
  'readAbstract': { zh: '品读摘要', en: 'Read Abstract' },
  'save': { zh: '收藏', en: 'Save' },
  'saved': { zh: '已收藏', en: 'Saved' },
  'readTime': { zh: '阅读时间', en: 'Read Time' },

  // PaperDetail
  'viewOnArxiv': { zh: '在 ArXiv 查看', en: 'View on ArXiv' },
  'publishedOn': { zh: '发布于', en: 'Published on' },
  'abstract': { zh: '摘要', en: 'Abstract' },
  'openAiChat': { zh: '打开 AI 助手', en: 'Open AI Chat' },
  'aiAssistant': { zh: 'AI 品鉴师', en: 'AI Sommelier' },
  'askQuestion': { zh: '问我任何关于这篇论文的问题…', en: 'Ask me anything about this paper…' },

  // Account
  'Configure': { zh: '配置您的 Daily Cup Paper', en: 'Configure Your Daily Cup' },
  'ConfigureDesc': { zh: '订阅您感兴趣的领域，每天获取个性化的学术特调', en: 'Subscribe to domains you care about — get your daily academic brew personalized' },
  'StartConfiguration': { zh: '开始配置', en: 'Start Brewing' },
  'researcher': { zh: '研究者', en: 'Researcher' },
  'activeSubscription': { zh: '订阅中', en: 'Brewing Active' },
  'frequency': { zh: '推送频率', en: 'Brew Frequency' },
  'since': { zh: '订阅时间', en: 'Since' },
  'activeDomains': { zh: '订阅风味', en: 'Active Flavors' },
  'manageSubscription': { zh: '管理订阅', en: 'Manage Subscription' },
  'updatePreferences': { zh: '调整口味', en: 'Adjust Flavor' },
  'cancelSubscription': { zh: '取消订阅', en: 'Cancel Subscription' },
  'cancelSubscriptionConfirm': { zh: '确定要取消订阅吗？', en: 'Sure you want to stop the brew?' },
  'confirmCancel': { zh: '确认取消', en: 'Confirm Cancel' },
  'keepSubscription': { zh: '继续研磨', en: 'Keep Brewing' },
  'editSubscription': { zh: '调整订阅', en: 'Adjust Subscription' },
  'cancel': { zh: '取消', en: 'Cancel' },
  'researchDomains': { zh: '研究领域', en: 'Research Domains' },
  'selectTopics': { zh: '选择您关注的学科方向', en: "Select domains you're interested in" },
  'topicsAvailable': { zh: '个可选', en: 'available' },
  'selected': { zh: '已选择', en: 'Selected' },
  'deliverySchedule': { zh: '推送计划', en: 'Delivery Schedule' },
  'chooseFrequency': { zh: '选择推送频率', en: 'Choose brew frequency' },
  'daily': { zh: '每日研磨', en: 'Daily Brew' },
  'everyMorning8': { zh: '每天早上 8:00', en: 'Every morning at 8 AM' },
  'weekly': { zh: '每周特调', en: 'Weekly Blend' },
  'everyMondayMorning': { zh: '每周一早上', en: 'Every Monday morning' },
  'saveSubscription': { zh: '保存订阅', en: 'Save & Brew' },

  // CategoryGrid
  'exploreByDomain': { zh: '按领域探索', en: 'Explore by Domain' },
  'clearSelection': { zh: '清除选择', en: 'Clear' },
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