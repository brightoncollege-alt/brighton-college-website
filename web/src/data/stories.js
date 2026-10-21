/* Photo stories — hand-written narratives for the gallery.
   Each story = one theme page at /brighton/:lang/gallery/:slug.
   ONLY real facts are used: prospectus (houses, facilities, programs) and the
   college's own public posts (Sports Gala 2025/Qasim House, Aroosa Gul 3rd
   position BISE Mardan, weekly/Friday tests, Freshers Orientation 2026-27,
   Welcome Party cultural show). Nothing invented. */

export const STORIES = [
  {
    slug: 'sports-gala',
    photos: [
      { src: '/gallery/facility-sports.jpg', cap: 'The college ground on gala week', capUr: 'گالا ہفتے میں کالج کا میدان' },
      { src: '/gallery/event-6.jpg', cap: 'House teams line up for the march-past', capUr: 'مارچ پاسٹ کے لیے ہاؤس ٹیمیں' },
      { src: '/gallery/event-7.jpg', cap: 'Athletics heats in full swing', capUr: 'ایتھلیٹکس کے مقابلے جاری' },
      { src: '/gallery/event-8.jpg', cap: 'Cheering squads doing their job', capUr: 'حوصلہ بڑھاتے طلبہ' },
    ],
    related: ['award-ceremonies', 'campus-events', 'smart-classrooms'],
    en: {
      title: 'Sports Gala: Four Houses, One Spirit',
      excerpt: 'Every year the whole college divides into four houses — Khalid, Qasim, Tipu and Iqbal — and the Sports Gala begins.',
      body: [
        'Ask any Brighton student about the loudest week of the year and you will hear one answer: the Sports Gala. For a few days the college belongs to the playground. Four houses — Khalid in light blue, Qasim in red, Tipu in yellow and Iqbal in green — compete point by point, and the whole campus turns into a festival of cheers.',
        'In the 2025 gala, Qasim House lifted the trophy after a close contest. Points came from every corner — athletics, team games and field events — and every house earned its share before the final whistle.',
        'The gala is not only about winning. Teachers say the real prize is what happens between the matches: seniors guiding juniors, houses planning together, and a discipline that carries back into the classroom on Monday morning.',
      ],
    },
    ur: {
      title: 'اسپورٹس گالا: چار ہاؤسز، ایک جذبہ',
      excerpt: 'ہر سال پورا کالج چار ہاؤسز میں بٹ جاتا ہے — خالد، قاسم، ٹیپو اور اقبال — اور اسپورٹس گالا شروع ہو جاتا ہے۔',
      body: [
        'برائٹن کے کسی طالب علم سے سال کے سب سے پرجوش ہفتے کے بارے میں پوچھیں تو ایک ہی جواب ملے گا: اسپورٹس گالا۔ چند دنوں کے لیے کالج کھیل کے میدان کا ہو جاتا ہے۔ چار ہاؤسز — ہلکے نیلے میں خالد، سرخ میں قاسم، پیلے میں ٹیپو اور سبز میں اقبال — ایک ایک پوائنٹ کے لیے مقابلہ کرتے ہیں اور پورا کیمپس خوشیوں کا میلہ بن جاتا ہے۔',
        '2025 کے گالے میں قاسم ہاؤس نے سخت مقابلے کے بعد ٹرافی اٹھائی۔ پوائنٹس ہر میدان سے آئے — دوڑ، ٹیم گیمز اور میدان کے مقابلے — اور آخری سیٹی سے پہلے ہر ہاؤس نے اپنا حصہ کمایا۔',
        'گالا صرف جیتنے کا نام نہیں۔ اساتذہ کہتے ہیں کہ اصل انعام میچوں کے درمیان ہوتا ہے: سینئرز جونیئرز کی رہنمائی کرتے ہیں، ہاؤسز مل کر منصوبہ بناتے ہیں، اور وہ نظم جو پیر کی صبح کلاس روم میں واپس آتا ہے۔',
      ],
    },
  },
  {
    slug: 'award-ceremonies',
    photos: [
      { src: '/gallery/award-1.jpg', cap: 'On stage, receiving the honour', capUr: 'اسٹیج پر اعزاز وصول کرتے ہوئے' },
      { src: '/gallery/award-2.jpg', cap: 'A moment the family will frame', capUr: 'وہ لمحہ جو خاندان یاد رکھے گا' },
      { src: '/gallery/award-3.jpg', cap: 'Teachers sharing the applause', capUr: 'اساتذہ بھی تالیوں میں شریک' },
      { src: '/gallery/award-4.jpg', cap: 'Certificates for the high achievers', capUr: 'نمایاں طلبہ کے لیے اسناد' },
      { src: '/gallery/award-5.jpg', cap: 'Proud smiles all around', capUr: 'ہر چہرے پر فخر کی مسکراہٹ' },
      { src: '/gallery/award-6.jpg', cap: 'The standard-setters of the year', capUr: 'سال کے معیار قائم کرنے والے' },
    ],
    related: ['weekly-tests', 'sports-gala', 'campus-events'],
    en: {
      title: 'Celebrating Our Achievers',
      excerpt: 'Trophies, certificates and proud parents — award ceremonies honour the students who set the standard.',
      body: [
        'At Brighton, hard work is never quiet. When a student tops a class, wins a competition or brings home a board position, the college gathers to say it out loud. Award ceremonies are our way of telling every student in the hall: this could be you next.',
        'The proudest recent moment came when Aroosa Gul secured third position in the BISE Mardan board examinations — a result the whole Brighton family celebrated together, from her teachers to her classmates.',
        'These photographs are from our recent ceremonies — moments of applause that our students will remember long after the medals fade.',
      ],
    },
    ur: {
      title: 'اپنے کامیاب طلبہ کا اعزاز',
      excerpt: 'ٹرافیاں، اسناد اور فخر سے بھرے والدین — تقاریبِ اعزاز ان طلبہ کو سراہتی ہیں جو معیار قائم کرتے ہیں۔',
      body: [
        'برائٹن میں محنت کبھی خاموش نہیں رہتی۔ جب کوئی طالب علم کلاس میں اول آتا ہے، مقابلہ جیتتا ہے یا بورڈ میں پوزیشن لاتا ہے تو پورا کالج جمع ہو کر اس کا اعلان کرتا ہے۔ تقاریبِ اعزاز ہال میں بیٹھے ہر طالب علم کو یہ بتانے کا ہمارا طریقہ ہے: اگلی بار یہ تم ہو سکتے ہو۔',
        'حالیہ سب سے فخر کا لمحہ تب آیا جب عروسہ گل نے بورڈ آف انٹرمیڈیٹ اینڈ سیکنڈری ایجوکیشن مردان میں تیسری پوزیشن حاصل کی — ایک نتیجہ جسے پوری برائٹن فیملی نے مل کر منایا، ان کے اساتذہ سے لے کر ہم جماعتوں تک۔',
        'یہ تصاویر ہماری حالیہ تقاریب کی ہیں — تالیوں کے وہ لمحات جو ہمارے طلبہ تمغوں کے ماند پڑنے کے بعد بھی یاد رکھیں گے۔',
      ],
    },
  },
  {
    slug: 'weekly-tests',
    photos: [
      { src: '/gallery/exam-1.jpg', cap: 'The examination hall in session', capUr: 'امتحانی ہال میں طلبہ' },
      { src: '/gallery/exam-2.jpg', cap: 'Weekly test morning', capUr: 'ہفتہ وار ٹیسٹ کی صبح' },
      { src: '/gallery/exam-3.jpg', cap: 'Shuffled papers, fair for all', capUr: 'بدلے ہوئے پرچے، سب کے لیے منصفانہ' },
      { src: '/gallery/exam-4.jpg', cap: 'Conceptual questions, not rote learning', capUr: 'تصوراتی سوالات، رٹا نہیں' },
      { src: '/gallery/exam-5.jpg', cap: 'Strict supervision throughout', capUr: 'مکمل سخت نگرانی' },
      { src: '/gallery/exam-6.jpg', cap: 'The Friday test tradition', capUr: 'جمعے کے ٹیسٹ کی روایت' },
    ],
    related: ['award-ceremonies', 'science-labs', 'smart-classrooms'],
    en: {
      title: 'Weekly Tests: Honest Effort, Fair Assessment',
      excerpt: 'Every week, every student is tested — shuffled papers, conceptual questions, and strict supervision.',
      body: [
        "Brighton's academic culture runs on a simple rhythm: learn, test, improve. Every week students sit a test built on shuffled papers and conceptual questions — not memorisation. The Friday test has become a small institution of its own.",
        'Fairness is taken seriously. Tests run under strict supervision and CCTV monitoring, so every mark on the sheet is earned. Students know the rules: no shortcuts, no compromise — just hard work.',
        'The system follows the SLO-based examination pattern, which means students are already practising the way board examiners think. By the time the board exams arrive, the hall feels familiar.',
      ],
    },
    ur: {
      title: 'ہفتہ وار ٹیسٹ: ایماندارانہ محنت، منصفانہ جانچ',
      excerpt: 'ہر ہفتے، ہر طالب علم کا ٹیسٹ — بدلے ہوئے پرچے، تصوراتی سوالات اور سخت نگرانی۔',
      body: [
        'برائٹن کی تعلیمی ثقافت ایک سادہ ردھم پر چلتی ہے: پڑھو، ٹیسٹ دو، بہتر بنو۔ ہر ہفتے طلبہ بدلے ہوئے پرچوں اور تصوراتی سوالات پر مبنی ٹیسٹ دیتے ہیں — رٹا نہیں۔ جمعے کا ٹیسٹ اب اپنی ایک چھوٹی روایت بن چکا ہے۔',
        'انصاف کو سنجیدگی سے لیا جاتا ہے۔ ٹیسٹ سخت نگرانی اور سی سی ٹی وی کی نگرانی میں ہوتے ہیں، تاکہ شیٹ پر ہر نمبر کمایا ہوا ہو۔ طلبہ اصول جانتے ہیں: کوئی شارٹ کٹ نہیں، کوئی سمجھوتہ نہیں — صرف محنت۔',
        'یہ نظام ایس ایل او پر مبنی امتحانی طرز پر چلتا ہے، یعنی طلبہ پہلے سے اسی طرح سوچنے کی مشق کر رہے ہوتے ہیں جس طرح بورڈ کے ممتحن سوچتے ہیں۔ جب بورڈ کے امتحان آتے ہیں تو ہال مانوس لگتا ہے۔',
      ],
    },
  },
  {
    slug: 'science-labs',
    photos: [
      { src: '/gallery/facility-scilab.jpg', cap: 'Practical work in progress', capUr: 'عملی کام جاری' },
      { src: '/gallery/exam-7.jpg', cap: 'Learning the procedure of experiments', capUr: 'تجربات کا طریقہ سیکھتے ہوئے' },
      { src: '/gallery/exam-8.jpg', cap: 'Pre-Medical students at the bench', capUr: 'بینچ پر پری میڈیکل کے طلبہ' },
    ],
    related: ['computer-lab', 'weekly-tests', 'library'],
    en: {
      title: 'Science Laboratories: Learning by Doing',
      excerpt: 'Physics, Chemistry and Biology come alive in our laboratories, where every experiment follows proper procedure.',
      body: [
        'Science at Brighton is not only read — it is performed. Our laboratories host the practical work of Physics, Chemistry and Biology, where students learn the timely procedure of experiments the way board practicals demand.',
        'Pre-Medical students spend long hours here with specimens and apparatus; Pre-Engineering students test the laws they meet in theory class. Teachers supervise every bench, because a careful hand in the lab becomes a careful mind in the exam hall.',
        'For many students, the lab is where a subject stops being a chapter and starts being a curiosity.',
      ],
    },
    ur: {
      title: 'سائنس لیبارٹریز: عمل سے سیکھنا',
      excerpt: 'طبیعیات، کیمسٹری اور بیالوجی ہماری لیبارٹریوں میں زندہ ہو جاتے ہیں، جہاں ہر تجربہ مناسب طریقے سے ہوتا ہے۔',
      body: [
        'برائٹن میں سائنس صرف پڑھی نہیں جاتی — اسے کر کے دکھایا جاتا ہے۔ ہماری لیبارٹریاں طبیعیات، کیمسٹری اور بیالوجی کے عملی کام کی میزبانی کرتی ہیں، جہاں طلبہ تجربات کا بروقت طریقہ اس طرح سیکھتے ہیں جس طرح بورڈ کے پریکٹیکل مانگتے ہیں۔',
        'پری میڈیکل کے طلبہ یہاں نمونوں اور آلات کے ساتھ لمبے گھنٹے گزارتے ہیں؛ پری انجینئرنگ کے طلبہ ان قوانین کو آزماتے ہیں جو وہ تھیوری کلاس میں پڑھتے ہیں۔ اساتذہ ہر بینچ کی نگرانی کرتے ہیں، کیونکہ لیب میں محتاط ہاتھ امتحان ہال میں محتاط ذہن بنتا ہے۔',
        'بہت سے طلبہ کے لیے لیب وہ جگہ ہے جہاں کوئی مضمون باب نہیں رہتا بلکہ تجسس بن جاتا ہے۔',
      ],
    },
  },
  {
    slug: 'computer-lab',
    photos: [
      { src: '/gallery/facility-complab.jpg', cap: 'Every student gets a machine', capUr: 'ہر طالب علم کے لیے ایک کمپیوٹر' },
      { src: '/gallery/exam-7.jpg', cap: 'Hands-on practice hour', capUr: 'عملی مشق کا گھنٹہ' },
      { src: '/gallery/exam-8.jpg', cap: 'Preparing for a digital future', capUr: 'ڈیجیٹل مستقبل کی تیاری' },
    ],
    related: ['science-labs', 'smart-classrooms', 'library'],
    en: {
      title: 'Computer Lab: A Window to the Digital World',
      excerpt: 'High-speed internet and modern systems — every Computer Science student gets hands-on time in our computer lab.',
      body: [
        'Computer Science is one of the three subjects of our General Science program, and the computer lab is where it breathes. High-speed internet and up-to-date systems give every student a machine to practise on — no watching over someone\u2019s shoulder.',
        'From first-year basics to the kind of thinking that leads toward software engineering and IT degrees, the lab hour is often the most-awaited period of the day.',
        'Digital learning is not an extra here. It is part of how Brighton prepares students for the world they will graduate into.',
      ],
    },
    ur: {
      title: 'کمپیوٹر لیب: ڈیجیٹل دنیا کی کھڑکی',
      excerpt: 'تیز رفتار انٹرنیٹ اور جدید سسٹمز — کمپیوٹر سائنس کا ہر طالب علم ہماری کمپیوٹر لیب میں عملی وقت پاتا ہے۔',
      body: [
        'کمپیوٹر سائنس ہمارے جنرل سائنس پروگرام کے تین مضامین میں سے ایک ہے، اور کمپیوٹر لیب وہ جگہ ہے جہاں یہ سانس لیتی ہے۔ تیز رفتار انٹرنیٹ اور جدید سسٹمز ہر طالب علم کو مشق کے لیے ایک کمپیوٹر دیتے ہیں — کسی کے کندھے پر سے دیکھنے کی ضرورت نہیں۔',
        'پہلے سال کی بنیادی باتوں سے لے کر اس سوچ تک جو سافٹ ویئر انجینئرنگ اور آئی ٹی ڈگریوں کی طرف لے جاتی ہے، لیب کا گھنٹہ اکثر دن کا سب سے منتظر پیریڈ ہوتا ہے۔',
        'ڈیجیٹل لرننگ یہاں کوئی اضافی چیز نہیں۔ یہ اسی کا حصہ ہے جس طرح برائٹن طلبہ کو اس دنیا کے لیے تیار کرتا ہے جس میں وہ فارغ التحصیل ہوں گے۔',
      ],
    },
  },
  {
    slug: 'library',
    photos: [
      { src: '/gallery/facility-library.jpg', cap: 'Shelves that reward curiosity', capUr: 'الماریاں جو تجسس کو انعام دیتی ہیں' },
      { src: '/gallery/event-9.jpg', cap: 'Reading beyond the syllabus', capUr: 'نصاب سے آگے پڑھنا' },
      { src: '/gallery/event-10.jpg', cap: 'The quiet hour regulars', capUr: 'خاموش گھنٹے کے مستقل آنے والے' },
    ],
    related: ['smart-classrooms', 'science-labs', 'weekly-tests'],
    en: {
      title: 'The Library: A Quiet Place to Grow',
      excerpt: 'Shelves of books, silence to think in, and a space every serious student claims as their own.',
      body: [
        "Between the noise of the playground and the pressure of weekly tests, the library is Brighton's quiet room. Students come here to revise, to read beyond the syllabus, and sometimes just to think.",
        'The collection covers course books, reference material and general reading — the kind of shelf that turns a good student into a curious one.',
        'Regulars will tell you: the best seat is by the window, and the best hour is the one before the evening rush.',
      ],
    },
    ur: {
      title: 'لائبریری: بڑھنے کی خاموش جگہ',
      excerpt: 'کتابوں کی الماریاں، سوچنے کی خاموشی، اور وہ جگہ جسے ہر سنجیدہ طالب علم اپنی سمجھتا ہے۔',
      body: [
        'کھیل کے میدان کے شور اور ہفتہ وار ٹیسٹوں کے دباؤ کے درمیان، لائبریری برائٹن کا خاموش کمرہ ہے۔ طلبہ یہاں دہرانے آتے ہیں، نصاب سے آگے پڑھنے آتے ہیں، اور کبھی صرف سوچنے آتے ہیں۔',
        'مجموعے میں نصابی کتب، حوالہ جاتی مواد اور عمومی مطالعہ شامل ہے — وہ الماری جو ایک اچھے طالب علم کو متجسس طالب علم بناتی ہے۔',
        'مستقل آنے والے بتائیں گے: بہترین نشست کھڑکی کے پاس ہے، اور بہترین گھنٹہ شام کی بھیڑ سے پہلے والا ہے۔',
      ],
    },
  },
  {
    slug: 'smart-classrooms',
    photos: [
      { src: '/gallery/facility-classroom.jpg', cap: 'A classroom built for attention', capUr: 'توجہ کے لیے بنا کلاس روم' },
      { src: '/gallery/event-11.jpg', cap: 'Lessons that hold the room', capUr: 'اسباق جو توجہ جمائے رکھیں' },
      { src: '/gallery/event-12.jpg', cap: 'Both sections, same standard', capUr: 'دونوں سیکشنز، ایک ہی معیار' },
    ],
    related: ['computer-lab', 'library', 'campus-events'],
    en: {
      title: 'Smart Classrooms: Teaching That Keeps Up',
      excerpt: 'Modern classrooms where lessons are visual, interactive, and built for how students actually learn.',
      body: [
        'A Brighton classroom looks the way a modern classroom should. Lessons are visual where they need to be, the teacher can move between explanation and demonstration, and no student is stuck copying from a distant blackboard.',
        'Both our sections — boys and girls — learn in the same upgraded environment, because quality should never depend on which gate you enter from.',
        'Parents visiting on open days often say the same thing: it feels like a place where someone thought about the student first.',
      ],
    },
    ur: {
      title: 'اسمارٹ کلاس رومز: تدریس جو ساتھ چلے',
      excerpt: 'جدید کلاس رومز جہاں اسباق بصری، تعاملی اور اسی طرح بنے ہیں جس طرح طلبہ واقعی سیکھتے ہیں۔',
      body: [
        'برائٹن کا کلاس روم ویسا ہی لگتا ہے جیسا جدید کلاس روم ہونا چاہیے۔ اسباق جہاں ضرورت ہو بصری ہوتے ہیں، استاد وضاحت اور مظاہرے کے درمیان آسانی سے منتقل ہوتا ہے، اور کوئی طالب علم دور بلیک بورڈ سے نقل کرنے پر مجبور نہیں۔',
        'ہمارے دونوں سیکشنز — لڑکے اور لڑکیاں — ایک ہی جدید ماحول میں پڑھتے ہیں، کیونکہ معیار کا انحصار کبھی اس پر نہیں ہونا چاہیے کہ آپ کس دروازے سے داخل ہوئے۔',
        'اوپن ڈے پر آنے والے والدین اکثر ایک ہی بات کہتے ہیں: یہ ایسی جگہ لگتی ہے جہاں کسی نے پہلے طالب علم کے بارے میں سوچا۔',
      ],
    },
  },
  {
    slug: 'campus-events',
    photos: [
      { src: '/gallery/event-1.jpg', cap: 'The orientation stage is set', capUr: 'اورینٹیشن کا اسٹیج تیار' },
      { src: '/gallery/event-2.jpg', cap: 'New faces, new ambitions', capUr: 'نئے چہرے، نئے عزائم' },
      { src: '/gallery/event-3.jpg', cap: 'Welcome party celebrations', capUr: 'ویلکم پارٹی کی خوشیاں' },
      { src: '/gallery/event-4.jpg', cap: 'Cultural show performances', capUr: 'ثقافتی شو کی پرفارمنس' },
      { src: '/gallery/event-5.jpg', cap: 'Heritage and talent on one stage', capUr: 'ایک اسٹیج پر ورثہ اور صلاحیت' },
      { src: '/gallery/facility-cooking.jpg', cap: 'Co-curricular skills in action', capUr: 'ہم نصابی مہارتیں عمل میں' },
    ],
    related: ['sports-gala', 'award-ceremonies', 'smart-classrooms'],
    en: {
      title: 'Campus Events: The Year in Celebration',
      excerpt: 'Freshers orientations, welcome parties and cultural shows — the moments that make Brighton a family.',
      body: [
        'A college is more than its timetable. Through the year, Brighton fills its calendar with the events that turn classmates into friends: the freshers orientation that welcomes first-year students, welcome parties, and cultural shows where students perform with pride.',
        'The 2026–27 freshers orientation brought the new first-year batch into the Brighton family with energy and warmth — new faces, new ambitions, and the first of many memories.',
        'Our cultural shows celebrate diversity and togetherness — heritage, talent and unity on one stage. These are the photographs our students will show their own children one day.',
      ],
    },
    ur: {
      title: 'کیمپس تقریبات: جشن میں گزرا سال',
      excerpt: 'فریشرز اورینٹیشن، ویلکم پارٹیاں اور ثقافتی شو — وہ لمحات جو برائٹن کو ایک خاندان بناتے ہیں۔',
      body: [
        'کالج صرف ٹائم ٹیبل کا نام نہیں۔ سال بھر برائٹن اپنا کیلنڈر ان تقاریب سے بھرتا ہے جو ہم جماعتوں کو دوست بناتی ہیں: فریشرز اورینٹیشن جو پہلے سال کے طلبہ کا استقبال کرتی ہے، ویلکم پارٹیاں، اور ثقافتی شو جہاں طلبہ فخر سے پرفارم کرتے ہیں۔',
        '2026-27 کی فریشرز اورینٹیشن نئے پہلے سال کے بیچ کو جوش اور محبت کے ساتھ برائٹن فیملی میں لائی — نئے چہرے، نئے عزائم، اور بہت سی یادوں میں سے پہلی۔',
        'ہمارے ثقافتی شو تنوع اور یکجہتی کا جشن مناتے ہیں — ایک اسٹیج پر ورثہ، صلاحیت اور اتحاد۔ یہ وہ تصاویر ہیں جو ہمارے طلبہ ایک دن اپنی اولاد کو دکھائیں گے۔',
      ],
    },
  },
];

export function getStory(slug) {
  return STORIES.find((s) => s.slug === slug) || null;
}
