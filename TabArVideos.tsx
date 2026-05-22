import { useState, useEffect } from 'react';

interface VideoItem {
    video: string;
    // otras propiedades si las hay
}

const [videos, setVideos] = useState<VideoItem[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchVideos = async () => {
        try {
            const response = await fetch('https://public.tab.ar/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Si necesitas enviar datos en el body, agrégalos aquí:
                // body: JSON.stringify({ /* tus datos */ }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Extraer el array de "Noticias" o la ruta correcta según la respuesta
            const items = data["Noticias"] || data;
            
            setVideos(items);
            setLoading(false);
        } catch (err) {
            console.error("Error:", err);
            setError(err instanceof Error ? err.message : 'Error desconocido');
            setLoading(false);
        }
    };

    fetchVideos();
}, []);

// Uso en tu JSX:
{/* 
{videos.map((item, index) => (
    <video key={index} src={item.video} controls />
))}
*/}
