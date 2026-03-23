Пример Hero/LCP (Largest Contentful Paint) главное изображение, обложка
Для главного изображения страницы указываем loading="eager", остальные изображения — lazy.

{{\< seo-image 
	src="hero-chair.png" 
	alt="Главное изображение кресла Aerocool" 
	title="Главное изображение кресла Aerocool"
	loading="eager"
	preload=true
	fetchpriority=high
/\>}}

Убрал атрибуты width="1920" и height="1080" в шорткоде при использовании hero,
чтобы не было рассинхронизации с реальными размерами $avif_lg. 
Шорткод сам подтянет правильный размер.

Пример использования изображения в контенте:

{{\< seo-image 
	src="product-chair.png" 
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
	src="product-chair-side.png" 
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
