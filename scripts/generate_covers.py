import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('client/public/projects', exist_ok=True)
os.makedirs('client/dist/projects', exist_ok=True)

FONT_PATH = 'C:/Windows/Fonts/segoeui.ttf'
FONT_BOLD_PATH = 'C:/Windows/Fonts/segoeuib.ttf'
if not os.path.exists(FONT_BOLD_PATH):
    FONT_BOLD_PATH = FONT_PATH

def get_font(size, bold=False):
    try:
        return ImageFont.truetype(FONT_BOLD_PATH if bold else FONT_PATH, size)
    except:
        return ImageFont.load_default()

def create_base_canvas(bg_color_top, bg_color_bot):
    w, h = 800, 500
    img = Image.new('RGB', (w, h))
    draw = ImageDraw.Draw(img)
    # Gradient
    r1, g1, b1 = bg_color_top
    r2, g2, b2 = bg_color_bot
    for y in range(h):
        t = y / h
        r = int(r1 + (r2 - r1) * t)
        g = int(g1 + (g2 - g1) * t)
        b = int(b1 + (b2 - b1) * t)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
    return img, draw

# 1. Resume Builder Cover
def gen_resume_builder():
    img, draw = create_base_canvas((18, 22, 28), (28, 35, 45))
    # Browser window
    draw.rounded_rectangle([(70, 40), (730, 460)], radius=14, fill='#161b22', outline='#30363d', width=2)
    # Header bar
    draw.circle((95, 65), radius=5, fill='#ff5f56')
    draw.circle((112, 65), radius=5, fill='#ffbd2e')
    draw.circle((129, 65), radius=5, fill='#27c93f')
    draw.text((155, 57), "https://devaansh.dev/resume-builder", fill='#8b949e', font=get_font(12))
    
    # Left editor column
    draw.rounded_rectangle([(95, 95), (370, 435)], radius=10, fill='#0d1117', outline='#21262d')
    draw.text((115, 115), "Personal Details", fill='#e6edf3', font=get_font(15, bold=True))
    draw.rounded_rectangle([(115, 145), (350, 175)], radius=6, fill='#161b22', outline='#30363d')
    draw.text((125, 152), "Devansh Kumar | Full Stack Developer", fill='#58a6ff', font=get_font(11))
    
    draw.text((115, 195), "Education & Experience", fill='#e6edf3', font=get_font(15, bold=True))
    draw.rounded_rectangle([(115, 225), (350, 265)], radius=6, fill='#161b22', outline='#30363d')
    draw.text((125, 235), "B.Tech CSE — 2021-2025", fill='#c9d1d9', font=get_font(12))
    
    draw.rounded_rectangle([(115, 280), (350, 320)], radius=6, fill='#161b22', outline='#30363d')
    draw.text((125, 290), "Python Developer (2024-Present)", fill='#7ee787', font=get_font(12))
    
    # Button
    draw.rounded_rectangle([(115, 360), (240, 395)], radius=6, fill='#238636')
    draw.text((130, 370), "Export PDF", fill='#ffffff', font=get_font(12, bold=True))
    
    # Right preview paper
    draw.rounded_rectangle([(400, 95), (705, 435)], radius=10, fill='#ffffff', outline='#d0d7de')
    draw.text((425, 120), "DEVANSH KUMAR", fill='#1f2328', font=get_font(18, bold=True))
    draw.text((425, 145), "WEB DEVELOPER & MERN ENGINEER", fill='#0969da', font=get_font(11, bold=True))
    draw.line([(425, 165), (680, 165)], fill='#d0d7de', width=1)
    
    draw.text((425, 180), "EXPERIENCE", fill='#1f2328', font=get_font(12, bold=True))
    draw.text((425, 200), "• Full Stack MERN development & APIs", fill='#57606a', font=get_font(11))
    draw.text((425, 220), "• Responsive UI/UX and dark themes", fill='#57606a', font=get_font(11))
    
    draw.text((425, 255), "SKILLS", fill='#1f2328', font=get_font(12, bold=True))
    skills = ["React.js", "Node.js", "MongoDB", "Express", "Python"]
    x_s = 425
    for s in skills:
        draw.rounded_rectangle([(x_s, 275), (x_s + len(s)*8 + 14, 297)], radius=4, fill='#f6f8fa', outline='#d0d7de')
        draw.text((x_s + 7, 279), s, fill='#1f2328', font=get_font(10))
        x_s += len(s)*8 + 20
        
    # Badge
    draw.rounded_rectangle([(560, 48), (710, 78)], radius=12, fill='#ffdb70')
    draw.text((580, 54), "MERN LIVE APP", fill='#121212', font=get_font(11, bold=True))
    
    img.save('client/public/projects/resume-builder.jpg', quality=95)
    img.save('client/dist/projects/resume-builder.jpg', quality=95)

