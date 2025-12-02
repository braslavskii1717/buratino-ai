from PIL import Image, ImageDraw, ImageFont
import os

# Создаем иконки с эмодзи
sizes = [192, 512]
bg_color = '#fef3c7'
emoji = '🎭'

for size in sizes:
    # Создаем изображение
    img = Image.new('RGB', (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Добавляем текст (эмодзи)
    try:
        # Пытаемся использовать системный шрифт
        font_size = int(size * 0.6)
        font = ImageFont.truetype('/System/Library/Fonts/Apple Color Emoji.ttc', font_size)
    except:
        # Если не получилось, используем дефолтный
        font = ImageFont.load_default()
    
    # Рисуем эмодзи в центре
    text = emoji
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    position = ((size - text_width) // 2, (size - text_height) // 2)
    draw.text(position, text, fill='#d97706', font=font)
    
    # Сохраняем
    img.save(f'public/icon-{size}.png')
    print(f'✅ Создана иконка icon-{size}.png')

print('🎉 Все иконки созданы!')
