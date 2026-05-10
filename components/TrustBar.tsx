const items = [
  { icon: '🕊️', label: '50+ שנות ניסיון' },
  { icon: '📍', label: 'ממוקם בגוש דן' },
  { icon: '🛡️', label: 'השגחה צמודה 24/7' },
  { icon: '🤝', label: 'יחס אישי לכל משפחה' },
];

export default function TrustBar() {
  return (
    <section
      className="bg-white border-y border-primary-light"
      aria-label="ערכים ויתרונות"
    >
      <div className="container-content py-8 md:py-10">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center">
          {items.map((item) => (
            <li
              key={item.label}
              className="flex flex-col items-center justify-center gap-2"
            >
              <span className="text-3xl md:text-4xl" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-sm md:text-base font-medium text-primary-dark">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
