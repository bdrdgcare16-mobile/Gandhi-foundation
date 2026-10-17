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
// Photo sets shown in the lightbox when a gallery tile is opened.
// Keyed by the tile's tag; tiles without an entry stay static.
export const galleryPhotos = {
  Education: [
    ['/assets/education-workshop.jpg', 'Learning and community participation'],
  ],
  Women: [
    ['/assets/women-1.jpg', 'Leprosy awareness campaign banner'],
    ['/assets/women-2.jpg', 'Awareness march through the town'],
    ['/assets/women-3.jpg', 'Equipment demonstration for participants'],
    ['/assets/women-4.jpg', 'Awareness session with women participants'],
    ['/assets/women-5.jpg', 'Hands-on skills training'],
  ],
  Health: [
    ['/assets/health-1.jpg', 'Pulse polio booth at the municipality'],
    ['/assets/health-2.jpg', 'Polio immunisation camp'],
    ['/assets/health-3.jpg', 'Leprosy awareness rally'],
    ['/assets/health-4.jpg', 'Community health awareness session'],
  ],
  'Medical Camp': [
    ['/assets/medical-1.jpg', 'Leprosy awareness march'],
    ['/assets/medical-2.jpg', 'Outreach at Siva Shakthi Hospital'],
    ['/assets/medical-3.jpg', 'Nursing students on camp duty'],
    ['/assets/medical-4.jpg', 'Candlelight awareness ceremony'],
  ],
  Community: [
    ['/assets/community-1.jpg', 'Handover ceremony at the Foundation office'],
    ['/assets/community-2.jpg', 'Classroom session in progress'],
    ['/assets/community-3.jpg', 'Students felicitating a guest'],
  ],
  Wellbeing: [
    ['/assets/wellbeing-1.jpg', 'Students with their tutor'],
    ['/assets/wellbeing-2.jpg', 'Community event with local officers'],
    ['/assets/wellbeing-3.jpg', 'Visit to the Government Hospital'],
    ['/assets/wellbeing-4.jpg', 'Certificate presentation'],
  ],
};
