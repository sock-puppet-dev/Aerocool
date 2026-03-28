1️⃣ Hero / LCP изображение, указываем loading="eager", остальные изображения — "lazy".

{{< seo-image 
  src="hero.png"
  width="1920"
  height="1080"
  alt="Игровое кресло Aerocool Baron — эргономичная модель для офиса и гейминга"
  title="Игровое кресло Aerocool Baron"
  loading="eager"
  preload=true
  fetchpriority=high
  class="w-full rounded-2xl shadow-xl"
  sizes="100vw"
  jsonld=true
/>}}

	•	PNG 1920×1080 → идеальный source для LCP, идеальный source (lossless)
	•	loading="eager" + preload=true + fetchpriority=high → Hero загружается первым
	•	width/height + aspect-ratio → устраняет, фиксирует CLS,  
	•	JSON-LD → SEO для Google Rich Snippets, улучшает SEO (Google Images + Rich Results)
	•	sizes="100vw" → адаптивность под любые экраны

2️⃣ Основное изображение товара

{{< seo-image 
  src="product.png"
  width="1200"
  height="800"
  alt="Эргономичное игровое кресло Aerocool Baron"
  title="Игровое кресло Aerocool Baron"
  loading="lazy"
  preload=false
  fetchpriority=auto
  class="w-full rounded-2xl shadow-lg"
  sizes="(max-width: 768px) 100vw, 1200px"
/>}}

	•	PNG 1200×800 → оптимальный source для контента
	•	loading="lazy" → экономия трафика
	•	sizes → адаптивная подгрузка разных размеров (srcset), браузер выбирает правильный размер
	•	srcset (из shortcode) → адаптивная загрузка уменьшает: трафик, TTFB не трогает, 
        но ↓ download time, улучшает INP и LCP косвенно

3️⃣ Второстепенное / боковое изображение

{{< seo-image 
  src="product-side.png"
  width="800"
  height="600"
  alt="Боковой вид кресла Aerocool Baron"
  title="Боковой вид кресла Aerocool Baron"
  loading="lazy"
  preload=false
  fetchpriority=auto
  class="w-full rounded-xl"
  sizes="(max-width: 768px) 100vw, 800px"
/>}}

	•	PNG 800×600 → идеальный source для галереи/карточек
	•	loading="lazy" + адаптивные размеры через sizes → быстрый рендер и экономия LCP
	•	маленький вес → быстрее загрузка страницы
	•	визуальная иерархия (меньше тень/радиус)

Параметр		Значение		Для чего
src 			путь к PNG 		исходник (source)
alt 			описание 		SEO + accessibility
title 			заголовок 		UX + доп. SEO
width 			ширина 			убирает CLS
height 			высота 			убирает CLS
loading 		eager / lazy 	управление загрузкой
preload 		true / false 	ускоряет LCP
fetchpriority 	high / auto 	приоритет загрузки
sizes 			media query 	адаптивность
class 			Tailwind 		UI / UX
jsonld 			true / false 	structured data

Рекомендуемые размеры:
Hero / LCP = 					1920x1080
Основное изображение = 			1200x800
Второстепенное изображение = 	800x600

!!! Оставь: (основной язык) → jsonld=true, второй язык → jsonld=false
