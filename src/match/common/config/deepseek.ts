export async function getResponseAI(prompt: string, creativity: number) {
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'mistral', // Cambia a "deepseek-chat" si lo descargaste
            prompt: prompt,
            temperature: creativity,
            stream: false, // Importante para recibir el JSON completo
        }),
    });

    const data = await response.json();
    return data.response;
}