# 2. Kanban Task Manager Cover
def gen_task_manager():
    img, draw = create_base_canvas((24, 20, 36), (36, 30, 56))
    draw.rounded_rectangle([(60, 40), (740, 460)], radius=14, fill='#1e1a2c', outline='#3f355c', width=2)
    draw.circle((85, 65), radius=5, fill='#ff5f56')
    draw.circle((102, 65), radius=5, fill='#ffbd2e')
    draw.circle((119, 65), radius=5, fill='#27c93f')
    draw.text((145, 57), "DevTask — Agile Kanban Project Board", fill='#b8a9df', font=get_font(12, bold=True))
    
    # 3 Columns
    col_w = 190
    cols = [
        ("TO DO (3)", '#272038', '#ff7b72', 85),
        ("IN PROGRESS (2)", '#272038', '#d29922', 305),
        ("COMPLETED (5)", '#272038', '#3fb950', 525)
    ]
    for title, c_bg, accent, x in cols:
        draw.rounded_rectangle([(x, 95), (x + col_w, 435)], radius=10, fill=c_bg, outline='#3f355c')
        draw.line([(x + 15, 125), (x + col_w - 15, 125)], fill=accent, width=2)
        draw.text((x + 15, 105), title, fill='#e6edf3', font=get_font(12, bold=True))
        
        # Cards in column
        for cy, task_title, tag, t_col in [
            (140, "Integrate Stripe", "BACKEND", '#388bfd'),
            (225, "Redesign Navbar", "UI/UX", '#a371f7'),
            (310, "MongoDB Indexing", "DATABASE", '#3fb950')
        ]:
            if cy < 390:
                draw.rounded_rectangle([(x + 12, cy), (x + col_w - 12, cy + 70)], radius=8, fill='#1b1626', outline='#4a3f6d')
                draw.text((x + 22, cy + 12), task_title, fill='#f0f6fc', font=get_font(12, bold=True))
                draw.rounded_rectangle([(x + 22, cy + 40), (x + 85, cy + 58)], radius=4, fill=t_col)
                draw.text((x + 26, cy + 43), tag, fill='#ffffff', font=get_font(9, bold=True))

    img.save('client/public/projects/task-manager.jpg', quality=95)
    img.save('client/dist/projects/task-manager.jpg', quality=95)

# 3. ShopSphere E-Commerce Cover
def gen_shopsphere():
    img, draw = create_base_canvas((15, 25, 35), (20, 45, 60))
    draw.rounded_rectangle([(60, 40), (740, 460)], radius=14, fill='#0b1520', outline='#1f3a52', width=2)
    draw.circle((85, 65), radius=5, fill='#ff5f56')
    draw.circle((102, 65), radius=5, fill='#ffbd2e')
    draw.circle((119, 65), radius=5, fill='#27c93f')
    draw.text((145, 57), "ShopSphere — MERN E-Commerce Storefront", fill='#58a6ff', font=get_font(12, bold=True))
    
    # Store banner
    draw.rounded_rectangle([(85, 95), (715, 200)], radius=10, fill='#132738', outline='#1f4769')
    draw.text((115, 120), "SUMMER TECH GEAR & APPAREL", fill='#58a6ff', font=get_font(12, bold=True))
    draw.text((115, 140), "Up to 40% Off Premium Peripherals", fill='#ffffff', font=get_font(18, bold=True))
    draw.rounded_rectangle([(115, 168), (220, 192)], radius=4, fill='#238636')
    draw.text((130, 172), "Shop Now ->", fill='#ffffff', font=get_font(11, bold=True))
    
    # Product grid
    px = 85
    for i, (name, price, tag) in enumerate([
        ("Mech Keyboard Pro", "$129.99", "Hot"),
        ("ANC Wireless Headset", "$199.50", "Sale"),
        ("UltraWide 4K Monitor", "$449.00", "New")
    ]):
        draw.rounded_rectangle([(px, 220), (px + 195, 435)], radius=10, fill='#132738', outline='#1f4769')
        # Product image area
        draw.rounded_rectangle([(px + 15, 235), (px + 180, 335)], radius=6, fill='#0d1b27')
        draw.text((px + 50, 275), "[ PRODUCT ]", fill='#388bfd', font=get_font(13))
        draw.text((px + 15, 350), name, fill='#e6edf3', font=get_font(13, bold=True))
        draw.text((px + 15, 375), price, fill='#3fb950', font=get_font(14, bold=True))
        draw.rounded_rectangle([(px + 15, 400), (px + 180, 425)], radius=4, fill='#388bfd')
        draw.text((px + 65, 405), "Add to Cart", fill='#ffffff', font=get_font(10, bold=True))
        px += 215

    img.save('client/public/projects/shopsphere.jpg', quality=95)
    img.save('client/dist/projects/shopsphere.jpg', quality=95)

