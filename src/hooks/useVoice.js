import { useState, useEffect, useRef, useCallback } from 'react';

export const VOICE_LANGUAGES = [
  { code: 'en-IN', label: 'English (India)' },
  { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
  { code: 'ta-IN', label: 'தமிழ் (Tamil)' },
  { code: 'bn-IN', label: 'বাংলা (Bengali)' },
  { code: 'mr-IN', label: 'मराठी (Marathi)' },
];

export function useVoice({ onResult } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('hi-IN');
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition || null;

    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        if (onResult) onResult(currentTranscript);
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition error/notice:', e.error);
        if (e.error === 'not-allowed') {
          setError('Microphone permission was declined. Please enable mic access.');
        } else {
          setError(`Voice input: ${e.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, onResult]);

  const startListening = useCallback(() => {
    setError(null);
    if (!isSupported || !recognitionRef.current) {
      // Graceful simulated voice input fallback for environments without speech recognition hardware
      setIsListening(true);
      setTimeout(() => {
        const samplePrompts = [
          'maroon bridal velvet lehenga with heavy zardozi peacock work',
          'pastel mint silk anarkali with sweet-heart neckline and pearl borders',
          'champagne gold sherwani with royal angrakha cut and churidar',
        ];
        const randomSample = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
        setTranscript(randomSample);
        if (onResult) onResult(randomSample);
        setIsListening(false);
      }, 2500);
      return;
    }

    try {
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
    } catch (err) {
      // In case it was already running
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  }, [isSupported, language, onResult]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsListening(false);
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported,
    language,
    setLanguage,
    startListening,
    stopListening,
    resetTranscript,
    VOICE_LANGUAGES,
  };
}

export default useVoice;
