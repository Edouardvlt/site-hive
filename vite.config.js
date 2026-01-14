
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    base: "/site-hive/",
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Hive Festival Dashboard',
                short_name: 'HIVE 2026',
                description: 'Tableau de bord pour le festival Hive 2026',
                theme_color: '#000000',
                background_color: '#000000',
                display: 'standalone',
                orientation: 'portrait',
                icons: [
                    {
                        src: '/site-hive/assets/hive/Icon_TechnoCastle.webp', // Temporary fallback
                        sizes: '192x192',
                        type: 'image/webp'
                    }
                ]
            }
        })
    ],
})