# 4. Fundo UI/UX Design System Cover
def gen_fundo_design():
    img, draw = create_base_canvas((25, 25, 30), (45, 40, 50))
    draw.rounded_rectangle([(60, 40), (740, 460)], radius=14, fill='#18181f', outline='#3a3a48', width=2)
    draw.circle((85, 65), radius=5, fill='#ff5f56')
    draw.circle((102, 65), radius=5, fill='#ffbd2e')
    draw.circle((119, 65), radius=5, fill='#27c93f')
    draw.text((145, 57), "Fundo — UI/UX Design System & Component Library", fill='#ffdb70', font=get_font(12, bold=True))
    
    # Left: Design tokens & color swatches
    draw.text((90, 105), "COLOR TOKENS & SYSTEM PALETTE", fill='#8b949e', font=get_font(11, bold=True))
    colors = [('#ffdb70', 'Gold #FFDB70'), ('#58a6ff', 'Blue #58A6FF'), ('#3fb950', 'Green #3FB950'), ('#a371f7', 'Purple #A371F7'), ('#ff7b72', 'Coral #FF7B72')]
    sy = 135
    for c, label in colors:
        draw.rounded_rectangle([(90, sy), (130, sy + 30)], radius=6, fill=c)
        draw.text((145, sy + 8), label, fill='#e6edf3', font=get_font(12))
        sy += 42
        
    # Right: Glassmorphic Component Cards Preview
    draw.text((370, 105), "GLASSMORPHIC UI COMPONENTS", fill='#8b949e', font=get_font(11, bold=True))
    # Card 1: Metric Card
    draw.rounded_rectangle([(370, 135), (710, 240)], radius=12, fill='#22222c', outline='#4a4a5e')
    draw.text((395, 155), "MONTHLY RECURRING METRICS", fill='#a371f7', font=get_font(11, bold=True))
    draw.text((395, 175), "$48,290.00", fill='#ffffff', font=get_font(24, bold=True))
    draw.text((395, 210), "+18.4% compared to previous sprint", fill='#3fb950', font=get_font(11))
    
    # Card 2: Interactive Buttons & Form inputs
    draw.rounded_rectangle([(370, 260), (710, 430)], radius=12, fill='#22222c', outline='#4a4a5e')
    draw.text((395, 280), "Button States & Typography", fill='#e6edf3', font=get_font(13, bold=True))
    
    draw.rounded_rectangle([(395, 310), (510, 345)], radius=8, fill='#ffdb70')
    draw.text((420, 320), "Primary Gold", fill='#121212', font=get_font(11, bold=True))
    
    draw.rounded_rectangle([(525, 310), (640, 345)], radius=8, fill='#30363d', outline='#58a6ff')
    draw.text((545, 320), "Ghost Border", fill='#58a6ff', font=get_font(11, bold=True))
    
    draw.rounded_rectangle([(395, 365), (680, 405)], radius=8, fill='#16161d', outline='#30363d')
    draw.text((410, 377), "Search component specs...", fill='#6e7681', font=get_font(12))

    img.save('client/public/projects/fundo-design.jpg', quality=95)
    img.save('client/dist/projects/fundo-design.jpg', quality=95)

