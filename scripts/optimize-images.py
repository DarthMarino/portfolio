"""Generate web-sized derivatives; install Pillow to run. Originals are retained."""
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
output = root / 'src/assets/optimized'
output.mkdir(exist_ok=True)
files = [root / 'src/assets/profile.png', *sorted((root / 'src/assets/images').glob('*'))]
original_size = 0
optimized_size = 0
for source in files:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert('RGB')
        image.thumbnail((512, 512) if source.stem == 'profile' else (1440, 1440))
        target = output / f'{source.stem}.webp'
        image.save(target, 'WEBP', quality=86, method=6)
        original_size += source.stat().st_size
        optimized_size += target.stat().st_size
        if source.stem in {'the-qr-king-1', 'pventa-3', 'sic-2', 'curbo-1', 'tinacos-1', 'find-machines-2'}:
            image.thumbnail((720, 720))
            image.save(output / f'{source.stem}-thumb.webp', 'WEBP', quality=82, method=6)
print(f'Full-size web derivatives: {original_size:,} → {optimized_size:,} bytes')
