"""Download all images from Squarespace CDN into public/images/ directory."""
import os
import re
import urllib.request
import urllib.parse
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE = Path(__file__).resolve().parent.parent / "public" / "images"

# Strip Squarespace format params to get original resolution
def clean_url(url: str) -> str:
    return re.sub(r'\?format=\d+w$', '', url)

# Team photos: {url: filename}
TEAM = {
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/7a19c531-280d-45c2-b8fa-e63130d89b94/KOVIAK%2BBUILT%2BBillboard%2BShoot.jpg": "joshua-koviak.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/40230b44-e9e2-4250-8773-936cdd05b08b/KOVIAK%2BBUILT%2BBillboard%2BShoot%2B%281%29..jpg": "caleb-pistone.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/60deffb8-0162-4283-8401-7cba193b6b89/KOVIAK%2BBUILT%2BBillboard%2BShoot%2B%282%29..jpg": "josh-pistone.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/ac9dc3c9-9f2c-480c-b8f3-bb6f43e403fb/1X7A1425%2BJohn%2BBrown%2BHeadshot.jpg": "john-brown.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/f2e53e8c-11dd-44ea-94dd-efa97c08860f/57002FF4-4149-4433-8372-F90B107CE77B_1_201_a.jpeg": "kaylan-koviak.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/49dea567-c472-46fd-a3c9-80200e49f4cc/IMG_3022%2B2.jpg": "emma-pistone.jpg",
}

# Portfolio projects: {slug: [urls]}
PORTFOLIO = {
    "dogtrot-cabin": [
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/3f244e6a-d40c-4421-b336-500a5c7932e0/IMG_0943-Edit+2.png",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/2840752e-2c5b-4951-8a00-108a787566e7/Untitled+5.png",
    ],
    "agua-vista-ranch": [
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/f3f76b96-7237-4500-abd3-a5a0288aca4c/Koviak+Built+Portfolio+Photos2.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/f7cbd4cd-c1ae-4c7b-b232-a5d124086a57/%C2%A9%C2%A0DVDesign_AVR_Exteriors_012-2.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/df37c8b3-c732-46ec-8f08-1914b5005b91/Koviak+Built+Portfolio+Photos12.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/9e6a4709-4f4b-421b-a8f0-18afaf1f4573/Koviak+Built+Portfolio+Photos4.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/dbe5a256-fddd-451b-8f70-3a0d885f208d/Koviak+Built+Portfolio+Photos6.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/8ea5e7f3-7f8a-4973-a011-88ad12d23614/Koviak+Built+Portfolio+Photos8.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/9e5ceb61-4e42-4752-854a-fdb5bb48bbda/Koviak+Built+Portfolio+Photos5.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/62fffb46-2878-4805-b96a-569db08fea6a/Koviak+Built+Portfolio+Photos10.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/1f287fcb-6df4-45ec-921a-86d2d6dfa730/Koviak+Built+Portfolio+Photos11.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/add60133-f369-410c-9af0-dbc3c1f4e8a1/Koviak+Built+Portfolio+Photos7.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/34f93522-90e4-46d2-ae87-d290a58e24ef/Koviak+Built+Portfolio+Photos9.jpg",
    ],
    "the-outpost": [
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/b5490608-0bc8-4154-8126-6f12557e4f25/IMG_8866+-+P3+-+delete+barnacles.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/c2ea965b-a20f-4a1f-b595-8a1a93279da4/Koviak+Built+Portfolio+Photos33.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/c4918de8-6c3f-41a1-9fb5-a578f41fafec/Koviak+Built+Portfolio+Photos15.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/61a9a611-8715-4731-bf8e-abd8dab5b15c/Koviak+Built+Portfolio+Photos32.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/f1e67d9e-747b-49d5-900b-d4b6fc271df6/IMG_9190+-+LP.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/d5e21f85-8be3-4ae1-a9e4-b56729d858f0/IMG_0512+-+P.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/0663acef-fecf-4748-bbc7-92e3122789f7/aia+outpost+modern+home+finalist.png",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/08b29803-5523-470f-b739-a26b4b06517f/IMG_9154+edit.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/2fd6cdd5-8d6b-4496-bba5-407950da88bf/IMG_9126-Edit.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/0ca43f9a-aa38-4eef-92fd-ba8ceb3692e2/Koviak+Built+Portfolio+Photos16.jpg",
    ],
    "h2-lodge": [
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/c71b604d-5929-4f8f-b226-f716f06daf18/DJI_20231206170951_0266_D-HDR.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/995da0c0-bbd1-42ae-9de1-402b57cfad83/J0109590-HDR.jpg",
    ],
    "alta-luz": [
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/7294ea71-f719-4437-8712-50d07f926106/Koviak+Built+Portfolio+Photos30-Enhanced-SR.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/d532d224-8f61-41f4-a256-68078aad3bca/IMG_4932+-+LP+%281%29.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/b29f96f3-a78f-48b7-a4ea-d197c48395e3/IMG_1768+-+LP.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/3b428ea4-5c45-4e6d-9ada-6ce430cfc7d4/IMG_2921+-+LP+cropped.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/53475941-db42-4475-a9d6-b04fba491bfc/Koviak+Built+Portfolio+Photos17.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/3f0aa354-294d-40a9-892f-0a01cd92164a/Koviak+Built+Portfolio+Photos23.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/52b0b8bf-c629-4d70-8cfe-e8203936c739/Koviak+Built+Portfolio+Photos25.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/21327879-aaaf-4eb4-b439-268e6e146279/Koviak+Built+Portfolio+Photos28.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/79cdd3eb-a423-4f7a-b181-6a652900b2fc/Koviak+Built+Portfolio+Photos29.jpg",
        "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/fc9f9da7-d7fc-494c-a7f6-ef671ea7566d/IMG_1622+-+LP.jpg",
    ],
}

