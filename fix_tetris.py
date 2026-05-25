import os, re

# 自动找到脚本所在目录
base = os.path.dirname(os.path.abspath(__file__))
dist = os.path.join(base, "tetris", "dist")

# 1. 修复 index.html
html_path = os.path.join(dist, "index.html")
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('src="/assets/', 'src="./assets/')
content = content.replace('href="/assets/', 'href="./assets/')
content = content.replace('src="/tnt.png"', 'src="./tnt.png"')
content = content.replace('href="/favicon.ico"', 'href="./favicon.ico"')
content = content.replace('url(/ascii.jpg)', 'url(./ascii.jpg)')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)
print("✅ index.html 修复完成")

# 2. 修复 assets 目录下所有 JS 文件
assets_dir = os.path.join(dist, "assets")
for filename in os.listdir(assets_dir):
    if filename.endswith(".js"):
        js_path = os.path.join(assets_dir, filename)
        with open(js_path, "r", encoding="utf-8") as f:
            content = f.read()
        new_content = content.replace('"/assets/', '"./assets/')
        if new_content != content:
            with open(js_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"✅ {filename} 修复完成")
        else:
            print(f"⚪ {filename} 无需修改")

print("\n🎉 全部完成！刷新 Live Server 即可。")