# 5. Zenith Creative Agency Cover
def gen_zenith_agency():
    img, draw = create_base_canvas((15, 15, 20), (30, 25, 40))
    draw.rounded_rectangle([(60, 40), (740, 460)], radius=14, fill='#101016', outline='#2d2d3d', width=2)
    draw.circle((85, 65), radius=5, fill='#ff5f56')
    draw.circle((102, 65), radius=5, fill='#ffbd2e')
    draw.circle((119, 65), radius=5, fill='#27c93f')
    draw.text((145, 57), "Zenith Studio — Creative Digital Agency Experience", fill='#e6edf3', font=get_font(12, bold=True))
    
    # Hero Agency Layout
    draw.text((100, 120), "WE CRAFT AWARD-WINNING", fill='#ffdb70', font=get_font(13, bold=True))
    draw.text((100, 145), "DIGITAL EXPERIENCES & BRANDS", fill='#ffffff', font=get_font(26, bold=True))
    draw.text((100, 185), "Bridging human emotion and interactive web technologies for world-class products.", fill='#8b949e', font=get_font(12))
    
    # Showcase Cards Grid
    cw = 260
    for i, (title, cat, c_fill) in enumerate([
        ("Spatial Odyssey", "3D WebGL Interaction", '#201a35'),
        ("Luminary Studio", "Identity & Architecture", '#182535')
    ]):
        x = 100 + i * 280
        draw.rounded_rectangle([(x, 230), (x + cw, 420)], radius=12, fill=c_fill, outline='#443d60')
        draw.rounded_rectangle([(x + 15, 245), (x + cw - 15, 345)], radius=8, fill='#0d0d14')
        draw.text((x + 60, 285), "[ 3D PREVIEW ]", fill='#ffdb70', font=get_font(12))
        draw.text((x + 15, 360), title, fill='#ffffff', font=get_font(14, bold=True))
        draw.text((x + 15, 385), cat, fill='#8b949e', font=get_font(11))

    img.save('client/public/projects/zenith-agency.jpg', quality=95)
    img.save('client/dist/projects/zenith-agency.jpg', quality=95)

# 6. FitPulse Health & Fitness App Cover
def gen_fitpulse():
    img, draw = create_base_canvas((18, 30, 25), (25, 48, 38))
    draw.rounded_rectangle([(60, 40), (740, 460)], radius=14, fill='#12221b', outline='#254a39', width=2)
    draw.circle((85, 65), radius=5, fill='#ff5f56')
    draw.circle((102, 65), radius=5, fill='#ffbd2e')
    draw.circle((119, 65), radius=5, fill='#27c93f')
    draw.text((145, 57), "FitPulse — Health & Workout Analytics Mobile Web App", fill='#7ee787', font=get_font(12, bold=True))
    
    # Mobile app frame preview in center
    draw.rounded_rectangle([(270, 95), (530, 440)], radius=24, fill='#0a1510', outline='#3fb950', width=2)
    # Notch
    draw.rounded_rectangle([(360, 105), (440, 120)], radius=8, fill='#12221b')
    draw.text((320, 135), "TODAY'S SUMMARY", fill='#7ee787', font=get_font(11, bold=True))
    
    # Activity ring / metrics
    draw.rounded_rectangle([(295, 160), (505, 230)], radius=12, fill='#152d23')
    draw.text((315, 175), "Active Calories Burned", fill='#c9d1d9', font=get_font(11))
    draw.text((315, 195), "784 / 900 kcal", fill='#ffffff', font=get_font(18, bold=True))
    
    # Workout routine
    draw.rounded_rectangle([(295, 245), (505, 320)], radius=12, fill='#152d23')
    draw.text((315, 260), "Current Workout: Upper Body", fill='#7ee787', font=get_font(12, bold=True))
    draw.text((315, 285), "4 of 6 exercises completed", fill='#8b949e', font=get_font(11))
    
    # Water goal
    draw.rounded_rectangle([(295, 335), (505, 405)], radius=12, fill='#152d23')
    draw.text((315, 350), "Water Intake", fill='#58a6ff', font=get_font(12, bold=True))
    draw.text((315, 375), "2.4L / 3.0L Target", fill='#ffffff', font=get_font(13))
    
    # Left and right stat badges
    draw.rounded_rectangle([(85, 180), (240, 270)], radius=12, fill='#12221b', outline='#254a39')
    draw.text((105, 200), "Streak", fill='#8b949e', font=get_font(11))
    draw.text((105, 220), "14 Days", fill='#ffdb70', font=get_font(20, bold=True))
    
    draw.rounded_rectangle([(560, 180), (715, 270)], radius=12, fill='#12221b', outline='#254a39')
    draw.text((580, 200), "Heart Rate", fill='#8b949e', font=get_font(11))
    draw.text((580, 220), "128 BPM", fill='#ff7b72', font=get_font(20, bold=True))

    img.save('client/public/projects/fitpulse.jpg', quality=95)
    img.save('client/dist/projects/fitpulse.jpg', quality=95)

