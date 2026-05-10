import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-primary-dark text-white mt-20"
      role="contentinfo"
      aria-label="כותרת תחתונה"
    >
      <div className="container-content py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-4 text-white">
              <span aria-hidden="true">🌿</span>
              <span>חוות דניאל</span>
            </div>
            <p className="text-primary-light/90 text-sm leading-relaxed">
              בית הקברות הראשון לחיות מחמד בישראל. מאז 1973, אנו מלווים
              משפחות בפרידה מבעלי החיים האהובים שלהן בכבוד ובאהבה.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-white">ניווט</h2>
            <ul className="space-y-2 text-primary-light/90 text-sm">
              <li><Link href="/" className="hover:text-white">דף הבית</Link></li>
              <li><Link href="/services" className="hover:text-white">השירותים שלנו</Link></li>
              <li><Link href="/sections" className="hover:text-white">חלקות הקבורה</Link></li>
              <li><Link href="/gallery" className="hover:text-white">גלריה</Link></li>
              <li><Link href="/about" className="hover:text-white">אודות</Link></li>
              <li><Link href="/contact" className="hover:text-white">צור קשר</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-white">צרו קשר</h2>
            <ul className="space-y-3 text-primary-light/90 text-sm">
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📞</span>
                <a href="tel:0523288557" className="hover:text-white" aria-label="התקשרו אלינו">
                  052-3288557
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">💬</span>
                <a
                  href="https://wa.me/9720523288557"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                  aria-label="שלחו ווטסאפ"
                >
                  שליחת ווטסאפ
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">📍</span>
                <span>ליד תל השומר, גוש דן</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden="true">🕐</span>
                <span>ביקורים בתיאום טלפוני בלבד</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4 text-white">מידע נוסף</h2>
            <ul className="space-y-2 text-primary-light/90 text-sm">
              <li>
                <Link href="/accessibility" className="hover:text-white">
                  הצהרת נגישות
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  הסיפור שלנו
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-primary-light/70 text-xs leading-relaxed">
              בעלים: דניאל שאול<br />
              מתגורר בחווה — השגחה צמודה 24/7
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-primary-light/70 text-sm">
          <p>© {year} חוות דניאל — מנוחת החיות. כל הזכויות שמורות.</p>
          <p className="mt-1 text-xs">פועלת ברציפות מאז 1973</p>
        </div>
      </div>
    </footer>
  );
}
