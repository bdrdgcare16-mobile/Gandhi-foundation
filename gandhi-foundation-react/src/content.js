import { BookOpen, HeartPulse, Leaf, Users, GraduationCap, Handshake } from 'lucide-react';

export const programs = [
  { icon: Users, title: 'Women in Development', text: 'Leadership, communication, self-help groups, counselling, skill development and support for greater participation in community institutions.' },
  { icon: HeartPulse, title: 'Community Health', text: 'Health awareness, medical camps and community-based initiatives focused on maternal, child and adolescent health.' },
  { icon: BookOpen, title: 'Education & Child Development', text: 'Learning opportunities, tuition, learning kits, exposure and value-based development for rural and economically vulnerable children.' },
  { icon: GraduationCap, title: 'Youth & Vocational Skills', text: 'Skill training, career orientation and pathways that strengthen confidence, employability and community leadership among young people.' },
  { icon: Handshake, title: 'Village Institution Program', text: 'Community platforms that encourage cooperation, transparency, equity and greater local responsibility for village development.' },
  { icon: Leaf, title: 'Environment & Rural Support', text: 'Tree plantation, environmental awareness, forest-rights awareness and coordination for agricultural and village welfare support.' },
];

// [figure, full description (Impact page), short label (home roadmap)]
export const impact = [
  ['232', 'Self-help groups promoted with capacity-building support', 'Self-help groups promoted'],
  ['236', 'Women and girls identified for vocational tailoring training', 'Women trained in tailoring'],
  ['278', 'Women benefited from free group and individual counselling sessions', 'Women supported by counselling'],
  ['150', 'Young students reported as benefiting from education support', 'Students supported in education'],
  ['8', 'Villages referenced in historical tree-plantation activities', 'Villages in plantation drives'],
];

export const documents = [
  ['Tax Registration', '12A Registration', '/documents/12A.pdf'],
  ['Donor Eligibility', '80G Approval', '/documents/80G.pdf'],
  ['Annual Reporting', 'Annual Report 2019–2020', '/documents/annual-report-2019-2020.pdf'],
  ['Annual Reporting', 'Annual Report 2020–2021', '/documents/annual-report-2020-2021.pdf'],
  ['Financial Reporting', 'Audit Report 2018–2019', '/documents/audit-report-2018-2019.pdf'],
  ['Financial Reporting', 'Audit Report 2019–2020', '/documents/audit-report-2019-2020.pdf'],
];

export const gallery = [
  ['/assets/education-workshop.jpg', 'Education', 'Learning and community participation'],
  ['/assets/women-development.jpg', 'Women', 'Awareness and development initiatives'],
  ['/assets/health-awareness.jpg', 'Health', 'Public health awareness'],
  ['/assets/medical-support.jpg', 'Medical Camp', 'Care closer to communities'],
  ['/assets/community-session.jpg', 'Community', 'Participation and local action'],
  ['/assets/health-camp.jpg', 'Wellbeing', 'Community health initiatives'],
];