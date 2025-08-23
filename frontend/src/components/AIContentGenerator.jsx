import React, { useState } from 'react';
import { Sparkles, Download, Copy, RefreshCw, FileText, Image, Video, Mic } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import TerminalWindow from './TerminalWindow';

const AIContentGenerator = ({ className = "" }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [contentType, setContentType] = useState('blog_post');
  const [prompt, setPrompt] = useState('');

  const contentTypes = [
    { id: 'blog_post', name: 'Blog Post', icon: FileText, desc: 'SEO-optimized blog articles' },
    { id: 'social_media', name: 'Social Media', icon: Image, desc: 'Engaging social media posts' },
    { id: 'ad_copy', name: 'Ad Copy', icon: Sparkles, desc: 'Converting advertisement copy' },
    { id: 'email_campaign', name: 'Email Campaign', icon: Mic, desc: 'Email marketing content' },
  ];

  const generateContent = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/content/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content_type: contentType,
          prompt: prompt
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setGeneratedContent(result.data.content);
      } else {
        setGeneratedContent('ERROR: Failed to generate content. Please try again.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('ERROR: Connection failed. Please check your connection and try again.');
    }
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const downloadContent = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contentType}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`${className}`}>
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
              <span className="text-matrix-green matrix-text-glow">
                AI_CONTENT_GENERATOR
              </span>
            </h2>
            <p className="text-xl text-matrix-green/80 max-w-3xl mx-auto font-mono">
              ADVANCED_AI_POWERED_CONTENT_CREATION | UNLIMITED_DIGITAL_ASSETS
            </p>
          </div>

          <TerminalWindow title="CONTENT_GENERATOR.exe" className="mb-8">
            {/* Content Type Selection */}
            <div className="mb-6">
              <div className="text-matrix-green font-mono mb-4">&gt; SELECT_CONTENT_TYPE:</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {contentTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setContentType(type.id)}
                      className={`p-3 rounded-lg border transition-all duration-300 font-mono text-sm ${
                        contentType === type.id
                          ? 'border-matrix-green bg-matrix-green/20 text-matrix-green'
                          : 'border-matrix-green/30 text-matrix-green/70 hover:border-matrix-green/50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 mx-auto mb-2" />
                      <div className="font-semibold">{type.name}</div>
                      <div className="text-xs opacity-80">{type.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <div className="text-matrix-green font-mono mb-3">&gt; CONTENT_PROMPT:</div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what content you want to generate..."
                className="w-full h-32 bg-black/50 border border-matrix-green/20 rounded-lg px-4 py-3 text-matrix-green placeholder-matrix-green/40 font-mono resize-none focus:border-matrix-green focus:outline-none"
              />
            </div>

            {/* Generate Button */}
            <div className="mb-6">
              <Button
                onClick={generateContent}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-matrix-green text-black hover:bg-matrix-green/80 py-3 font-mono font-semibold transition-all duration-300"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    GENERATING_CONTENT...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    GENERATE_CONTENT
                  </>
                )}
              </Button>
            </div>

            {/* Generated Content */}
            {generatedContent && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-matrix-green font-mono">&gt; GENERATED_CONTENT:</div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyToClipboard}
                      className="border-matrix-green/30 text-matrix-green hover:bg-matrix-green/10 font-mono"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      COPY
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={downloadContent}
                      className="border-matrix-green/30 text-matrix-green hover:bg-matrix-green/10 font-mono"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      DOWNLOAD
                    </Button>
                  </div>
                </div>
                <div className="bg-black/50 border border-matrix-green/20 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <pre className="text-matrix-green/90 font-mono text-sm whitespace-pre-wrap">
                    {generatedContent}
                  </pre>
                </div>
              </div>
            )}
          </TerminalWindow>

          {/* Quick Prompts */}
          <Card className="bg-black/50 border-matrix-green/30">
            <CardHeader>
              <CardTitle className="text-matrix-green font-mono">QUICK_PROMPTS</CardTitle>
              <CardDescription className="text-matrix-green/60 font-mono">
                Click to use pre-made prompts for faster content generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Write a blog post about AI in digital marketing",
                  "Create social media content for a Dubai tech startup",
                  "Generate ad copy for WhatsApp Business services",
                  "Write an email campaign for Ramadan marketing",
                  "Create content about web development trends in UAE",
                  "Generate SEO-optimized content for e-commerce"
                ].map((promptText, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(promptText)}
                    className="p-3 text-left bg-black/30 border border-matrix-green/20 rounded-lg hover:border-matrix-green/40 transition-colors font-mono text-sm text-matrix-green/80"
                  >
                    {promptText}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AIContentGenerator;