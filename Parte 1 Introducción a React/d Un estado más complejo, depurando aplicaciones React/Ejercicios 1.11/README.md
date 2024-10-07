# React + Vite
# Documentado en 
# https://fullstackopen.com/es/part1/introduccion_a_react

# Como la mayoría de las empresas, Unicafe recopila comentarios de sus clientes. Tu tarea es implementar una aplicación web para recopilar comentarios de los clientes. Solo hay tres opciones para los comentarios: good (bueno), neutral y bad(malo).

# La aplicación debe mostrar el número total de comentarios recopilados para cada categoría. Tu aplicación final podría verse así:

# Amplía tu aplicación para que muestre más estadísticas sobre los comentarios recopilados: el número total de comentarios recopilados, la puntuación promedio (buena: 1, neutral: 0, mala: -1) y el porcentaje de comentarios positivos.

# Refactoriza tu aplicación para que la visualización de las estadísticas se extraiga en su propio componente Statistics. El estado de la aplicación debe permanecer en el componente raíz App.

# Recuerda que los componentes no deben definirse dentro de otros componentes:

# Continuemos refactorizando la aplicación. Extrae los siguiente dos componentes:

# Button para definir los botones utilizados para enviar comentarios StatisticLine para mostrar una única estadística, por ejemplo, la puntuación media.
# Para ser claros: el componente StatisticLine siempre muestra una única estadística, lo que significa que la aplicación utiliza varios componentes para representar todas las estadísticas:

# Muestra las estadísticas en una tabla HTML, de modo que tu aplicación se vea más o menos así:













