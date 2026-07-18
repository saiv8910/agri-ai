import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { languageNames } from '../utils/translations';
import {
  Bot,
  Mic,
  MicOff,
  Send,
  Volume2,
  Sparkles,
  User,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  category?: string;
  actionItems?: string[];
}

export const AIChatbot: React.FC = () => {
  const { lang, speakText, currentUser } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: `Namaste ${currentUser.name}! I am your AI Farming Assistant powered by IndicLLM & Agronomic Knowledge Base. Ask me anything in your language about crop diseases, fertilizers, weather advisory, or market prices.`,
      timestamp: '10:00 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Why are my tomato leaves turning yellow with brown spots?',
    'Should I spray pesticide tomorrow considering the rain forecast?',
    'What is the recommended NPK dosage for 5 acres of onion?',
    'Current mandi price trend for red onions in Lasalgaon?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      let botAnswer = '';
      let actions: string[] = [];

      const lower = query.toLowerCase();

      if (lower.includes('yellow') || lower.includes('spot') || lower.includes('blight')) {
        botAnswer = 'Yellow leaves with brown concentric spots on solanaceous crops (Tomato/Potato) usually signal Early Blight (Alternaria solani) triggered by high atmospheric moisture (>75% RH).';
        actions = [
          'Apply Chlorothalonil 75% WP @ 2g/liter of water',
          'Avoid overhead sprinkler irrigation to keep foliage dry',
          'Drench soil with Neem Oil (10,000 PPM) bio-pesticide'
        ];
      } else if (lower.includes('pesticide') || lower.includes('spray') || lower.includes('rain')) {
        botAnswer = 'Do NOT spray pesticides or liquid fertilizers tomorrow! Weather radars predict 85% probability of 45-65mm heavy rain over Nashik within the next 12 hours. Any sprayed chemical will be washed off into runoff.';
        actions = [
          'Postpone chemical spraying until Tuesday afternoon',
          'Clear field drainage channels to prevent waterlogging',
          'Inspect roots for damping off after heavy rain stops'
        ];
      } else if (lower.includes('npk') || lower.includes('fertilizer') || lower.includes('onion')) {
        botAnswer = 'For 5 acres of Onion during the Vegetative stage (30-45 days post transplanting): Recommended total requirement is 50kg Nitrogen, 25kg Phosphorus, and 25kg Potassium per acre.';
        actions = [
          'Apply 2 bags Urea (46% N) + 1 bag NPK 10:26:26 per acre',
          'Incorporate 500kg Neem Cake per acre to enhance N uptake',
          'Drench via drip early in the morning'
        ];
      } else {
        botAnswer = `Based on current soil moisture (41.5%) and regional telemetry in ${currentUser.location.district}, your crop conditions are stable. Ensure balanced irrigation and follow integrated pest management.`;
        actions = [
          'Check local Mandi prices before harvesting',
          'Monitor soil pH (optimal range 6.5 - 7.2)',
          'Subscribe to PMFBY crop insurance alerts'
        ];
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: botAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionItems: actions
      };

      setMessages((prev) => [...prev, botMsg]);
      speakText(botAnswer);
    }, 1200);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser window. Using simulated speech input...');
      setInputText(quickPrompts[0]);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      console.warn('STT Error:', e);
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-card border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>IndicLLM Multilingual Voice Engine ({languageNames[lang].nativeName})</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">Interactive AI Agri Assistant</h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Voice-enabled conversational AI trained on ICAR agronomic guidelines, Indian weather models, and APMC market trends.
          </p>
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col h-[580px] rounded-2xl glass-card border border-slate-800 overflow-hidden">
          {/* Chat Transcript Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950'
                      : 'bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-slate-800/90 text-slate-200 border border-slate-700 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Action Items List */}
                    {msg.actionItems && msg.actionItems.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-700 space-y-1.5">
                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                          Key Agronomic Actions:
                        </div>
                        {msg.actionItems.map((act, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-[11px] bg-slate-900/60 p-2 rounded-lg">
                            <span className="text-emerald-400">✓</span>
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center space-x-2 text-[10px] text-slate-400 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'bot' && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="p-1 hover:text-emerald-400 transition-colors"
                        title="Listen to response"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
            <button
              onClick={handleVoiceInput}
              className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-emerald-400'
              }`}
              title="Voice Input (Microphone)"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-emerald-400" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask in ${languageNames[lang].nativeName} (e.g. "Yellow leaves remedy?")...`}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />

            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold shadow-lg shadow-emerald-600/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggested Prompts Side Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl glass-card border border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 mb-3 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Suggested Agronomic Questions</span>
            </h4>
            <div className="space-y-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-slate-800/60 hover:bg-emerald-500/10 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 transition-all group"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">💡</span>
                    <span>{prompt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-slate-800 bg-emerald-950/20 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Voice Guidance Ready</span>
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Tap the microphone icon to ask your question by speaking in your regional language. AgriAI translates voice to text and speaks the response back to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