# 7. Netflix Cinema UI Cover
def gen_netflix_cinema():
    img, draw = create_base_canvas((15, 10, 10), (35, 15, 15))
    draw.rounded_rectangle([(60, 40), (740, 460)], radius=14, fill='#140e0e', outline='#441c1c', width=2)
    draw.circle((85, 65), radius=5, fill='#ff5f56')
    draw.circle((102, 65), radius=5, fill='#ffbd2e')
    draw.circle((119, 65), radius=5, fill='#27c93f')
    draw.text((145, 57), "NETFLIX — Cinematic Streaming Experience Clone", fill='#e50914', font=get_font(12, bold=True))
    
    # Hero Movie Banner
    draw.rounded_rectangle([(85, 95), (715, 260)], radius=10, fill='#221212', outline='#5e1b1b')
    draw.text((115, 120), "TOP 10 IN WEB MOVIES TODAY", fill='#e50914', font=get_font(11, bold=True))
    draw.text((115, 140), "INTERSTELLAR ODYSSEY", fill='#ffffff', font=get_font(24, bold=True))
    draw.text((115, 175), "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", fill='#c9d1d9', font=get_font(11))
    
    draw.rounded_rectangle([(115, 210), (220, 245)], radius=6, fill='#ffffff')
    draw.text((140, 220), "▶ Play Now", fill='#000000', font=get_font(12, bold=True))
    
    draw.rounded_rectangle([(235, 210), (350, 245)], radius=6, fill='#555558')
    draw.text((255, 220), "ℹ More Info", fill='#ffffff', font=get_font(12, bold=True))
    
    # Thumbnails row
    draw.text((85, 280), "TRENDING ON YOUR RADAR", fill='#ffffff', font=get_font(13, bold=True))
    tx = 85
    for i in range(4):
        draw.rounded_rectangle([(tx, 305), (tx + 145, 430)], radius=8, fill='#241212', outline='#5e1b1b')
        draw.text((tx + 25, 360), f"STREAM #{i+1}", fill='#e50914', font=get_font(12, bold=True))
        tx += 160

    img.save('client/public/projects/netflix-cinema.jpg', quality=95)
    img.save('client/dist/projects/netflix-cinema.jpg', quality=95)

