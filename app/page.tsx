export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-100)]">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-primary-200)] rounded-full mix-blend-multiply filter blur-3xl animate-[float_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-primary-300)] rounded-full mix-blend-multiply filter blur-3xl animate-[float_8s_ease-in-out_infinite_2s]" />
        </div>

        {/* 內容 */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 font-[var(--font-heading)] text-[var(--color-neutral-900)]"
            style={{ animation: 'fadeInUp 1s ease-out' }}
          >
            您的衣物，我們的藝術
          </h1>
          <p
            className="text-xl md:text-2xl text-[var(--color-neutral-600)] mb-12 max-w-2xl mx-auto"
            style={{ animation: 'fadeInUp 1s ease-out 0.2s backwards' }}
          >
            專業洗護每件衣物，用心呵護您的美好回憶
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: 'fadeInUp 1s ease-out 0.4s backwards' }}
          >
            <a
              href="/contact"
              className="px-8 py-4 bg-[var(--color-primary-500)] text-white rounded-full font-medium text-lg hover:bg-[var(--color-primary-600)] transition-all hover:scale-105 hover:shadow-2xl shadow-[var(--color-primary-500)]"
            >
              立即預約收送
            </a>
            <a
              href="/services"
              className="px-8 py-4 border-2 border-[var(--color-primary-500)] text-[var(--color-primary-600)] rounded-full font-medium text-lg hover:bg-[var(--color-primary-50)] transition-all hover:scale-105"
            >
              了解服務項目
            </a>
          </div>
        </div>

        {/* 滾動提示 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[var(--color-primary-500)]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* 服務特色 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-[var(--font-heading)] text-[var(--color-neutral-900)]">
              為什麼選擇我們
            </h2>
            <p className="text-[var(--color-neutral-600)] text-lg max-w-2xl mx-auto">
              專業設備、環保理念、貼心服務，全方位守護您的衣物
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: '專業設備', desc: '引進日本先進洗衣設備，確保洗淨效果' },
              { icon: '🌿', title: '環保洗劑', desc: '使用環保認證洗劑，對衣物溫和不傷害' },
              { icon: '🚚', title: '到府收送', desc: '免費到府收送服務，節省您寶貴時間' },
              { icon: '✅', title: '品質保證', desc: '專人品檢每件衣物，確保完美交付' },
              { icon: '⚡', title: '急件處理', desc: '提供24小時急件服務，滿足緊急需求' },
              { icon: '💰', title: '價格透明', desc: '明碼標價，絕無隱藏費用' },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white border-2 border-[var(--color-neutral-100)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards` }}
              >
                <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--color-neutral-900)] font-[var(--font-heading)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-neutral-600)]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 溫馨小故事 */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-primary-50)] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-[var(--font-heading)] text-[var(--color-neutral-900)]">
              溫馨小故事
            </h2>
            <p className="text-[var(--color-neutral-600)] text-lg max-w-2xl mx-auto">
              每件衣物背後，都有一段值得珍藏的故事
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '💍',
                title: '那件婚紗的重生',
                content: '李小姐珍藏了20年的婚紗，因為時間久遠而泛黃。經過我們的專業處理，婚紗重現當年的純白光澤，讓她能夠將這份美好傳承給女兒。'
              },
              {
                icon: '🎩',
                title: '爺爺的西裝',
                content: '張先生帶來了已故爺爺生前最愛的西裝，希望能在追思會上穿著。我們用最溫柔的手法清潔保養，讓這份思念得以延續。'
              },
              {
                icon: '👗',
                title: '第一次約會的裙子',
                content: '陳小姐不小心在重要約會前把咖啡灑在新買的白裙子上。我們的急件除汙服務，讓她能夠自信地赴約，最後還促成了一段美好姻緣！'
              },
            ].map((story, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.15}s backwards` }}
              >
                <div className="text-6xl mb-6 text-center">{story.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-center text-[var(--color-neutral-900)] font-[var(--font-heading)]">
                  {story.title}
                </h3>
                <p className="text-[var(--color-neutral-600)] leading-relaxed text-center">
                  {story.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 font-[var(--font-heading)]">
            準備好讓衣物煥然一新了嗎？
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            立即預約到府收送服務，讓專業團隊為您的衣物提供最佳照護
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-[var(--color-primary-600)] rounded-full font-bold text-lg hover:bg-[var(--color-neutral-100)] transition-all hover:scale-105 shadow-2xl"
          >
            立即預約 →
          </a>
        </div>
      </section>
    </div>
  );
}
