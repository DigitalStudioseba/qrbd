/* ═══════════════════════════════════════════════════════════════
   i18n-extra.js — WO strings jo dictionary me chhoot gayi thi.

   Kyun chahiye: English chun-ne par bhi kai jagah Hinglish dikh raha
   tha — khaas kar customer wale page par aur server ke error message
   me. Wajah do thi:
     1) String dictionary me thi hi nahi.
     2) String runtime par banti thi ("3 files load ho gayi") isliye
        exact match kabhi milta hi nahi tha.

   Doosri wajah ke liye i18n.js me "%d" wala number-aware lookup add
   kiya gaya hai — yahan bas "%d" wali key likh do, number apne aap
   sahi jagah bhar jaata hai.

   i18n.js ke BAAD load hona chahiye.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  var EXTRA = {

    /* ─────────── PLAN CARDS — Starter / Pro / Premium ─────────── */
    'Lifetime — ek baar pay, koi renewal nahi':
      'Lifetime — pay once, no renewal ever',
    'Ek baar pay — Lifetime, koi renewal nahi':
      'Pay once — Lifetime, no renewal ever',
    'Lifetime — aaj ka bhi, aane wala bhi':
      'Lifetime — what exists today, and whatever comes next',
    'Lifetime — Advance Feature already unlocked':
      'Lifetime — Advance Feature already unlocked',
    'Try karke dekho — bina paisa diye':
      'Try it out — without paying anything',

    /* Price wale vaakya — %d se, taaki Superadmin price badle to bhi chale */
    'Advance Feature isme nahi hai — baad me ₹%d me alag se unlock kar sakte ho':
      'Advance Feature is not included — you can unlock it later for ₹%d',
    'Aaj ke saare advance features. Aage koi naya advance feature aaya to ₹%d me alag se':
      'Every advance feature that exists today. Any new one that comes later costs ₹%d separately',
    'Aaj ke saare advance features. Aage naya advance feature aaya to ₹%d me alag se':
      'Every advance feature that exists today. Any new one that comes later costs ₹%d separately',

    'Aaj ke bhi, kal ke bhi. Jo bhi naya advance feature banega, apne aap mil jayega — dobara paisa nahi.':
      'Today\'s features and tomorrow\'s. Every new advance feature reaches you automatically — you never pay again.',
    'Jo bhi naya advance feature banega, apne aap mil jayega — dobara paisa nahi':
      'Every new advance feature reaches you automatically — you never pay again',

    '✅ Starter ka sab kuch': '✅ Everything in Starter',
    '✅ Pro ka sab kuch': '✅ Everything in Pro',
    '✅ Aane wale SAARE advance feature — FREE': '✅ ALL upcoming advance features — FREE',
    '✅ Kabhi dobara koi payment nahi': '✅ Never pay again',
    '✅ 24 Ghante · 10 Print': '✅ 24 Hours · 10 Prints',
    '✅ Advance Feature — UNLOCKED': '✅ Advance Feature — UNLOCKED',

    /* ─────────── ADVANCE FEATURE TAB (shop panel) ─────────── */
    'Ek dukaan se full-service dukaan — photo, resume, bade print, sab':
      'From an ordinary shop to a full-service one — photos, resumes, large prints, everything',
    'Ek baar · Lifetime · Koi renewal nahi':
      'One time · Lifetime · No renewal',
    'Turant unlock · Payment fail ho to paisa nahi katta — dobara try kar lena':
      'Unlocks instantly · If the payment fails nothing is charged — just try again',
    'Ye saare option ek hi unlock me aate hain. Unlock ke baad har feature ko apne hisaab se on/off kar sakte ho, aur har ek ka apna rate set kar sakte ho.':
      'All of these come in a single unlock. After unlocking you can switch each feature on or off as you like, and set your own rate for each one.',

    /* Default feature descriptions (Superadmin inhe badal sakta hai —
       badalne par uska apna text dikhega, translation nahi) */
    'Customer photo bhejta hai — 4, 6, 8 ya 10 ki sheet khud ban kar photo printer se nikalti hai, cutting lines ke saath. Layout aur printer routing sab automatic.':
      'The customer sends a photo — a sheet of 4, 6, 8 or 10 builds itself and comes out of the photo printer with cutting lines. Layout and printer routing are fully automatic.',
    'Customer QR se hi 6 design me resume banata hai aur form khud bharta hai. Aap sirf print dete ho — naya kaam, bina kuch seekhe.':
      'The customer builds a resume in one of 6 designs straight from the QR and fills the form themselves. You only hand over the print — new business, nothing new to learn.',
    'Naksha, project chart, banner. Har bade size ka apna printer aur apna rate set kar sakte ho — A3 printer hai to ye kaam aapke paas hi rahega.':
      'Maps, project charts, banners. Each large size gets its own printer and its own rate — if you have an A3 printer, this work stays with you.',
    'Notes, question paper, syllabus — customer 2/4/6/8/9/12/16 pages ek hi A4 par chhapwa sakta hai. Student season me sabse zyada chalne wala option.':
      'Notes, question papers, syllabus — the customer can print 2/4/6/8/9/12/16 pages on a single A4. The busiest option during student season.',
    'Double-side print ka alag rate rakho. Auto-duplex printer nahi hai to manual mode — system khud bolta hai "page palto".':
      'Charge a separate rate for double-sided printing. No auto-duplex printer? Manual mode — the system itself says "flip the page".',
    '4×6 Passport Photos': '4×6 Passport Photos',
    'Mini Print — ek sheet par 16 pages tak': 'Mini Print — up to 16 pages on one sheet',
    'A3 / A2 / A1 — Bade Size': 'A3 / A2 / A1 — Large Sizes',
    'Duplex — Dono Side Print': 'Duplex — Both-Side Printing',

    /* ─────────── ADMIN — Advance Feature (naye strings) ─────────── */
    'saare': 'all',
    '4×6 Photo · Resume · A3/A2/A1 · Duplex · Mini Print':
      '4×6 Photo · Resume · A3/A2/A1 · Duplex · Mini Print',
    'Notes, question paper, syllabus — customer 2/4/6/8/9/12/16 pages ek hi A4 par chhapwa sakta hai.':
      'Notes, question papers, syllabus — the customer can print 2/4/6/8/9/12/16 pages on a single A4.',
    '16 page ka kaam 1 page ke kagaz me.': '16 pages of work on 1 sheet of paper.',
    'Student season me sabse zyada chalne wala option.':
      'The most-used option during student season.',

    /* ─────────── ADMIN — Big Size (A3/A2/A1) pricing ─────────── */
    '📐 BIG SIZE PRICING — A3 / A2 / A1 (₹ per page)':
      '📐 BIG SIZE PRICING — A3 / A2 / A1 (₹ per page)',
    'Bade kagaz ki lagat alag hoti hai — yahan har size ka apna rate set karo.':
      'Large paper costs more — set a separate rate for each size here.',
    'Khaali chhodo ya 0 daalo': 'Leave blank or enter 0',
    'to us size par aapka normal B&W / Color rate hi lagega.':
      'and that size will use your normal B&W / Color rate.',
    'A3 — ⚫ B&W (₹/page)': 'A3 — ⚫ B&W (₹/page)',
    'A3 — 🌈 Color (₹/page)': 'A3 — 🌈 Color (₹/page)',
    'A2 — ⚫ B&W (₹/page)': 'A2 — ⚫ B&W (₹/page)',
    'A2 — 🌈 Color (₹/page)': 'A2 — 🌈 Color (₹/page)',
    'A1 — ⚫ B&W (₹/page)': 'A1 — ⚫ B&W (₹/page)',
    'A1 — 🌈 Color (₹/page)': 'A1 — 🌈 Color (₹/page)',
    'ℹ️ Abhi koi big-size rate set nahi — A3/A2/A1 par bhi normal A4 wala rate hi lagega.':
      'ℹ️ No big-size rate set yet — A3/A2/A1 will also use your normal A4 rate.',
    '✅ Apna rate lag raha hai:': '✅ Your own rate is applied:',
    'par normal rate': 'use the normal rate',

    /* ─────────── HOMEPAGE — instant demo ─────────── */
    'Details bharo — Shop ID aur password turant isi screen par mil jayenge':
      'Fill in your details — your Shop ID and password appear right on this screen',
    '🔒 Secure form · No payment · No card': '🔒 Secure form · No payment · No card',
    'WhatsApp number (10 digit)': 'WhatsApp number (10 digits)',
    'Demo Shuru Karo — Free ›': 'Start Free Demo ›',
    'Shop ID aur password turant screen par milega · Koi payment nahi':
      'Shop ID and password appear instantly on screen · No payment',
    '⏳ Demo ban raha hai...': '⏳ Creating your demo...',
    'Demo Account Active Hai': 'Your Demo Account Is Active',
    'Aapki shop ban gayi. Neeche wali details': 'Your shop is created. Save the details below',
    'abhi note kar lo': 'right now',
    'Valid': 'Valid',
    'Free prints': 'Free prints',
    'Charge': 'Charge',
    'Shop ID': 'Shop ID',
    'Password': 'Password',
    'Copy': 'Copy',
    'Ye screen': 'This screen',
    'dobara nahi khulegi': 'will not open again',
    'Screenshot le lo ya Copy dabao. Password aapka mobile number hi hai — baad me dashboard se badal sakte ho.':
      'Take a screenshot or tap Copy. Your password is your mobile number — you can change it later from the dashboard.',
    'Aapki shop ka QR — customer isi ko scan karega':
      'Your shop QR — this is what customers scan',
    'Login karo': 'Log in',
    '— upar wali Shop ID aur password se': '— with the Shop ID and password above',
    'Print Agent download': 'Download the Print Agent',
    'karke shop ke PC me install karo': 'and install it on your shop PC',
    'Shop ID daalo': 'Enter the Shop ID',
    'agent me — printer apne aap detect ho jayega':
      'in the agent — your printer is detected automatically',
    'QR scan karke': 'Scan the QR',
    'phone se ek test print bhejo 🎉': 'and send a test print from your phone 🎉',
    '🎬 Poora setup 2 minute me — dekh lo': '🎬 See the full setup in 2 minutes',
    '🔊 Sound': '🔊 Sound',
    '🔑 Ab Login Karo ›': '🔑 Log In Now ›',
    '🔒 Encrypted connection': '🔒 Encrypted connection',
    '🚫 No payment taken': '🚫 No payment taken',
    '🗑️ Files auto-delete': '🗑️ Files auto-delete',
    'Request Mil Gayi': 'Request Received',
    'Aapki demo request humare paas aa gayi hai.': 'We have received your demo request.',
    '⏱️ Thodi der me activate': '⏱️ Activating shortly',
    '🎬 Tab tak setup dekh lo — 2 minute': '🎬 Meanwhile, watch the 2-minute setup',

    /* ─────────── Phone validation messages ─────────── */
    'Sahi 10-digit mobile number daalo.': 'Please enter a valid 10-digit mobile number.',
    'Mobile number 6, 7, 8 ya 9 se shuru hota hai — dobara check karo.':
      'Mobile numbers start with 6, 7, 8 or 9 — please check again.',
    'Ye test number hai — apna asli WhatsApp number daalo.':
      'That is a test number — please enter your real WhatsApp number.',
    'Ye number asli nahi lag raha — apna WhatsApp number daalo.':
      'That number does not look real — please enter your WhatsApp number.',
    '✅ Number theek hai — Shop ID isi par bhi bhej denge':
      '✅ Number looks good — we will send the Shop ID here too',
    'Apna naam daalo': 'Enter your name',
    'Shop ka naam daalo': 'Enter your shop name',

    /* ─────────── SUPERADMIN — activation mode ─────────── */
    '⚡ Activation Mode': '⚡ Activation Mode',
    '⚡ Instant — apne aap activate': '⚡ Instant — activates automatically',
    'Form submit karte hi Shop ID aur password': 'As soon as the form is submitted, the Shop ID and password',
    'usi screen par': 'appear on that screen',
    'mil jaate hain. Aapko kuch nahi karna.': ' — you do not have to do anything.',
    '🔒 Manual — aapki approval ke baad': '🔒 Manual — after your approval',
    '🔒 Manual Approval Karo': '🔒 Switch to Manual Approval',
    '⚡ Instant Karo': '⚡ Switch to Instant',
    'Har request neeche': 'Every request lands below in',
    'me aayegi. Accept karne par hi demo banega, phir WhatsApp se ID bhejni hogi.':
      '. The demo is created only when you Accept, then you send the ID on WhatsApp.',
    'Ye list sirf': 'This list only fills up in',
    'Manual Approval': 'Manual Approval',
    'mode me bharti hai.': ' mode.',

    /* ─────────── CUSTOMER PAGE — upload / editor ─────────── */
    'Sab theek hai / Edit karna hai': 'All good / Want to edit',
    'pehle file upload karo': 'please upload a file first',
    'File padhi ja rahi hai…': 'Reading file…',
    'File padhi nahi ja saki': 'Could not read the file',
    'File load nahi hui': 'File did not load',
    'Preview ban raha hai…': 'Building preview…',
    'Preview nahi ban paya — dobara try karo': 'Preview failed — please try again',
    '⏳ Sheets ban rahi hain…': '⏳ Preparing sheets…',
    '⏳ Document load ho raha hai...': '⏳ Loading document...',
    'ho gaya': 'done',
    '). JPG ya PNG photo try karo.': '). Try a JPG or PNG photo.',
    '🗑️ Document hata diya': '🗑️ Document removed',
    'Aap sirf': 'You only pay for',
    'sheet</b> ka paisa denge': 'sheet</b>',
    '— abhi ke rate se <b>₹': '— at the current rate <b>₹',

    /* Number-wale toast — %d se number apne aap bhar jaata hai */
    '✅ %d files load ho gayi!': '✅ %d files loaded!',
    '✅ %d pages load ho gaye!': '✅ %d pages loaded!',
    '✅ %d pages isi canvas par add ho gaye': '✅ %d pages added to this canvas',
    '⏳ Page %d / %d load ho raha hai...': '⏳ Loading page %d of %d...',
    '⚠️ Page %d load nahi hui, baaki pages continue ho rahe hain...':
      '⚠️ Page %d failed to load, continuing with the rest...',
    '⏳ File %d/%d:': '⏳ File %d/%d:',

    /* ─────────── RESUME ─────────── */
    '⚠️ Preview nahi ban paya, par resume theek hai — print kar sakte ho':
      '⚠️ Preview failed, but your resume is fine — you can still print it',
    'Developed by Rupesh Kumar Mahato | QR Se Resume Banao':
      'Developed by Rupesh Kumar Mahato | Build your resume with QR',

    /* ─────────── SERVER ERRORS — login / session ─────────── */
    'Login zaroori hai': 'Login required',
    'Session expire ho gaya, dobara login karo': 'Session expired, please log in again',
    'ID ya password galat hai': 'Incorrect ID or password',
    'Purana password galat hai': 'Old password is incorrect',
    'Naya password kam se kam 6 akshar ka ho': 'New password must be at least 6 characters',
    'Bahut zyada galat koshish. %d minute baad try karo.':
      'Too many failed attempts. Please try again in %d minutes.',
    'Ye whitelabel token nahi hai': 'This is not a white-label token',
    'Account nahi mila': 'Account not found',
    'Account paused hai': 'Account is paused',
    'Aapka account abhi paused hai': 'Your account is currently paused',
    'Aapka account abhi paused hai. Admin se baat kariye.':
      'Your account is currently paused. Please contact the admin.',

    /* ─────────── SERVER ERRORS — shop / demo ─────────── */
    'Shop nahi mila': 'Shop not found',
    'Shop ka naam zaroori hai': 'Shop name is required',
    'Shop pehle se active hai': 'Shop is already active',
    'Sahi 10-digit mobile number daalo': 'Enter a valid 10-digit mobile number',
    'Sahi 10 digit mobile number daalo': 'Enter a valid 10-digit mobile number',
    'Demo abhi band hai — thodi der baad try karo ya seedha register karo':
      'Demo is closed right now — try again shortly or register directly',
    'Is number par demo pehle liya ja chuka hai. Pasand aaya tha? Ab register karo 🙂':
      'A demo has already been taken on this number. Liked it? Register now 🙂',
    'Is number par demo pehle liya ja chuka hai. Ab register karo 🙂':
      'A demo has already been taken on this number. Please register now 🙂',
    'Is number par demo pehle se hai': 'This number already has a demo',
    'Aaj ke liye demo limit ho gayi — kal try karo ya abhi register karo':
      'Today’s demo limit is reached — try tomorrow or register now',
    'Is network se %d demo ho chuke hain. %d minute baad try karo, ya seedha register kar lo.':
      '%d demos have already been created from this network. Try again in %d minutes, or register directly.',
    'Login password = aapka mobile number': 'Login password = your mobile number',

    /* ─────────── SERVER ERRORS — advance / module ─────────── */
    'Advance feature unlock nahi hai': 'Advance feature is not unlocked',
    'Advanced already unlocked hai': 'Advanced is already unlocked',
    'Galat module': 'Invalid module',

    /* ─────────── SERVER ERRORS — agent ─────────── */
    'Aap agent nahi ho': 'You are not an agent',
    'Agent nahi mila': 'Agent not found',
    'Aapka agent account abhi paused hai': 'Your agent account is currently paused',
    'Agent banne ke liye pehle plan lena zaroori hai. Demo account agent nahi ban sakta.':
      'You must purchase a plan before becoming an agent. Demo accounts cannot become agents.',
    'Sahi UPI ID daalo (jaise name@bank)': 'Enter a valid UPI ID (e.g. name@bank)',
    'Agent token galat hai': 'Invalid agent token',
    'Agent purana hai — naya print agent install karo':
      'Your agent is outdated — please install the latest print agent',

    /* ─────────── SERVER ERRORS — withdrawal ─────────── */
    'Withdrawal ke liye kam se kam ₹500 chahiye (abhi ₹%d)':
      'A minimum of ₹500 is required to withdraw (currently ₹%d)',
    'Ek withdrawal request pehle se pending hai': 'A withdrawal request is already pending',
    'Pending withdrawal nahi mili': 'No pending withdrawal found',

    /* ─────────── SERVER ERRORS — payment / gateway ─────────── */
    'Payment reference/ID daalo (Razorpay dashboard se)':
      'Enter the payment reference/ID (from your Razorpay dashboard)',
    'Payment reference daalo (cash ho to "CASH" likh do)':
      'Enter the payment reference (write "CASH" if paid in cash)',
    'Payment gateway configure nahi hai.': 'Payment gateway is not configured.',
    'Payment verification failed': 'Payment verification failed',
    'Order create nahi hua': 'Could not create the order',
    'Order create nahi hua:': 'Could not create the order:',
    'Order match nahi hua': 'Order did not match',
    'Key ID aur Secret dono daalo': 'Enter both the Key ID and the Secret',
    'Key ID rzp_ se shuru honi chahiye': 'Key ID must start with rzp_',
    'Secret key bhi daalo': 'Please enter the secret key as well',
    'App ID bhi daalo': 'Please enter the App ID as well',
    'Gateway razorpay ya cashfree hi ho sakta hai': 'Gateway must be either razorpay or cashfree',
    'Pehle Razorpay keys save karo': 'Save your Razorpay keys first',
    'Pehle Cashfree keys save karo': 'Save your Cashfree keys first',
    'Pehle apna Razorpay ya Cashfree set karo — warna shop payment nahi kar payegi':
      'Set up your Razorpay or Cashfree first — otherwise the shop cannot take payments',
    'Sahi price daalo': 'Enter a valid price',
    'Monthly price number me daalo': 'Enter the monthly price as a number',
    'Monthly price bahut zyada hai': 'Monthly price is too high',
    'Valid base price daalo': 'Enter a valid base price',

    /* ─────────── SERVER ERRORS — white label ─────────── */
    'White label nahi mila': 'White label not found',
    'Registration nahi mila': 'Registration not found',
    'License already paid hai': 'The license is already paid',
    'License payment abhi complete nahi hua': 'License payment is not complete yet',
    'Slug kam se kam 3 akshar ka ho (sirf a-z, 0-9, dash)':
      'Slug must be at least 3 characters (only a-z, 0-9, dash)',
    'Ye slug reserved hai, dusra chuno': 'This slug is reserved, please choose another',
    'Ye slug already liya jaa chuka hai': 'This slug is already taken',
    'Sahi support email daalo': 'Enter a valid support email',
    'Sahi 10 digit support number daalo': 'Enter a valid 10-digit support number',
    'Instagram link https:// se shuru hona chahiye': 'The Instagram link must start with https://',
    'YouTube link https:// se shuru hona chahiye': 'The YouTube link must start with https://',
    'Facebook link https:// se shuru hona chahiye': 'The Facebook link must start with https://',

    /* ─────────── SERVER ERRORS — upload / logo ─────────── */
    'Koi file nahi': 'No file provided',
    'Koi file nahi mili': 'No file found',
    'Sirf PNG file chalegi (transparent background wali)':
      'Only PNG files are allowed (with a transparent background)',
    'Sirf PNG ya JPG file chalegi': 'Only PNG or JPG files are allowed',
    'PNG transparent background wali honi chahiye (abhi solid background hai)':
      'The PNG must have a transparent background (this one has a solid background)',
    'Logo %d KB se chhota hona chahiye (abhi %d KB hai)':
      'The logo must be smaller than %d KB (it is currently %d KB)',
    'Cloudinary configured nahi': 'Cloudinary is not configured',
    'Cloudinary keys set nahi hain': 'Cloudinary keys are not set',
    'Cloudinary configured nahi hai — Render environment variables check karo (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)':
      'Cloudinary is not configured — check your Render environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)',

    /* ─────────── SERVER ERRORS — misc ─────────── */
    'Ye shop aapki nahi hai': 'This shop does not belong to you',
    'Shop ya order match nahi hua': 'The shop or order did not match',
    'Shop ka setup abhi incomplete hai. Shop owner ko setup fee complete karna hoga.':
      'This shop’s setup is still incomplete. The shop owner needs to complete the setup fee.',
    'Ye shop kisi aur ke PC se jud chuki hai': 'This shop is already linked to another PC',
    'fix nahi hua': 'not fixed',
    'abhi saaf karo': 'clean up now',

    /* ─────────── HOMEPAGE — short bits ─────────── */
    '— har shop par ₹100': '— ₹100 for every shop',
    'Har shop onboard karne par flat ₹100 commission':
      'A flat ₹100 commission for every shop you onboard',
    'Cyber cafe / print shop free register karo': 'Register your cyber cafe / print shop free',
    'Apne brand se resell karo': 'Resell it under your own brand',
    'Cyber cafe aur print shop ke liye QR-based automatic print software. Customer QR scan karke file bhejta hai, payment karta hai, print automatic nikalta hai.':
      'QR-based automatic printing software for cyber cafes and print shops. The customer scans the QR, sends a file, pays, and the print comes out automatically.'
  };

  /* ── alert / confirm ko apne aap translate karo ──
     Ye DOM nahi hote, isliye MutationObserver inhe kabhi nahi pakadta —
     English chunne par bhi inme Hinglish hi dikhta tha (khaas kar server
     ke error message). Yahan ek baar wrap kar dene se HAR call site
     apne aap theek ho jaati hai, kisi file me haath lagaye bina.

     Multi-line message (jaise confirm ke andar \n) ki har line alag
     translate hoti hai — poora block dictionary me na ho tab bhi jitna
     mil jaye utna English ho jaata hai. */
  function wrapDialogs() {
    if (window.__qspDialogsWrapped) return;
    var T = (window.QSPi18n && window.QSPi18n.t) || function (s) { return s; };
    function tr(msg) {
      if (msg == null) return msg;
      return String(msg).split('\n').map(function (line) {
        var m = line.match(/^(\s*)([\s\S]*?)(\s*)$/);
        return m ? m[1] + T(m[2]) + m[3] : T(line);
      }).join('\n');
    }
    ['alert', 'confirm', 'prompt'].forEach(function (fn) {
      var orig = window[fn];
      if (typeof orig !== 'function') return;
      window[fn] = function (msg) {
        var args = Array.prototype.slice.call(arguments);
        args[0] = tr(msg);
        return orig.apply(window, args);
      };
    });
    window.__qspDialogsWrapped = true;
  }
  /* ── AB KI BAAR JODA GAYA ── website audit me jo English me
     chhoot gaya tha (pricing plans, demo form, white-label,
     aur customer page ka naya PDF-password dialog). */
  var EXTRA2 = {
    "Ruko…": "Please wait…",
    "⏳ Demo ban raha hai...": "⏳ Creating the demo...",
    "⏳ Register ho raha hai...": "⏳ Registering...",
    "✓ Copied": "✓ Copied",
    "❌ Galat password —": "❌ Wrong password —",
    "🗑️ Document hata diya": "🗑️ Document removed",
    "⚠️ Password enter karo": "⚠️ Enter the password",
    "⚠️ Photo nahi mili": "⚠️ Photo not found",
    "📌 Photo sheet pehle se sahi fit hai": "📌 The photo sheet already fits correctly",
    "\"📋 Logs Dekho\"": "\"📋 View Logs\"",
    "Customer ko sirf QR scan karna hai, document upload karna hai, payment complete karni hai — aur print automatically start ho jata hai. Na pendrive ki zarurat, na WhatsApp par file bhejne ka jhanjhat, na manual file handling.": "The customer only has to scan the QR code, upload the document and complete the payment — and the print starts automatically. No pen drive, no sending files over WhatsApp, no manual file handling.",
    "Haan, dobara upload karna padega. Hamari policy hai ki koi file store nahi ki jaati — chahe print ho ya cancel. Ye aap khud verify kar sakte ho: System Tray me QR BD icon par right-click karke": "Yes, you will have to upload it again. Our policy is that no file is stored — whether it prints or gets cancelled. You can check this yourself: right-click the QR BD icon in the System Tray and open",
    "Hamara vision hai ki QR BD India ka sabse trusted Smart Printing Platform bane — jahan har print shop bina expensive infrastructure ke smart aur automated printing service de sake.": "Our vision is for QR BD to become India's most trusted Smart Printing Platform — where every print shop can offer smart, automated printing without expensive infrastructure.",
    "Hum believe karte hain ki technology ka asli purpose logon ka kaam easy banana hai. Isi soch ke saath QR BD develop kiya gaya hai, taaki har print shop bina expensive hardware ya complicated setup ke ek modern self-service printing experience de sake.": "We believe the real purpose of technology is to make people's work easier. QR BD was built with exactly that in mind, so that any print shop can offer a modern self-service printing experience without expensive hardware or a complicated setup.",
    "Hum lagatar naye features, better security, faster performance aur reliable technology par kaam kar rahe hain, taaki har business confidently digital printing ka future apna sake.": "We keep working on new features, better security, faster performance and reliable technology, so that every business can confidently adopt the future of digital printing.",
    "Net Jaye To Bhi Safe": "Safe Even If The Internet Drops",
    "Paise dene se pehle free demo se poora software try karo. Payment ke baad refund nahi milta. Par install nahi kar pa rahe to tension mat lo — WhatsApp ya AnyDesk se hum khud setup karke denge, jab tak chalu na ho jaye.": "Try the complete software with the free demo before you pay anything. There is no refund after payment. But if you cannot install it, don't worry — we will set it up for you over WhatsApp or AnyDesk, and stay with it until it is running.",
    "QR BD ek software hai jo aapki dukaan ke printer ko customer ke phone se jodta hai. Ye niyam batate hain ki account, plan, referral aur payment kaise chalte hain, aur kya karna mana hai.": "QR BD is software that connects your shop's printer to your customer's phone. These terms explain how accounts, plans, referrals and payments work, and what is not allowed.",
    "QR BD sirf software deta hai — printer, paper, ink aur dukaan shop owner ki apni hai. Customer jo file bhejta hai uski zimmedari customer ki. Kamai ke jo example website par dikhte hain wo sirf samajhne ke liye hain, guarantee nahi.": "QR BD provides only the software — the printer, paper, ink and shop belong to the shop owner. Whatever file a customer sends is that customer's responsibility. The earning examples shown on the website are only for illustration, not a guarantee.",
    "Setup ya software use karte waqt koi problem aaye to support kisi third-party team se nahi milta — seedha WhatsApp par personally diya jata hai, taaki har user bina confusion ke QR BD ka poora fayda le sake.": "If you hit a problem during setup or while using the software, support does not come from some third-party team — it is given personally over WhatsApp, so every user can get the full benefit of QR BD without confusion.",
    "aur": "and",
    "dikhayega ki payment complete karne ke baad Shop ID milne se lekar pehla test print nikalne tak kya-kya karna hai. Har step ko order me follow karo — kahin atko to sabse neeche Support section me contact ka tarika bhi diya hai.": "shows everything you need to do, from getting your Shop ID after payment to taking your first test print. Follow the steps in order — and if you get stuck, the Support section at the bottom has the contact details.",
    "ek modern Smart Printing Platform hai jo Cyber Cafes, Print Shops, CSC Centers aur Digital Service Businesses ke liye specially design kiya gaya hai. Hamara mission simple hai — printing ko fast, automated aur hassle-free banana.": "is a modern Smart Printing Platform built specially for cyber cafes, print shops, CSC centres and digital service businesses. Our mission is simple — to make printing fast, automated and hassle-free.",
    "— server par kuch nahi bachta. Shop owner apne admin panel ke logs me dekh sakta hai ki job print hua aur file hat gayi. Card ya UPI PIN hum kabhi store nahi karte, wo Razorpay ke paas jata hai.": "— nothing is left on the server. The shop owner can see in the admin panel logs that the job printed and the file was removed. We never store card details or UPI PINs; those go to Razorpay.",
    "karo.": "it.",
    "+ ₹299/saal maintenance, domain renewal & server cost": "+ ₹299/year maintenance, domain renewal & server cost",
    "Aaj ke bhi, kal ke bhi. Jo bhi naya advance feature banega, apne aap mil jayega — dobara paisa nahi.": "Today's and tomorrow's. Any new advance feature reaches you automatically — no paying again.",
    "Aaj ke saare advance features. Aage koi naya advance feature aaya to ₹49 me alag se": "All of today's advance features. Any new advance feature later costs ₹49 separately",
    "Aaj ke saare advance features. Aage naya advance feature aaya to ₹49 me alag se": "All of today's advance features. Any new advance feature later costs ₹49 separately",
    "Advance Feature isme nahi hai — baad me ₹199 me alag se unlock kar sakte ho": "Advance Features are not included — you can unlock them later for ₹199",
    "Demo Shuru Karo — Free ›": "Start the Demo — Free ›",
    "Details bharo — Shop ID aur password turant isi screen par mil jayenge": "Fill in the details — your Shop ID and password appear right here, instantly",
    "Ek baar pay — Lifetime, koi renewal nahi": "Pay once — Lifetime, no renewal",
    "Jo bhi naya advance feature banega, apne aap mil jayega — dobara paisa nahi": "Any new advance feature reaches you automatically — no paying again",
    "Kholne ke liye password daalo": "Enter the password to open it",
    "Lifetime — Advance Feature already unlocked": "Lifetime — Advance Features already unlocked",
    "Lifetime — aaj ka bhi, aane wala bhi": "Lifetime — today's and everything to come",
    "Lifetime — ek baar pay, koi renewal nahi": "Lifetime — pay once, no renewal",
    "PDF ka password": "PDF password",
    "Password dikhao": "Show password",
    "Password sirf aapke phone me use hota hai — kahin save ya send nahi hota": "The password is used only on your phone — never saved or sent anywhere",
    "Register Karo — Agla Step: ₹899 ›": "Register — Next step: ₹899 ›",
    "Shop ID aur password turant screen par milega · Koi payment nahi": "Shop ID and password appear on screen instantly · No payment",
    "WhatsApp number (10 digit)": "WhatsApp number (10 digits)",
    "Ye PDF Password Se Locked Hai": "This PDF is Password Protected",
    "dabao.": "press it.",
    "generate karo.": "generate it.",
    "✅ 24 Ghante · 10 Print": "✅ 24 Hours · 10 Prints",
    "✅ Aane wale SAARE advance feature — FREE": "✅ ALL future advance features — FREE",
    "✅ Advance Feature — UNLOCKED": "✅ Advance Features — UNLOCKED",
    "✅ Kabhi dobara koi payment nahi": "✅ Never any payment again",
    "✅ Pro ka sab kuch": "✅ Everything in Pro",
    "✅ Starter ka sab kuch": "✅ Everything in Starter",
    "🔒 Password PDF": "🔒 Password-protected PDF",
    "🔒 Secure form · No payment · No card": "🔒 Secure form · No payment · No card",
    "🔓 PDF Kholo": "🔓 Open PDF"
  };
  for (var k2 in EXTRA2) if (Object.prototype.hasOwnProperty.call(EXTRA2, k2)) EXTRA[k2] = EXTRA2[k2];

  /* EXTRA3 — teen line English me bhi Hinglish reh gayi thi. */
  var EXTRA3 = {
    "Shop Nahi Mila": "Shop Not Found",
    "aapka@email.com": "you@email.com",
    "Document ka photo — scan jaisa saaf page": "Photo of a document — a clean, scan-like page"
  };
  for (var k3 in EXTRA3) if (Object.prototype.hasOwnProperty.call(EXTRA3, k3)) EXTRA[k3] = EXTRA3[k3];




  /* EXTRA4 — Disclaimer page ke FAQ. Ye HTML me nahi, panel ke
     config se aate hain, isliye pehle chhoot gaye the. */
  var EXTRA4 = {
    "Do tarike: counter par cash, ya online payment (Razorpay/PhonePe) jo seedha aapke account me jata hai. Hum beech me nahi aate — koi commission nahi, unlimited prints.": "Two ways: cash at the counter, or online payment (Razorpay/PhonePe) that goes straight into your own account. We do not sit in between — no commission, unlimited prints.",
    "Free demo se shuru karo. Phir Rs 399/month ka monthly plan ya Rs 999 one-time lifetime plan — ek baar do, hamesha chalao. Koi hidden charge nahi, koi per-print commission nahi.": "Start with the free demo. After that it is a ₹399/month monthly plan or a ₹999 one-time lifetime plan — pay once, run it forever. No hidden charges, no per-print commission.",
    "Har Windows printer ke saath — HP, Canon, Epson, Brother, sab. B&W aur Color ke liye alag printer set kar sakte ho. Advance me 4x6 photo printer, A3 bada printer aur duplex (dono side) printing bhi support hai.": "With every Windows printer — HP, Canon, Epson, Brother, all of them. You can set separate printers for B&W and Colour. The advanced features also support a 4x6 photo printer, a larger A3 printer and duplex (both-side) printing.",
    "Shop par laga QR code scan karo, file select karo (PDF, photo — ek saath kai files), edit karo (crop, rotate, brightness), payment karo (online ya counter cash) — print automatic nikal jata hai. Poora kaam customer ke phone se, 1 minute me.": "Scan the QR code displayed at the shop, select your files (PDF, photo — several at once), edit them (crop, rotate, brightness), pay (online or cash at the counter) — the print comes out automatically. All of it from the customer's phone, in about a minute.",
    "WhatsApp me aapka personal number public ho jata hai, chat me files kho jaati hain, aur hisaab manually rakhna padta hai. QR BD me number private rehta hai, har print ka payment record automatic banta hai, aur customer ki file print ke 90 minute baad khud delete ho jaati hai.": "On WhatsApp your personal number becomes public, files get lost in the chat, and the accounts have to be kept by hand. With QR BD your number stays private, every print gets a payment record automatically, and the customer's file deletes itself 90 minutes after printing.",
    "QR BD cyber cafe aur print shop ke liye ek automatic print software hai. Aap apni shop ka QR code lagate ho — customer apne phone se scan karke file upload karta hai, payment karta hai, aur print aapke printer se automatic nikal jata hai. Na WhatsApp pe file mangni padti hai, na pendrive, na email.": "QR BD is automatic print software for cyber cafes and print shops. You put up your shop's QR code — the customer scans it on their phone, uploads the file, pays, and the print comes out of your printer automatically. No asking for files on WhatsApp, no pen drive, no email."
  };
  for (var kf in EXTRA4) if (Object.prototype.hasOwnProperty.call(EXTRA4, kf)) EXTRA[kf] = EXTRA4[kf];


  /* EXTRA5 — plans v2 (Sep 2026): 6 plan, yearly, WL 3 plan, renewal, demo expired */
  var EXTRA5 = {
    "+%d din": "+%d days",
    "Saal ka": "Per year",
    "📅 Monthly": "📅 Monthly",
    "Har mahine": "Every month",
    "Ek baar pay": "Pay once",
    "♾️ Lifetime": "♾️ Lifetime",
    "₹%d har saal": "₹%d every year",
    "Renew Ho Gaya!": "Renewed!",
    "Advance unlocked": "Advance unlocked",
    "Premium, hamesha": "Premium, forever",
    "Sab feature free": "All features free",
    "📅 Monthly Renewal": "📅 Monthly Renewal",
    "🔄 Plan Renew Karo": "🔄 Renew Your Plan",
    "Starter ke feature": "Starter features",
    "🔑 Shop Login Kholo": "🔑 Open Shop Login",
    "Shop ab active hai.": "Shop is now active.",
    "%s: sahi price daalo": "%s: enter a valid price",
    "Pay Karke Renew Karo": "Pay and Renew",
    "Pay ₹%d — Renew Karo": "Pay ₹%d — Renew",
    "📆 %s — Yearly Renewal": "📆 %s — Yearly Renewal",
    "✅ 24 Ghante · 20 Print": "✅ 24 Hours · 20 Prints",
    "✅ Smart Scanner — FREE": "✅ Smart Scanner — FREE",
    "📆 %s Plan — Pehla Saal": "📆 %s Plan — First Year",
    "Renewal price set nahi hai": "Renewal price is not set",
    "♾️ Lifetime Plan — One-Time": "♾️ Lifetime Plan — One-Time",
    "Shop ab active hai — %s tak.": "Shop is now active — till %s.",
    "Ye one-time/lifetime NAHI hai.": "This is NOT a one-time/lifetime plan.",
    "Yearly — saal me ek baar renew": "Yearly — renew once a year",
    "Premium ke feature, ek baar pay": "Premium features, pay once",
    "✅ Premium ka sab kuch — Lifetime": "✅ Everything in Premium — Lifetime",
    "%s price ₹%d se kam nahi ho sakta": "%s price cannot be below ₹%d",
    "Yearly — aaj ka bhi, aane wala bhi": "Yearly — what exists today, and whatever comes next",
    "Is shop ka demo khatam ho gaya hai.": "This shop's demo has ended.",
    "Monthly price %d se kam nahi ho sakta": "Monthly price cannot be below %d",
    "Har mahine isi tarah renew karna hoga.": "Renew the same way every month.",
    "Har mahine renew — jab chaho band karo": "Renew every month — stop whenever you want",
    "Lifetime plan — renewal ki zaroorat nahi": "Lifetime plan — no renewal needed",
    "Yearly — Advance Feature already unlocked": "Yearly — Advance Feature already unlocked",
    "Agle saal phir isi tarah renew karna hoga.": "Next year, renew the same way.",
    "Shop abhi active nahi — pehle activate karo": "Shop is not active yet — activate it first",
    "%s Yearly Plan — Active till %s (%s din bache)": "%s Yearly Plan — Active till %s (%s days left)",
    "✅ Smart Scanner — Premium aur Lifetime me FREE": "✅ Smart Scanner — FREE in Premium and Lifetime",
    "Ek baar pay — hamesha ke liye, koi renewal nahi": "Pay once — for life, no renewal",
    "Ye shop abhi active nahi hui — pehle setup fee.": "This shop is not active yet — pay the setup fee first.",
    "karke shop ke PC me install karo (Windows 10 ya upar)": "and install it on the shop PC (Windows 10 or above)",
    "Ye shop lifetime plan par hai — renewal ki zaroorat nahi": "This shop is on a lifetime plan — no renewal needed",
    "Ye shop Lifetime plan par hai — renewal ki zaroorat nahi.": "This shop is on a Lifetime plan — no renewal needed.",
    "💻 Print Agent Software download karo (Windows 10 ya upar)": "💻 Download the Print Agent software (Windows 10 or above)",
    "Lifetime access — No renewal, na saal ka na mahine ka charge": "Lifetime access — no renewal, no yearly or monthly charge",
    "Is shop ka renewal price set nahi hai — support se baat karo.": "This shop's renewal price is not set — please contact support.",
    "— service active rakhne ke liye saal me ek baar renew karna hoga.": "— renew once a year to keep the service active.",
    "Pro aur Premium saal ke hain, Lifetime ek baar — koi renewal nahi.": "Pro and Premium are yearly, Lifetime is paid once — no renewal.",
    "Plan khatam ho chuka hai — prints band hain. Pay karte hi turant chalu.": "Your plan has ended — prints are stopped. Pay now and it starts immediately.",
    "Partner ki shop — renewal partner ke payment page se hoga (Renew button)": "Partner's shop — renew from the partner's payment page (Renew button)",
    "Abhi active hai %s tak. Abhi renew karoge to isi ke aage %d din jud jayenge.": "Active till %s. Renew now and %d more days are added after that.",
    "Starter ke saare feature, mahine ke hisaab se. Advance Feature isme nahi hai": "All Starter features, billed monthly. Advance Feature is not included",
    "Premium ke saare feature, ek baar ka paisa — na saal ka renewal, na mahine ka": "All Premium features, paid once — no yearly renewal, no monthly",
    "Jo bhi naya advance feature banega, apne aap mil jayega — saal me bas ek baar renew": "Every new advance feature comes to you automatically — just renew once a year",
    "Premium ke saare feature, ek baar ka paisa. Na saal ka renewal, na mahine ka — Lifetime access.": "All Premium features, paid once. No yearly renewal, no monthly — Lifetime access.",
    "Aaj ke bhi, kal ke bhi. Jo bhi naya advance feature banega, apne aap mil jayega — saal me bas ek baar renew.": "Today's and tomorrow's. Every new advance feature comes to you automatically — just renew once a year.",
    "Free demo se shuru karo. Phir Rs 99/month ka monthly plan, Rs 649/799/999 ke yearly plan (Starter/Pro/Premium), ya Rs 1999 one-time lifetime plan — ek baar do, hamesha chalao. Koi hidden charge nahi, koi per-print commission nahi.": "Start with the free demo. Then a Rs 99/month monthly plan, yearly plans at Rs 649/799/999 (Starter/Pro/Premium), or a Rs 1999 one-time lifetime plan — pay once, run forever. No hidden charge, no per-print commission."
  };
  for (var kEXTRA5 in EXTRA5) if (Object.prototype.hasOwnProperty.call(EXTRA5, kEXTRA5)) EXTRA[kEXTRA5] = EXTRA5[kEXTRA5];


  /* EXTRA6 — WhatsApp Se Print demo form + token (Sep 2026), WL price bina floor */
  var EXTRA6 = {
    "%s: price kam se kam ₹1 rakho": "%s: price must be at least ₹1",
    "Monthly price kam se kam ₹1 rakho": "Monthly price must be at least ₹1"
  };
  for (var kEXTRA6 in EXTRA6) if (Object.prototype.hasOwnProperty.call(EXTRA6, kEXTRA6)) EXTRA[kEXTRA6] = EXTRA6[kEXTRA6];

  /* EXTRA7 — shop panel ka naya design: login page + dashboard (Sep 2026) */
  var EXTRA7 = {
    "Apni dukaan aasaani se sambhalo": "Manage your shop easily",
    "Apne QR BD Shop Panel me login karo": "Login to your QR BD Shop Panel",
    "Apne customer ko QR BD ke saath seva do": "Serve your customers with QR BD",
    "Hazaaron ka bharosa": "Trusted by thousands",
    "Dukaan badhao": "Grow your business",
    "Customer QR scan karta hai": "Customer scans the QR",
    "File upload hoti hai": "File gets uploaded",
    "Print apne aap": "Prints automatically",
    "Sab haq surakshit.": "All rights reserved.",
    "Apni dukaan sambhalo, customer ko seva do, QR BD ke saath badho.": "Manage your shop, serve your customers, grow with QR BD.",
    "Surakshit": "Secure",
    "Regular Updates": "Regular updates",
    "Behtar Speed": "Better speed",
    "Customers ko QR page par dikhega": "Customers will see this on the QR page",
    "Ek click me download — phir file kholo, install apne aap ho jayega": "Download in one click — then open the file, it installs on its own"
  };
  for (var kEXTRA7 in EXTRA7) if (Object.prototype.hasOwnProperty.call(EXTRA7, kEXTRA7)) EXTRA[kEXTRA7] = EXTRA7[kEXTRA7];

  /* EXTRA9 — Partner dashboard (My Shops table, greeting) — Sep 2026 */
  var EXTRA9 = {
    "Apna brand chalao, shops jodo, aur har shop par kamao.": "Run your brand, add shops, and earn on every shop.",
    "Aapke brand se judi saari shops": "All shops under your brand",
    "Naam, ID ya number…": "Name, ID or number…"
  };
  for (var kEXTRA9 in EXTRA9) if (Object.prototype.hasOwnProperty.call(EXTRA9, kEXTRA9)) EXTRA[kEXTRA9] = EXTRA9[kEXTRA9];

  /* EXTRA8 — Partner (White Label) login page (Sep 2026) */
  var EXTRA8 = {
    "Apna brand, apni dukaanein": "Your brand, your shops",
    "Apne Partner Dashboard me login karo": "Login to your Partner Dashboard",
    "Apna Brand.": "Your Brand.",
    "Apna Daam.": "Your Price.",
    "Apna Munafa.": "Your Profit.",
    "Apne naam se shops jodo aur har shop par kamao": "Add shops under your own name and earn on every shop",
    "Aapka brand, hamara system": "Your brand, our system",
    "Apna brand aur logo": "Your own brand and logo",
    "Apna daam, apna margin": "Your price, your margin",
    "Har shop ki report": "Report for every shop",
    "Payment seedha aapke account me": "Payment straight to your account",
    "Shop jodo": "Add shops",
    "Apne brand se": "Under your brand",
    "Daam rakho": "Set the price",
    "Jo aap chaho": "Whatever you want",
    "Payment lo": "Take payment",
    "Seedha account me": "Straight to the account",
    "Report dekho": "See reports",
    "Har shop ki": "For every shop"
  };
  for (var kEXTRA8 in EXTRA8) if (Object.prototype.hasOwnProperty.call(EXTRA8, kEXTRA8)) EXTRA[kEXTRA8] = EXTRA8[kEXTRA8];

  /* EXTRA10 — demo success + payment success screen (work-39) */
  var EXTRA10 = {
    "Screenshot le lo ya Copy dabao. Password aapka mobile number hi hai — baad me dashboard se badal sakte ho.": "Take a screenshot or tap Copy. Your password is your mobile number — you can change it later from the dashboard.",
    "Print Agent pehli baar khulte hi yahi Shop ID maangta hai. Password wahi hai jo aapne registration ke waqt banaya tha.": "The Print Agent asks for this Shop ID the first time it opens. Your password is the one you created at registration."
  };
  for (var kEXTRA10 in EXTRA10) if (Object.prototype.hasOwnProperty.call(EXTRA10, kEXTRA10)) EXTRA[kEXTRA10] = EXTRA10[kEXTRA10];

  /* EXTRA11 — Mini Print Portrait/Landscape + summary (work-46) */
  var EXTRA11 = {
    "Sheet ka rukh": "Sheet orientation",
    "Apne aap chuna — jisme page sabse bade aayein": "Picked automatically — the one with the biggest pages",
    "Aap sirf {n} sheet ka paisa denge": "You only pay for {n} sheet",
    "Aap sirf {n} sheets ka paisa denge": "You only pay for {n} sheets",
    "Aap sirf {n} sheet ka paisa denge — abhi ke rate se {p}": "You only pay for {n} sheet — {p} at the current rate",
    "Aap sirf {n} sheets ka paisa denge — abhi ke rate se {p}": "You only pay for {n} sheets — {p} at the current rate",
    "Bachat: {n} sheet kam": "You save {n} sheet",
    "Bachat: {n} sheets kam": "You save {n} sheets"
  };
  for (var kEXTRA11 in EXTRA11) if (Object.prototype.hasOwnProperty.call(EXTRA11, kEXTRA11)) EXTRA[kEXTRA11] = EXTRA11[kEXTRA11];

  /* EXTRA12 — 4x6 Photo patti ka dropdown (work-47) */
  var EXTRA12 = {
    "Photos": "Photos",
    "Ek sheet par kitni photos": "Photos per sheet"
  };
  for (var kEXTRA12 in EXTRA12) if (Object.prototype.hasOwnProperty.call(EXTRA12, kEXTRA12)) EXTRA[kEXTRA12] = EXTRA12[kEXTRA12];

  /* EXTRA13 — work-52: Privacy note, ben7, is hafte, file note, daam ka %d roop */
  var EXTRA13 = {
    "Customer ki file sirf print hone tak rehti hai. Print hote hi wo delete ho jaati hai, aur kisi wajah se bachi hui har file usi raat 11:59 baje delete ho jaati hai. File ka koi backup nahi banta. Hum sirf job ka hisaab rakhte hain (pages, rakam, samay) — wo bhi har Sunday raat mit jaata hai. Card number ya UPI PIN hum kabhi nahi dekhte.": "A customer’s file stays only until it is printed. It is deleted the moment it prints, and any file left over for any reason is deleted the same night at 11:59. Files are never backed up. We keep only the job’s accounts (pages, amount, time) — and even that is cleared every Sunday night. We never see card numbers or UPI PINs.",
    "File print hote hi KHUD delete — aur bachi hui har file raat 11:59 baje. Na aapke paas rahegi, na kisi aur ke — privacy pakki.": "The file deletes itself the moment it prints — and any leftover file at 11:59 PM. It won't stay with you or anyone else — privacy guaranteed.",
    "Is Hafte Orders": "This Week's Orders",
    "Is Hafte Kamai": "This Week's Earnings",
    "Sunday raat 11:59 ke baad 0 se shuru": "Starts again from 0 after Sunday 11:59 PM",
    "⏳ Print hote hi file delete ho jaayegi — warna raat 11:59 baje khud": "⏳ The file will be deleted as soon as it prints — otherwise automatically at 11:59 PM",
    "%d din me ✅": "In %d days ✅",
    "Free demo se shuru karo. Phir Rs %d/month ka monthly plan, Rs %d/%d/%d ke yearly plan (Starter/Pro/Premium), ya Rs %d one-time lifetime plan — ek baar do, hamesha chalao. Koi hidden charge nahi, koi per-print commission nahi.": "Start with the free demo. Then a Rs %d/month monthly plan, yearly plans at Rs %d/%d/%d (Starter/Pro/Premium), or a Rs %d one-time lifetime plan — pay once, run forever. No hidden charge, no per-print commission.",
    "₹%d — EK baar": "₹%d — ONE time",
    "Free demo se shuru karo. Phir Rs %d/month ka monthly plan, Rs %d ka yearly plan, ya Rs %d one-time lifetime plan — ek baar do, hamesha chalao. Koi hidden charge nahi, koi per-print commission nahi.": "Start with the free demo. Then a Rs %d/month monthly plan, a yearly plan at Rs %d, or a Rs %d one-time lifetime plan — pay once, run forever. No hidden charge, no per-print commission.",
    "WhatsApp me aapka personal number public ho jata hai, chat me files kho jaati hain, aur hisaab manually rakhna padta hai. QR BD me number private rehta hai, har print ka payment record automatic banta hai, aur customer ki file print hote hi khud delete ho jaati hai.": "On WhatsApp your personal number becomes public, files get lost in the chat, and the accounts have to be kept by hand. With QR BD your number stays private, every print gets a payment record automatically, and the customer's file deletes itself as soon as it is printed."
  };
  for (var kEXTRA13 in EXTRA13) if (Object.prototype.hasOwnProperty.call(EXTRA13, kEXTRA13)) EXTRA[kEXTRA13] = EXTRA13[kEXTRA13];

  /* EXTRA14 — work-53: digital signature ka status */
  var EXTRA14 = {
    "🔏 Digital signature check ho raha hai...": "🔏 Checking digital signature...",
    "Digital signature verify ho gaya": "Digital signature verified",
    "Digital signature valid hai": "Digital signature is valid",
    "Digital signature verify nahi hua": "Digital signature could not be verified",
    "Print me “?” ki jagah ✔ “Signature valid” aayega — jaise Adobe me verify karne par aata hai.": "The print will show ✔ “Signature valid” instead of “?” — just like after verifying in Adobe.",
    "Sign ke baad document me badlav hua hai.": "The document was changed after it was signed.",
    "Sign ke baad document me kuch joda gaya hai.": "Something was added to the document after it was signed.",
    "Certificate kisi bharosemand (CCA India) authority se nahi mila.": "The certificate does not come from a trusted (CCA India) authority.",
    "Sign ke din certificate valid nahi tha.": "The certificate was not valid on the signing date.",
    "Is signature ka format check nahi ho paaya.": "This signature's format could not be checked.",
    "File waise hi print hogi — ✔ nahi lagega.": "The file will print as it is — no ✔ will be added."
  };
  for (var kEXTRA14 in EXTRA14) if (Object.prototype.hasOwnProperty.call(EXTRA14, kEXTRA14)) EXTRA[kEXTRA14] = EXTRA14[kEXTRA14];

  /* EXTRA15 — work-54: 4 step design */
  var EXTRA15 = {
    "👀 Print Preview aur Options": "👀 Print Preview & Options",
    "⚙️ Print ka Type": "⚙️ Print Type",
    "💳 Payment ka Tareeka": "💳 Payment Method",
    "Counter par Pay": "Pay at Counter",
    "Seedha shop par paise do": "Pay directly at shop",
    "Online Pay": "Pay Online",
    "Abhi pay karo, turant print": "Pay now & get instant print",
    "💳 Confirm karke Pay": "💳 Confirm & Pay",
    "⏳ Upload ho raha hai…": "⏳ Uploading…",
    "⚠️ Payment ka tareeka chuno": "⚠️ Choose a payment method",
    "Ek baar me zyada se zyada %d kagaz — isse zyada counter par karwa lo.": "At most %d sheets at a time — get the rest printed at the counter.",
    "Ek baar me zyada se zyada %d kagaz print ho sakte hain. Copies kam karo, ya baaki print counter par karwa lo.": "At most %d sheets can be printed at a time. Reduce the copies, or get the rest printed at the counter."
  };
  for (var kEXTRA15 in EXTRA15) if (Object.prototype.hasOwnProperty.call(EXTRA15, kEXTRA15)) EXTRA[kEXTRA15] = EXTRA15[kEXTRA15];

  /* EXTRA16 — work-55: asli file, Word/Excel/PPT, iPhone photo */
  var EXTRA16 = {
    "PDF, JPG, PNG, iPhone photo — sab supported": "PDF, JPG, PNG, iPhone photo — all supported",
    "PDF, photo, Word, Excel, PowerPoint — sab supported": "PDF, photo, Word, Excel, PowerPoint — all supported",
    "⏳ iPhone photo khul rahi hai...": "⏳ Opening the iPhone photo...",
    "❌ iPhone photo nahi khul payi — JPG photo bhejo": "❌ Could not open the iPhone photo — please send a JPG photo",
    "❌ Is shop par Word / Excel / PowerPoint file abhi nahi chhapti — PDF bana kar bhejo": "❌ This shop cannot print Word / Excel / PowerPoint files yet — please send a PDF",
    "❌ Shop ka computer abhi band hai — Word / Excel / PowerPoint ke liye wo chalu hona chahiye. PDF bhejo ya thodi der baad try karo.": "❌ The shop's computer is off right now — it must be on for Word / Excel / PowerPoint. Send a PDF or try again a little later.",
    "❌ File khaali hai": "❌ The file is empty",
    "⏳ File shop ke computer par ja rahi hai...": "⏳ Sending the file to the shop's computer...",
    "⏳ Shop ke computer par PDF ban rahi hai...": "⏳ The shop's computer is making the PDF...",
    "❌ Shop ke computer tak file nahi pahunchi": "❌ The file did not reach the shop's computer",
    "❌ Shop ke computer ne jawab nahi diya — PDF bhejo": "❌ The shop's computer did not respond — please send a PDF",
    "❌ PDF nahi aa payi — dobara try karo": "❌ Could not get the PDF — please try again",
    "✅ PDF taiyaar — %d page": "✅ PDF ready — %d page(s)",
    "Network error — internet check karo": "Network error — check your internet",
    "Upload start nahi hua": "Upload could not start",
    "Page nahi ban paya": "The page could not be prepared"
  };
  for (var kEXTRA16 in EXTRA16) if (Object.prototype.hasOwnProperty.call(EXTRA16, kEXTRA16)) EXTRA[kEXTRA16] = EXTRA16[kEXTRA16];

  /* EXTRA17 — work-56: registration fee Cashfree/Razorpay switch */
  var EXTRA17 = {
    "⏳ Payment abhi confirm nahi hua. Paisa kat gaya ho to ye page ek minute baad refresh karo — apne aap ho jayega. Phir bhi na ho to partner se baat karo.": "⏳ Payment not confirmed yet. If money was deducted, refresh this page after a minute — it will complete on its own. If it still doesn't, contact your partner.",
    "⏳ Payment abhi confirm nahi hua. Paisa kat gaya ho to ye page ek minute baad refresh karo — apne aap ho jayega. Phir bhi na ho to support se baat karo.": "⏳ Payment not confirmed yet. If money was deducted, refresh this page after a minute — it will complete on its own. If it still doesn't, contact support.",
    "❌ Cashfree se order nahi bana — thodi der baad dobara try karo. Phir bhi na bane to support se baat karo.": "❌ Could not create the Cashfree order — please try again in a little while. If it still fails, contact support."
  };
  for (var kEXTRA17 in EXTRA17) if (Object.prototype.hasOwnProperty.call(EXTRA17, kEXTRA17)) EXTRA[kEXTRA17] = EXTRA17[kEXTRA17];

  /* EXTRA18 — work-60: Passport Photo (4×6 / A4), Auto Crop Aadhar Pan Voter */
  var EXTRA18 = {
    "Passport size photos — 4×6 ya A4 sheet": "Passport-size photos — on a 4×6 or A4 sheet",
    "Auto Crop Aadhar Pan Voter": "Auto Crop Aadhaar PAN Voter",
    "📸 Auto Crop Aadhar Pan Voter": "📸 Auto Crop Aadhaar PAN Voter",
    "Card ki photo — apne aap crop, saaf scan jaisa page": "Photo of a card — auto-cropped, a clean scan-like page",
    "Kaunsa page chahiye?": "Which page do you need?",
    "Passport photo kis kagaz par nikalni hai": "Which paper should the passport photos be printed on?",
    "Kitni photos chahiye": "How many photos",
    "➕ Aur photo jodo": "➕ Add another photo",
    "Kul %d photos · %d line": "Total %d photos · %d line(s)",
    "⚠️ Sheet bhar gayi (40 photos) — kisi photo ki copies kam karo": "⚠️ The sheet is full (40 photos) — reduce the copies of a photo",
    "⚠️ Ek A4 par 40 photo se zyada nahi aati": "⚠️ An A4 sheet holds at most 40 photos",
    "✅ A4 passport sheet ready! Aage badho": "✅ A4 passport sheet ready! Continue",
    "✅ Photo jud gayi": "✅ Photo added"
  };
  for (var kEXTRA18 in EXTRA18) if (Object.prototype.hasOwnProperty.call(EXTRA18, kEXTRA18)) EXTRA[kEXTRA18] = EXTRA18[kEXTRA18];

  /* EXTRA19 — work-63: order number */
  var EXTRA19 = {
    "Aapka Order Number": "Your Order Number",
    "Ye number yaad rakho — shop par poochne par bata dena": "Remember this number — tell it at the shop if asked"
  };
  for (var kEXTRA19 in EXTRA19) if (Object.prototype.hasOwnProperty.call(EXTRA19, kEXTRA19)) EXTRA[kEXTRA19] = EXTRA19[kEXTRA19];

  /* EXTRA20 — work-64: Set Price tab, A4 passport price */
  var EXTRA20 = {
    "Passport Photo Sheet (A4)": "Passport Photo Sheet (A4)",
    "File phone se padh nahi payi. Use pehle Downloads / Files me save karo, phir dobara chuno.": "Could not read the file from your phone. Save it to Downloads / Files first, then choose it again.",
    "Set Price": "Set Price",
    "Refer and Earn": "Refer and Earn",
    "Give A Review": "Give A Review",
    "Sab daam ek hi jagah — normal, duplex, bade size, photo, resume aur passport. Yahin set karo, customer ko yahi rate lagega.": "All prices in one place — normal, duplex, big size, photo, resume and passport. Set them here; customers are charged exactly these rates.",
    "🪪 PASSPORT PHOTO — A4 SHEET (₹ per sheet)": "🪪 PASSPORT PHOTO — A4 SHEET (₹ per sheet)",
    "Range ka fixed price": "fixed for this range",
    "Ek A4 sheet par passport photos (30×39 mm, 40 tak). Teen tareeke hain — jo chahiye ON karo, baaki OFF. Ek se zyada ON ho to pehle photo-range, phir har-photo, phir sheet ka rate lagta hai. Sab OFF = aapka Color per-page rate.": "Passport photos on one A4 sheet (30×39 mm, up to 40). Three ways — turn ON what you need, keep the rest OFF. If more than one is ON: photo-range first, then per-photo, then per-sheet. All OFF = your Color per-page rate.",
    "1. Har photo ka rate": "1. Rate per photo",
    "2. Poori A4 sheet ka rate": "2. Rate per whole A4 sheet",
    "3. Photo-range ke hisaab se": "3. By photo range",
    "Har range ka rate (₹ per photo) bharo — calculation (range ke aakhri photo tak) turant dikhta hai. Calculation badal kar apna total bhi set kar sakte ho: us range ka bill wahi hoga. Na badlo to bill = photo × rate.": "Enter each range's rate (₹ per photo) — the calculation (up to the range's last photo) shows instantly. You can edit the calculated total to set your own: that range will be billed exactly that. If you don't edit it, bill = photos × rate.",
    "Calculation: range ke aakhri page × rate = total. Total badal kar apna fixed bill bhi set kar sakte ho — us range me aane wale har bill me wahi total lagega. Na badlo to bill = page × rate.": "Calculation: the range's last page × rate = total. You can edit the total to set your own fixed bill — every bill in that range will use exactly that total. If you don't edit it, bill = pages × rate.",
    "Duplex abhi band hai — ye daam save ho jayega, Duplex chalu karne par hi customer ko lagega.": "Duplex is off right now — this rate will be saved and applied once you turn Duplex on.",
    "💾 Sab Price Save Karo": "💾 Save All Prices",
    "✅ Price save ho gaye!": "✅ Prices saved!",
    "Advance Feature ke daam bhi yahin bhar sakte ho — unlock hone par customer ko lagenge.": "You can fill the Advance Feature rates here too — they apply to customers once Advance is unlocked.",
    "Sab daam ab Set Price tab me hain.": "All prices are now in the Set Price tab.",
    "Set Price kholo": "Open Set Price"
  };
  for (var kEXTRA20 in EXTRA20) if (Object.prototype.hasOwnProperty.call(EXTRA20, kEXTRA20)) EXTRA[kEXTRA20] = EXTRA20[kEXTRA20];

  /* EXTRA21 — work-64: upload error ke saaf message */
  var EXTRA21 = {
    "File khaali hai (0 KB). Sahi file chuno.": "The file is empty (0 KB). Choose the right file.",
    "PDF kharab ya adhoori hai (poori download nahi hui?). Use dobara download karke try karo.": "The PDF is damaged or incomplete (did the download finish?). Download it again and retry.",
    "Phone ki memory kam padi. File chhoti karo (kam pages) ya kisi aur phone / computer se bhejo.": "The phone ran out of memory. Use a smaller file (fewer pages) or send from another phone / computer.",
    "Is shop par ek file me {n} page tak hi chhap sakte hain. Aapki file me {m} page hain — kuch pages alag karke bhejo.": "This shop prints up to {n} pages per file. Your file has {m} pages — split it and send in parts."
  };
  for (var kEXTRA21 in EXTRA21) if (Object.prototype.hasOwnProperty.call(EXTRA21, kEXTRA21)) EXTRA[kEXTRA21] = EXTRA21[kEXTRA21];

  /* EXTRA22 — work-64: Shop Info */
  var EXTRA22 = {
    "ⓘ Shop Info": "ⓘ Shop Info",
    "Rates": "Rates",
    "Payment": "Payment",
    "Online + Counter": "Online + Counter",
    "Online only": "Online only",
    "Counter only": "Counter only",
    "Close": "Close",
    "page": "page",
    "sheet": "sheet"
  };
  for (var kEXTRA22 in EXTRA22) if (Object.prototype.hasOwnProperty.call(EXTRA22, kEXTRA22)) EXTRA[kEXTRA22] = EXTRA22[kEXTRA22];

  /* EXTRA23 — work-64: CCAvenue / PayU */
  var EXTRA23 = {
    "CCAvenue Merchant ID": "CCAvenue Merchant ID",
    "CCAvenue Access Code": "CCAvenue Access Code",
    "CCAvenue Working Key": "CCAvenue Working Key",
    "PayU Merchant Key": "PayU Merchant Key",
    "PayU Salt": "PayU Salt",
    "Mode": "Mode",
    "Live (asli paisa)": "Live (real money)",
    "Test (sirf jaanch ke liye)": "Test (for checking only)",
    "✅ Working Key already set hai (khali rakho agar change nahi karna)": "✅ Working Key is already set (leave blank to keep it)",
    "✅ Salt already set hai (khali rakho agar change nahi karna)": "✅ Salt is already set (leave blank to keep it)",
    "🔗 CCAvenue Dashboard Kholo": "🔗 Open CCAvenue Dashboard",
    "🔗 PayU Dashboard Kholo": "🔗 Open PayU Dashboard",
    "❌ Payment nahi hui — dobara try karo ya counter par pay karo": "❌ Payment did not go through — try again or pay at the counter",
    "💳 Payment page khul raha hai...": "💳 Opening the payment page..."
  };
  for (var kEXTRA23 in EXTRA23) if (Object.prototype.hasOwnProperty.call(EXTRA23, kEXTRA23)) EXTRA[kEXTRA23] = EXTRA23[kEXTRA23];

  /* EXTRA24 — work-65: International link */
  var EXTRA24 = {
    "🌍 Shop outside India? Register here": "🌍 Shop outside India? Register here"
  };
  for (var kEXTRA24 in EXTRA24) if (Object.prototype.hasOwnProperty.call(EXTRA24, kEXTRA24)) EXTRA[kEXTRA24] = EXTRA24[kEXTRA24];

  /* EXTRA25 — work-65: partner PayU/CCAvenue */
  var EXTRA25 = {
    "❌ Payment nahi hui — dobara try karo": "❌ Payment did not go through — please try again",
    "❌ Payment page nahi khul paya — dobara try karo": "❌ The payment page could not open — please try again"
  };
  for (var kEXTRA25 in EXTRA25) if (Object.prototype.hasOwnProperty.call(EXTRA25, kEXTRA25)) EXTRA[kEXTRA25] = EXTRA25[kEXTRA25];

  /* EXTRA26 — work-65: homepage PayU / CCAvenue */
  var EXTRA26 = {
    "We support payments from Razorpay, Cashfree, PayU and CCAvenue": "We support payments from Razorpay, Cashfree, PayU and CCAvenue"
  };
  for (var kEXTRA26 in EXTRA26) if (Object.prototype.hasOwnProperty.call(EXTRA26, kEXTRA26)) EXTRA[kEXTRA26] = EXTRA26[kEXTRA26];

  /* EXTRA27 — work-65: homepage International banner */
  var EXTRA27 = {
    "Want to Try Outside India?": "Want to Try Outside India?",
    "Available for international users and businesses.": "Available for international users and businesses.",
    "Want to Try Outside India →": "Want to Try Outside India →"
  };
  for (var kEXTRA27 in EXTRA27) if (Object.prototype.hasOwnProperty.call(EXTRA27, kEXTRA27)) EXTRA[kEXTRA27] = EXTRA27[kEXTRA27];

  /* EXTRA28 — work-66 (21 Oct 2026): homepage English saaf. Hinglish key jyon ki tyon (baaki bhasha ki key match karti rahe);
     sirf English value theek ki / jodi. Ek sentence kai text-node me bata ho to har node ka English aise likha hai ki jodne par poora vaakya bane. */
  var EXTRA28 = {
    "Customer ke phone se": "From the customer's phone",
    "Print seedha aapke printer par": "Print straight to your printer",
    "Main": "I'm",
    "Ye guide aapko": "This guide walks you",
    "dikhayega ki payment complete karne ke baad Shop ID milne se lekar pehla test print nikalne tak kya-kya karna hai. Har step ko order me follow karo — kahin atko to sabse neeche Support section me contact ka tarika bhi diya hai.": "through everything you need to do, from getting your Shop ID after payment to taking your first test print. Follow the steps in order — and if you get stuck, the Support section at the bottom has the contact details.",
    "Apni Shop ID aur password se": "With your Shop ID and password, use",
    "karo. Login hote hi aap seedha apne Shop Dashboard me pahunch jaoge.": "to continue. As soon as you log in, you land right on your Shop Dashboard.",
    "Browser me apne Shop Dashboard se ek baar": "In the browser, from your Shop Dashboard, just",
    "Settings me jaao —": "Go to Settings — under",
    "ke liye ek printer aur": "choose one printer, and under",
    "ke liye ek printer select karo. Agar dukaan me sirf ek hi printer hai, to dono jagah wahi printer select kar do. Phir": "choose another. If the shop has only one printer, select that same printer in both places. Then press the",
    "dabao.": "button.",
    "par jaakar apna account banao.": "— create your account there.",
    "GST ya current account nahi hai? Koi baat nahi —": "No GST or current account? No problem — choose the",
    "category chuno. Savings account aur PAN card se hi ho jaata hai.": "category. A savings account and PAN card are enough.",
    "Account active hone ke baad:": "Once the account is active, go to",
    "me jaakar apni": "and generate your",
    "generate karo.": "now.",
    "me jaao, aur wahan": "and then select",
    "select karo.": "option.",
    "Razorpay se generate ki hui": "Copy the",
    "copy karke yahan paste karo, phir": "you generated in Razorpay, paste them here, then press the",
    "karo.": "button.",
    "Kahin nahi. File server par sirf print hone tak rehti hai — print command chalte hi turant delete command chal jaata hai, aur file": "Nowhere. The file stays on the server only until it's printed — the moment the print command runs, a delete command runs and the file is",
    "mit jaati hai.": "erased.",
    "Do tarike hain — (1) apne Shop Dashboard ke Support tab me": "Two ways — (1) in the Support tab of your Shop Dashboard, use the",
    "button se seedha message karo, ya (2) System Tray me icon par right-click karke": "button to message us directly, or (2) right-click the icon in the System Tray and press",
    "dabao. Dono se seedha admin tak baat pahunchti hai.": "button. Both reach the admin directly.",
    "✅ Aane wale SAARE naye feature — FREE": "✅ ALL upcoming new features — FREE",
    "Card, UPI aur net-banking ki detail seedha payment company ke apne secure page par jaati hai — QR BD use kabhi dekhta ya store nahi karta.": "Your card, UPI and net-banking details go straight to the payment company's own secure page — QR BD never sees or stores them.",
    "15 × ₹5 = ₹75/din": "15 × ₹5 = ₹75/day",
    "Call: 9am – 9pm · Message: 24 ghante": "Call: 9am – 9pm · Message: 24 hours",
    "Apna personal number har customer ko dena padta hai. Chat me files kho jaati hain, \"bhaiya wo wali file\" dhundhte raho.": "You have to give your personal number to every customer. Files get lost in chat, and you keep searching for \"that file, bro\".",
    "%s Ghanta FREE Demo": "%s-Hour FREE Demo",
    "%s Min FREE Demo": "%s-Minute FREE Demo",
    "Working hours me kuch hi minute lagte hain. Shop ID aur password": "It takes only a few minutes during working hours. Your Shop ID and password will be sent",
    "WhatsApp par": "on WhatsApp",
    "%d par aa jayenge.": "to %d.",
    "🤝 ke through aaye ho — aapke liye special price": "🤝 You came through a referral — special price for you",
    "🤝 %ske through aaye ho — aapke liye special price": "🤝 %sreferred you — special price for you"
  };
  for (var kEXTRA28 in EXTRA28) if (Object.prototype.hasOwnProperty.call(EXTRA28, kEXTRA28)) EXTRA[kEXTRA28] = EXTRA28[kEXTRA28];

  /* EXTRA29 — work-69: Monthly plan ab 'sab kuch' */
  var EXTRA29 = {
    "Saare Advance Feature + Smart Scanner + aane wale naye feature — sab FREE, mahine ke hisaab se": "All Advance features + Smart Scanner + all upcoming new features — all FREE, billed monthly"
  };
  for (var kEXTRA29 in EXTRA29) if (Object.prototype.hasOwnProperty.call(EXTRA29, kEXTRA29)) EXTRA[kEXTRA29] = EXTRA29[kEXTRA29];

  function install() {
    if (window.QSPi18n && typeof window.QSPi18n.addDict === 'function') {
      window.QSPi18n.addDict(EXTRA);
      wrapDialogs();
    } else {
      // i18n.js abhi load nahi hua — dict me pehle se daal do,
      // wo start hote hi ise utha lega.
      window.QSP_EN_DICT = window.QSP_EN_DICT || {};
      for (var k in EXTRA) if (EXTRA.hasOwnProperty(k)) window.QSP_EN_DICT[k] = EXTRA[k];
    }
  }
  install();
  // defer/async ke order ke liye — agar i18n baad me aaya to dobara laga do
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install);
  }
})();