# 8. Stone Paper Scissors Battle Cover
def gen_sps_arena():
    img, draw = create_base_canvas((20, 25, 35), (30, 40, 60))
    draw.rounded_rectangle([(60, 40), (740, 460)], radius=14, fill='#121824', outline='#25354e', width=2)
    draw.circle((85, 65), radius=5, fill='#ff5f56')
    draw.circle((102, 65), radius=5, fill='#ffbd2e')
    draw.circle((119, 65), radius=5, fill='#27c93f')
    draw.text((145, 57), "Stone Paper Scissors — AI Battle Arena", fill='#58a6ff', font=get_font(12, bold=True))
    
    # Scoreboard
    draw.rounded_rectangle([(240, 100), (560, 165)], radius=10, fill='#1b2436', outline='#354a6e')
    draw.text((275, 115), "PLAYER", fill='#3fb950', font=get_font(12, bold=True))
    draw.text((295, 135), "4", fill='#ffffff', font=get_font(20, bold=True))
    draw.text((385, 125), "VS", fill='#ffdb70', font=get_font(16, bold=True))
    draw.text((470, 115), "AI BOT", fill='#ff7b72', font=get_font(12, bold=True))
    draw.text((490, 135), "2", fill='#ffffff', font=get_font(20, bold=True))
    
    # Battle choices
    cx = 140
    choices = [("✊ ROCK", "Crushes Scissors"), ("✋ PAPER", "Covers Rock"), ("✌ SCISSORS", "Cuts Paper")]
    for icon, desc in choices:
        draw.rounded_rectangle([(cx, 200), (cx + 155, 380)], radius=12, fill='#182234', outline='#3a5078')
        draw.circle((cx + 77, 260), radius=35, fill='#24334e')
        draw.text((cx + 35, 250), icon[:2], fill='#ffffff', font=get_font(20))
        draw.text((cx + 30, 315), icon, fill='#ffdb70', font=get_font(13, bold=True))
        draw.text((cx + 25, 345), desc, fill='#8b949e', font=get_font(10))
        cx += 185
        
    draw.text((320, 410), "🏆 YOU WIN THIS ROUND!", fill='#3fb950', font=get_font(13, bold=True))

    img.save('client/public/projects/sps-arena.jpg', quality=95)
    img.save('client/dist/projects/sps-arena.jpg', quality=95)

# 9. Tic Tac Toe Cover
def gen_tictactoe():
    img, draw = create_base_canvas((20, 20, 25), (35, 35, 45))
    draw.rounded_rectangle([(60, 40), (740, 460)], radius=14, fill='#16161d', outline='#303040', width=2)
    draw.circle((85, 65), radius=5, fill='#ff5f56')
    draw.circle((102, 65), radius=5, fill='#ffbd2e')
    draw.circle((119, 65), radius=5, fill='#27c93f')
    draw.text((145, 57), "Tic Tac Toe — Pro Algorithmic Board", fill='#ffdb70', font=get_font(12, bold=True))
    
    # Left stats
    draw.text((100, 130), "MATCH STATUS", fill='#8b949e', font=get_font(11, bold=True))
    draw.text((100, 155), "Player X's Turn", fill='#388bfd', font=get_font(18, bold=True))
    draw.text((100, 190), "Round 3 of 5", fill='#c9d1d9', font=get_font(12))
    draw.text((100, 220), "Win condition algorithm:", fill='#8b949e', font=get_font(11))
    draw.text((100, 240), "Minimax backtracking", fill='#7ee787', font=get_font(12, bold=True))
    
    draw.rounded_rectangle([(100, 290), (220, 330)], radius=8, fill='#ffdb70')
    draw.text((120, 302), "Reset Board", fill='#121212', font=get_font(12, bold=True))
    
    # 3x3 Grid on Right
    gx, gy = 410, 110
    cell = 85
    for r in range(3):
        for c in range(3):
            draw.rounded_rectangle([(gx + c*(cell+10), gy + r*(cell+10)), (gx + c*(cell+10) + cell, gy + r*(cell+10) + cell)], radius=10, fill='#22222d', outline='#404055')
            
    # Sample moves
    draw.text((gx + 25, gy + 15), "X", fill='#388bfd', font=get_font(36, bold=True))
    draw.text((gx + cell + 35, gy + 15), "O", fill='#ff7b72', font=get_font(36, bold=True))
    draw.text((gx + 2*(cell+10) + 25, gy + 15), "X", fill='#388bfd', font=get_font(36, bold=True))
    
    draw.text((gx + 35, gy + cell + 25), "O", fill='#ff7b72', font=get_font(36, bold=True))
    draw.text((gx + cell + 25, gy + cell + 25), "X", fill='#388bfd', font=get_font(36, bold=True))

    img.save('client/public/projects/tictactoe.jpg', quality=95)
    img.save('client/dist/projects/tictactoe.jpg', quality=95)

gen_resume_builder()
gen_task_manager()
gen_shopsphere()
gen_fundo_design()
gen_zenith_agency()
gen_fitpulse()
gen_netflix_cinema()
gen_sps_arena()
gen_tictactoe()

print("All 9 project covers generated with high-definition styling!")