# Homepage carousel images (43 images from homepage scrape)
HOMEPAGE = [
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/51e862f0-624a-4f22-9447-277699e8e14e/Smiling+couple+wine.jpeg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/22c0f4e6-e3d3-40cb-b8e3-bdb7ea00d9a7/J0104952.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/dba99093-ecab-40e0-8f9f-35391351bcb2/DJI_20231206170736_0241_D-HDR-Edit1.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/dd49fb5e-65d8-49d6-afe4-c3b5ad69ecd6/Koviak+Built+Portfolio+Photos21.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/de9c0c6d-d1d8-453b-84b0-c2106b821a00/J0108876-HDR-Edit.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/1c5f810d-c33e-450c-b4be-1493ade0190c/IMG_8866+-+P3+-+delete+barnacles.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/d907456d-2ced-4d82-9ef3-43c94112c3cf/reduced+3.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/bdd0ab5f-e49b-421b-aad6-ee5466e0c47a/IMG_4932+-+LP+%281%29.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/9dcd9039-6fb7-4493-baff-145d6f428bfb/J0109252-HDR.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/8af22ea6-0281-40d9-8ede-a1a1e3b34dff/Koviak+Built+Portfolio+Photos33.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/28cf82cb-192d-4b0b-980d-5324c2886df1/Luxurious+fireplace+with+natural+stonework+and+wood+beam+ceiling+in+H2+Lodge+by+Koviak+Built+J0108666-HDR-Edit-2-2.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/b0a5afce-b940-4686-928c-965e5b19ff50/IMG_9154.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/a5975a4c-eb05-4716-a7af-41f041c3f2a6/J0100144.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/96f37058-3bdd-4273-9227-4fbf26a5fe88/Koviak+Built+Portfolio+Photos16.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/2676d5ff-869b-4e99-b840-37df50779f95/reduced+1.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/c9869f6e-ef3e-4b1e-82c2-026ecc80466b/%C2%A9%C2%A0DVDesign_AVR_Exteriors_012-2.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/b19dde8f-ddc4-4ef3-97de-250b6ec19416/J0100030.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/355dc7e4-abf1-4fe3-b996-be99b87abf47/Koviak+Built+Portfolio+Photos28.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/69ef1f46-4be7-43c1-9cca-8a2e0b5b6aea/J0100140-Edit.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/fbbc9cf3-dab0-4879-bf67-e5052b032fd3/Koviak+Built+Portfolio+Photos15.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/b902411c-8847-4592-bb90-fe05f96c4d8a/J0100166.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/9d6b6968-e1fc-49b2-adc3-a83516f04a13/Koviak+Built+Portfolio+Photos7.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/4d83ec90-f31a-4ffa-b9f8-6171a1b4a48a/J0109378.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/9c952c2c-4f7f-4e19-8224-bd68ba3f55ee/Koviak+Built+Portfolio+Photos12.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/8db46be0-73ad-4b57-8bf8-51a05a117eb7/J0100025.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/5b04a6a2-6af3-4491-a88a-b12803d71b33/Koviak+Built+Portfolio+Photos23.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/74f5f9e2-3e75-4f5b-870d-b64310a973e2/reduced+4.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/59076286-e916-4a9c-a199-2ec6efe6fffd/Koviak+Built+Portfolio+Photos24.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/c5ca740e-5350-4034-86d8-5eb69d379223/Spiral+staircase+with+wooden+accents+in+a+custom-built+luxury+property+J0108575-HDR-Edit.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/284118c2-9347-4e7c-b7a0-9a64ddf4b3b4/J0100132-Edit.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/ff6adef9-6d80-434e-aa26-8dec02a26d55/J0109386.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/ca61aff5-2c1a-40dc-8eb1-87d3a8f1487d/Koviak+Built+Portfolio+Photos32.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/544b81f4-3e4f-4190-9af4-e41d1c7abbc6/J0100152.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/16363309-6767-42cb-8efe-d2cda55d509b/Top-down+view+capturing+the+intricate+spiral+staircase+design+within+a+luxury+home+J0108552-HDR.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/d3e58ee5-49cc-495b-ac03-bc0972f25c63/J0109215-HDR-Edit-Edit.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/9f037aba-e4d0-462c-8a87-f8f8c8ec1157/Koviak+Built+Portfolio+Photos31.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/5f94267a-67ee-4c6d-aeb6-298cfb9a0dd9/J0109380.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/32e7a31f-cbde-4255-a499-e170955969a8/J0109337-HDR.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/ff1f8428-e31f-4cdb-b180-edead286c50e/J0109891-HDR.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/6c615ffd-c8b8-41c6-803f-dd377248975d/Koviak+Built+Portfolio+Photos25.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/2373a893-2ce9-4b67-a7fe-5b5790c2c9c1/J0108802.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/d4b9d344-33bb-403b-b0aa-d6307b62df1b/J0109616-HDR.jpg",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/3e4bad8a-d789-481c-820b-719e356dac05/Koviak%2BBuilt%2BPortfolio%2BPhotos2.jpg",
]

