import sqlite3


conn = sqlite3.connect('users.db')

cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        android_manufacture TEXT,
        android_model TEXT,
        android_os_version TEXT,
        android_app_version TEXT,
        acquisition_campaign TEXT,
        acquisition_source TEXT,
        city TEXT,
        state TEXT,
        onboarding_time INTEGER,
        phone_carrier TEXT,
        phone_screen_dpi INTEGER,
        phone_screen_height INTEGER,
        phone_screen_width INTEGER,
        name TEXT,
        age INTEGER
    )
''')

entries = [
    ("Samsung", "Galaxy S10", "Android 11", "1.2.3", "Campaign 1", "Source 1", "City 1", "State 1", 1625760367, "Carrier 1", 400, 2340, 1080, "John Doe", 30),
    ("Apple", "iPhone 12", "iOS 14", "2.0.1", "Campaign 2", "Source 2", "City 2", "State 2", 1625760367, "Carrier 2", 450, 2532, 1170, "Jane Smith", 35),
    ("Samsung", "Galaxy S10", "Android 11", "1.2.3", "Campaign 1", "Source 1", "City 1", "State 1", 1625760367, "Carrier 1", 400, 2340, 1080, "John Doe", 30),
    ("Apple", "iPhone 12", "iOS 14", "2.0.1", "Campaign 2", "Source 2", "City 2", "State 2", 1625760367, "Carrier 2", 450, 2532, 1170, "Jane Smith", 35),
    ("Google", "Pixel 5", "Android 12", "3.1.2", "Campaign 3", "Source 3", "City 3", "State 3", 1625760367, "Carrier 3", 500, 2160, 1080, "David Johnson", 40),
    ("Samsung", "Galaxy S20", "Android 10", "1.5.2", "Campaign 4", "Source 4", "City 4", "State 4", 1625760367, "Carrier 4", 400, 3040, 1440, "Sarah Williams", 28),
    ("Apple", "iPhone SE", "iOS 15", "2.2.1", "Campaign 5", "Source 5", "City 5", "State 5", 1625760367, "Carrier 5", 450, 1334, 750, "Michael Brown", 32),
    ("Google", "Pixel 4a", "Android 11", "3.0.3", "Campaign 6", "Source 6", "City 6", "State 6", 1625760367, "Carrier 6", 400, 2340, 1080, "Emily Davis", 27),
    ("Samsung", "Galaxy Note20", "Android 11", "1.8.5", "Campaign 7", "Source 7", "City 7", "State 7", 1625760367, "Carrier 7", 480, 3088, 1440, "Christopher Wilson", 37),
    ("Apple", "iPhone 11", "iOS 13", "2.1.4", "Campaign 8", "Source 8", "City 8", "State 8", 1625760367, "Carrier 8", 415, 1792, 828, "Olivia Taylor", 29),
    ("Google", "Pixel 3a", "Android 10", "3.0.2", "Campaign 9", "Source 9", "City 9", "State 9", 1625760367, "Carrier 9", 440, 2220, 1080, "Daniel Anderson", 33),
    ("Samsung", "Galaxy A52", "Android 11", "1.7.1", "Campaign 10", "Source 10", "City 10", "State 10", 1625760367, "Carrier 10", 405, 2400, 1080, "Sophia Clark", 31),
    ("Apple", "iPhone XR", "iOS 14", "2.0.5", "Campaign 11", "Source 11", "City 11", "State 11", 1625760367, "Carrier 11", 326, 1792, 828, "Jacob Martinez", 34)
]

cursor.executemany('''
    INSERT INTO users (
        android_manufacture,
        android_model,
        android_os_version,
        android_app_version,
        acquisition_campaign,
        acquisition_source,
        city,
        state,
        onboarding_time,
        phone_carrier,
        phone_screen_dpi,
        phone_screen_height,
        phone_screen_width,
        name,
        age
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', entries)

conn.commit()
conn.close()
