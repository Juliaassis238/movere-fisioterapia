from PIL import Image

source = "/home/ubuntu/upload/IMG_3479.PNG"
destination = "/home/ubuntu/movere-fisioterapia/assets/clinica-recepcao-crop.png"

with Image.open(source) as image:
    # Remove a interface superior e inferior da captura de tela, mantendo a foto da recepção.
    cropped = image.crop((0, 258, 828, 1362))
    cropped.save(destination, format="PNG", optimize=True)

print(f"saved={destination} size={cropped.size}")