# Logo and favicon
MISC = {
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/c017007e-7a00-4875-8657-83fc9f7332d5/Skinny+Website+Logo+Header.png": "logo.png",
    "https://images.squarespace-cdn.com/content/v1/6532e085353cde2efb003f15/695038fc-e540-4717-93f1-777dde787328/favicon.ico": "favicon.ico",
}


def download(url: str, dest: Path) -> str:
    """Download a single file. Returns status string."""
    if dest.exists() and dest.stat().st_size > 0:
        return f"SKIP {dest.name} (exists)"
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        cleaned = clean_url(url)
        req = urllib.request.Request(cleaned, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        dest.write_bytes(data)
        size_kb = len(data) / 1024
        return f"OK   {dest.name} ({size_kb:.0f} KB)"
    except Exception as e:
        return f"FAIL {dest.name}: {e}"


def main():
    tasks = []

    # Team photos
    for url, filename in TEAM.items():
        tasks.append((url, BASE / "team" / filename))

    # Portfolio images (cover.jpg = first image, then 1.jpg, 2.jpg, ...)
    for slug, urls in PORTFOLIO.items():
        for i, url in enumerate(urls):
            if i == 0:
                fname = "cover.jpg"
            else:
                # Detect extension from URL
                parsed = urllib.parse.unquote(url.split("/")[-1])
                ext = parsed.rsplit(".", 1)[-1].lower().split("?")[0]
                if ext not in ("jpg", "jpeg", "png", "webp"):
                    ext = "jpg"
                fname = f"{i}.{ext}"
            tasks.append((url, BASE / "portfolio" / slug / fname))

    # Homepage carousel
    for i, url in enumerate(HOMEPAGE, 1):
        parsed = urllib.parse.unquote(url.split("/")[-1])
        ext = parsed.rsplit(".", 1)[-1].lower().split("?")[0]
        if ext not in ("jpg", "jpeg", "png", "webp"):
            ext = "jpg"
        tasks.append((url, BASE / "home" / f"{i}.{ext}"))

    # Misc (logo, favicon)
    for url, filename in MISC.items():
        tasks.append((url, BASE / filename))

    print(f"Downloading {len(tasks)} images...")

    ok = fail = skip = 0
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {pool.submit(download, url, dest): (url, dest) for url, dest in tasks}
        for future in as_completed(futures):
            result = future.result()
            print(result)
            if result.startswith("OK"):
                ok += 1
            elif result.startswith("FAIL"):
                fail += 1
            else:
                skip += 1

    print(f"\nDone: {ok} downloaded, {skip} skipped, {fail} failed (total: {len(tasks)})")


if __name__ == "__main__":
    main()
