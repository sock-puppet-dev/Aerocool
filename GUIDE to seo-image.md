Пример Hero/LCP (Largest Contentful Paint) главное изображение, обложка
Для главного изображения страницы указываем loading="eager", остальные изображения — lazy.

{{\< seo-image 
	src="hero-chair.jpg" 
	alt="Главное изображение кресла Aerocool" 
	title="Главное изображение кресла Aerocool" 
	width="1920" 
	height="1080" 
	loading="eager"
	preload=true
	fetchpriority=high
/\>}}

Пример использования изображения в контенте:

{{\< seo-image 
	src="product-chair.jpg" 
	alt="Эргономичное игровое кресло Aerocool" 
	title="Игровое кресло Aerocool Baron" 
	width="1200" 
	height="800" 
	loading="lazy" 
	preload=false
	fetchpriority=auto
/\>}}

Пример использования изображения в карточке товара:

{{\< seo-image 
	src="product-chair-side.jpg" 
	alt="Боковой вид кресла Aerocool" 
	title="Боковой вид кресла Aerocool" 
	width="800" 
	height="600" 
	loading="lazy"
	preload=false
	fetchpriority=auto
/\>}}

Параметр: 	Значение:					Для чего:
src 		Путь к изображению  		Основной файл изображения
alt  		Текстовое описание 			SEO + доступность
title 	 	Заголовок изображения 	 	SEO, всплывающая подсказка
width 		Ширина 						CLS (Layout Shift)
height 		Высота 						CLS (Layout Shift)
loading  	lazy / eager 				Оптимизация загрузки для LCP

Рекомендуемые размеры:
Hero / LCP = 				1920x1080
Основное фото = 			1200x800
Боковой / второстепенный = 	800x600

Уточнить, детально разобрать, что означают вот эти атрибуты:

sizes="100vw"
sizes="(max-width: 768px) 100vw, 1200px"
class="w-full rounded-2xl shadow-xl"